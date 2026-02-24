# Lemon Squeezy Quick Start Guide

## 🚀 Quick Setup (5 minutes)

### 1. Run Setup Script

```bash
./setup-lemonsqueezy.sh
```

### 2. Add Environment Variables

Add to `api/.env`:

```bash
LEMONSQUEEZY_API_KEY=lemon_api_xxxxx
LEMONSQUEEZY_STORE_ID=12345
LEMONSQUEEZY_WEBHOOK_SECRET=xxxxx
LEMONSQUEEZY_VARIANT_ID=67890
```

### 3. Start Servers

```bash
# Terminal 1 - Backend
cd api && npm run dev

# Terminal 2 - Frontend
cd client && npm run dev
```

### 4. Test Locally

1. Go to http://localhost:5173/plan
2. Select a plan
3. Click "Lemon Squeezy" payment option
4. You should be redirected to checkout

---

## 🧪 Testing Webhooks with ngrok

```bash
# Terminal 3 - ngrok
ngrok http 3000
```

Use the ngrok URL in Lemon Squeezy webhook settings:

```
https://abc123.ngrok.io/api/webhooks/lemonsqueezy
```

---

## 📋 API Endpoints

### Checkout (Protected)

```bash
POST /api/lemonsqueezy/checkout
Authorization: Bearer <token>
Content-Type: application/json

{
  "variantId": "optional_variant_id"
}
```

### Webhook (Public)

```bash
POST /api/webhooks/lemonsqueezy
X-Signature: <hmac_signature>
Content-Type: application/json

# Lemon Squeezy sends webhook payload
```

---

## 🔍 Quick Troubleshooting

| Issue                    | Solution                                      |
| ------------------------ | --------------------------------------------- |
| "Invalid signature"      | Check `LEMONSQUEEZY_WEBHOOK_SECRET` in `.env` |
| "User not authenticated" | Verify JWT token in Authorization header      |
| "API key not configured" | Add `LEMONSQUEEZY_API_KEY` to `.env`          |
| Checkout fails           | Verify store ID and variant ID are correct    |
| Webhook not received     | Use ngrok for local testing                   |

---

## 📁 Files Added/Modified

### Backend

- ✅ `api/src/services/lemonSqueezyService.ts`
- ✅ `api/src/controllers/lemonSqueezyController.ts`
- ✅ `api/src/routes/lemonSqueezyRoutes.ts`
- ✅ `api/prisma/schema.prisma` (User model updated)
- ✅ `api/src/config/index.ts` (config added)
- ✅ `api/src/app.ts` (routes registered)

### Frontend

- ✅ `client/src/components/payment/LemonSqueezyCheckout.tsx`
- ✅ `client/src/config/index.ts` (config added)
- ✅ `client/src/pages/marketing/Plan.tsx` (UI updated)

---

## 📖 Full Documentation

See [LEMONSQUEEZY_INTEGRATION.md](./LEMONSQUEEZY_INTEGRATION.md) for complete details.

---

**Questions?** Check the logs in your terminal for detailed error messages!
