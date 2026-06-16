import { Request, Response } from 'express';

const FOOD_SCAN_PROMPT = `You are a food recognition and nutrition-estimation engine inside a mobile app.
You receive a single photo and must analyze its contents.

Return ONLY a JSON object. No prose, no markdown, no code fences.

Rules:
- If the image does NOT clearly contain food or drink (e.g. a person, a wall, a
  screenshot, a pet, a blank or black frame), set "is_food" to false and put a short
  reason in "reason_if_not_food". Do NOT invent food items.
- If the image is too blurry, too dark, or too far away to identify food with
  reasonable confidence, still set "is_food" true if food is plausibly present, set
  "image_quality" to "poor", and lower each item's "confidence".
- Identify EACH distinct food or drink item separately. A plate with rice, chicken,
  and salad is three items.
- Treat beverages as items (e.g. "orange juice", "black coffee").
- All nutrition values are ESTIMATES based on a typical visible portion. They are not
  medical or dietary advice.
- Portion: describe what you see ("1 medium bowl, ~250 g"). If you cannot judge the
  portion, say so and set confidence low.
- If a packaged item with a readable label is visible, you may use the label, but still
  mark portion confidence based on what is actually shown.
- Numbers must be plain numbers (no units inside the number). Use null when you
  genuinely cannot estimate a value.

JSON shape:
{
  "is_food": boolean,
  "reason_if_not_food": string | null,
  "image_quality": "good" | "poor",
  "items": [
    {
      "name": string,
      "portion_estimate": string,
      "calories_kcal": number | null,
      "macros": { "protein_g": number | null, "carbs_g": number | null, "fat_g": number | null },
      "confidence": "high" | "medium" | "low"
    }
  ],
  "total_calories_kcal": number | null,
  "notes": string
}`;

const foodScanConfig = {
  endpoint: process.env.FOOD_SCAN_ENDPOINT || 'https://api.groq.com/openai/v1/chat/completions',
  model: process.env.FOOD_SCAN_MODEL || 'meta-llama/llama-4-scout-17b-16e-instruct',
  requestTimeoutMs: Number(process.env.FOOD_SCAN_REQUEST_TIMEOUT_MS || 30000),
  maxTokens: Number(process.env.FOOD_SCAN_MAX_TOKENS || 800),
  temperature: Number(process.env.FOOD_SCAN_TEMPERATURE || 0.2),
  maxImageBytes: Number(process.env.FOOD_SCAN_MAX_IMAGE_BYTES || 19 * 1024 * 1024),
};

type FoodConfidence = 'high' | 'medium' | 'low';
type ImageQuality = 'good' | 'poor';

type FoodScanItem = {
  name: string;
  portion_estimate: string;
  calories_kcal: number | null;
  macros: {
    protein_g: number | null;
    carbs_g: number | null;
    fat_g: number | null;
  };
  confidence: FoodConfidence;
};

type FoodScanResult = {
  is_food: boolean;
  reason_if_not_food: string | null;
  image_quality: ImageQuality;
  items: FoodScanItem[];
  total_calories_kcal: number | null;
  notes: string;
};

const sendFoodScanError = (res: Response, status: number, errorCode: string, message: string) => {
  return res.status(status).json({
    error_code: errorCode,
    message,
  });
};

const isValidBase64 = (value: string) => {
  if (!value || value.startsWith('data:')) return false;
  if (value.length % 4 !== 0) return false;
  return /^[A-Za-z0-9+/]+={0,2}$/.test(value);
};

const toSafeNumber = (value: unknown): number | null => {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < 0) return null;
  return Math.round(value);
};

const toConfidence = (value: unknown): FoodConfidence => {
  return value === 'high' || value === 'medium' || value === 'low' ? value : 'low';
};

const toImageQuality = (value: unknown): ImageQuality => {
  return value === 'good' || value === 'poor' ? value : 'poor';
};

const parseModelJson = (raw: string) => {
  let text = raw.trim();

  if (text.startsWith('```')) {
    text = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
  }

  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');

  if (start === -1 || end === -1 || end <= start) {
    throw new Error('No JSON object found');
  }

  return JSON.parse(text.slice(start, end + 1));
};

const normalizeFoodScanResult = (payload: any): FoodScanResult => {
  const isFood = payload?.is_food === true;
  const rawItems = Array.isArray(payload?.items) ? payload.items : [];
  const items: FoodScanItem[] = isFood
    ? rawItems.map((item: any) => ({
        name: typeof item?.name === 'string' && item.name.trim() ? item.name.trim() : 'Unknown food',
        portion_estimate:
          typeof item?.portion_estimate === 'string' && item.portion_estimate.trim()
            ? item.portion_estimate.trim()
            : 'Portion unclear',
        calories_kcal: toSafeNumber(item?.calories_kcal),
        macros: {
          protein_g: toSafeNumber(item?.macros?.protein_g),
          carbs_g: toSafeNumber(item?.macros?.carbs_g),
          fat_g: toSafeNumber(item?.macros?.fat_g),
        },
        confidence: toConfidence(item?.confidence),
      }))
    : [];

  const estimatedTotal = items.reduce((sum, item) => sum + (item.calories_kcal || 0), 0);
  const modelTotal = toSafeNumber(payload?.total_calories_kcal);

  return {
    is_food: isFood,
    reason_if_not_food: isFood
      ? null
      : typeof payload?.reason_if_not_food === 'string' && payload.reason_if_not_food.trim()
      ? payload.reason_if_not_food.trim()
      : 'No clear food or drink was detected.',
    image_quality: toImageQuality(payload?.image_quality),
    items,
    total_calories_kcal: isFood ? modelTotal ?? (estimatedTotal > 0 ? estimatedTotal : null) : null,
    notes:
      typeof payload?.notes === 'string' && payload.notes.trim()
        ? payload.notes.trim()
        : 'Estimates based on visible portions. Not medical advice.',
  };
};

export const scanFood = async (req: Request, res: Response) => {
  const { image_base64: imageBase64, mime_type: mimeType } = req.body || {};

  if (typeof imageBase64 !== 'string' || !isValidBase64(imageBase64)) {
    return sendFoodScanError(res, 400, 'bad_request', 'Missing or invalid image.');
  }

  const normalizedMimeType = typeof mimeType === 'string' && /^image\/(jpeg|jpg|png|webp)$/i.test(mimeType)
    ? mimeType.toLowerCase().replace('image/jpg', 'image/jpeg')
    : 'image/jpeg';

  const imageBuffer = Buffer.from(imageBase64, 'base64');
  if (imageBuffer.length > foodScanConfig.maxImageBytes) {
    return sendFoodScanError(res, 413, 'too_large', 'Image is too large. Try a smaller photo.');
  }

  if (!process.env.GROQ_API_KEY) {
    return sendFoodScanError(res, 401, 'auth', 'Food scanner is not configured.');
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), foodScanConfig.requestTimeoutMs);

  try {
    const groqResponse = await fetch(foodScanConfig.endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: foodScanConfig.model,
        response_format: { type: 'json_object' },
        temperature: foodScanConfig.temperature,
        max_tokens: foodScanConfig.maxTokens,
        messages: [
          {
            role: 'system',
            content: FOOD_SCAN_PROMPT,
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'Analyze this food photo and return the JSON described in your instructions.',
              },
              {
                type: 'image_url',
                image_url: {
                  url: `data:${normalizedMimeType};base64,${imageBase64}`,
                },
              },
            ],
          },
        ],
      }),
    });

    const groqText = await groqResponse.text();

    if (!groqResponse.ok) {
      if (groqResponse.status === 401 || groqResponse.status === 403) {
        return sendFoodScanError(res, 401, 'auth', 'Food scanner authentication failed.');
      }

      if (groqResponse.status === 429) {
        return sendFoodScanError(res, 429, 'rate_limit', 'Too many requests. Try again in a moment.');
      }

      if (groqResponse.status >= 500) {
        return sendFoodScanError(res, 503, 'server', 'Food scanner is temporarily unavailable.');
      }

      return sendFoodScanError(res, 503, 'server', 'Food scanner request failed.');
    }

    let groqPayload: any;
    try {
      groqPayload = JSON.parse(groqText);
    } catch {
      return sendFoodScanError(res, 502, 'parse', 'Scanner returned unreadable output.');
    }

    const content = groqPayload?.choices?.[0]?.message?.content;
    if (typeof content !== 'string') {
      return sendFoodScanError(res, 502, 'parse', 'Scanner returned unreadable output.');
    }

    try {
      const parsed = parseModelJson(content);
      return res.status(200).json(normalizeFoodScanResult(parsed));
    } catch (error) {
      console.error('Food scan parse error:', error);
      return sendFoodScanError(res, 502, 'parse', 'Scanner returned unreadable output.');
    }
  } catch (error: any) {
    if (error?.name === 'AbortError') {
      return sendFoodScanError(res, 504, 'timeout', 'Food scanner took too long. Try again.');
    }

    console.error('Food scan upstream error:', error);
    return sendFoodScanError(res, 503, 'server', 'Food scanner is temporarily unavailable.');
  } finally {
    clearTimeout(timeoutId);
  }
};
