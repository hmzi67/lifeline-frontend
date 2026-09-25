import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const DEFAULT_ENTITLEMENT_ID = 'lifeline_vip';
const REVENUECAT_API_BASE_URL = 'https://api.revenuecat.com/v1';
const APP_STORE_NAMES = new Set(['app_store', 'mac_app_store']);

interface RevenueCatEntitlement {
  expires_date?: string | null;
  grace_period_expires_date?: string | null;
  product_identifier?: string | null;
  purchase_date?: string | null;
}

interface RevenueCatSubscription {
  billing_issues_detected_at?: string | null;
  expires_date?: string | null;
  grace_period_expires_date?: string | null;
  is_sandbox?: boolean;
  original_purchase_date?: string | null;
  period_type?: string | null;
  purchase_date?: string | null;
  refunded_at?: string | null;
  store?: string | null;
  unsubscribe_detected_at?: string | null;
}

interface RevenueCatSubscriberResponse {
  subscriber?: {
    entitlements?: Record<string, RevenueCatEntitlement>;
    original_app_user_id?: string;
    subscriptions?: Record<string, RevenueCatSubscription>;
  };
}

export interface RevenueCatEntitlementSyncResult {
  active: boolean;
  cancelAtPeriodEnd: boolean;
  entitlementId: string;
  expiresAt: string | null;
  paymentId: string | null;
  pricingPlanId: string | null;
  productId: string | null;
  status: string;
}

export class RevenueCatServiceError extends Error {
  readonly statusCode: number;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.name = 'RevenueCatServiceError';
    this.statusCode = statusCode;
  }
}

const parseDate = (value?: string | null): Date | null => {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const latestDate = (...values: Array<string | null | undefined>): Date | null => {
  const dates = values
    .map(parseDate)
    .filter((value): value is Date => !!value);
  if (dates.length === 0) return null;
  return new Date(Math.max(...dates.map(date => date.getTime())));
};

const getEntitlementId = (): string => (
  process.env.REVENUECAT_ENTITLEMENT_ID?.trim() || DEFAULT_ENTITLEMENT_ID
);

const getSecretApiKey = (): string => {
  const key = process.env.REVENUECAT_SECRET_API_KEY?.trim();
  if (!key) {
    throw new RevenueCatServiceError(
      'App Store subscription verification is not configured',
      503,
    );
  }
  return key;
};

const fetchSubscriber = async (appUserId: string): Promise<RevenueCatSubscriberResponse> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10_000);

  try {
    const response = await fetch(
      `${REVENUECAT_API_BASE_URL}/subscribers/${encodeURIComponent(appUserId)}`,
      {
        headers: {
          Authorization: `Bearer ${getSecretApiKey()}`,
          Accept: 'application/json',
        },
        signal: controller.signal,
      },
    );

    if (response.status === 404) {
      return { subscriber: { entitlements: {}, subscriptions: {} } };
    }

    if (!response.ok) {
      throw new RevenueCatServiceError(
        'RevenueCat could not verify the App Store subscription',
        response.status === 429 ? 503 : 502,
      );
    }

    return await response.json() as RevenueCatSubscriberResponse;
  } catch (error) {
    if (error instanceof RevenueCatServiceError) throw error;
    if (error instanceof Error && error.name === 'AbortError') {
      throw new RevenueCatServiceError('App Store subscription verification timed out', 504);
    }
    throw new RevenueCatServiceError('RevenueCat could not verify the App Store subscription', 502);
  } finally {
    clearTimeout(timeoutId);
  }
};

const inactiveStatus = (
  subscription: RevenueCatSubscription | undefined,
  expiresAt: Date | null,
  now: Date,
): string => {
  if (subscription?.refunded_at) return 'REFUNDED';
  if (subscription?.billing_issues_detected_at) return 'BILLING_ISSUE';
  if (expiresAt && expiresAt <= now) return 'EXPIRED';
  if (subscription?.unsubscribe_detected_at) return 'CANCELLED';
  return 'INACTIVE';
};

/**
 * Fetches the authenticated RevenueCat subscriber server-to-server and mirrors
 * the entitlement into the existing SubscriptionPayment/UserLicense access model.
 * No product, expiration, or purchase status supplied by the mobile client is trusted.
 */
export const syncRevenueCatEntitlement = async (
  userId: string,
): Promise<RevenueCatEntitlementSyncResult> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true },
  });
  if (!user) throw new RevenueCatServiceError('User not found', 404);

  const entitlementId = getEntitlementId();
  const entitlementKey = `${userId}:${entitlementId}`;
  if (entitlementKey.length > 255) {
    throw new RevenueCatServiceError('RevenueCat entitlement identifier is too long', 500);
  }

  const knownPayment = await prisma.subscriptionPayment.findUnique({
    where: { appStoreEntitlementKey: entitlementKey },
    select: { storeProductId: true },
  });
  const payload = await fetchSubscriber(userId);
  const subscriber = payload.subscriber;
  const entitlement = subscriber?.entitlements?.[entitlementId];
  const productId = entitlement?.product_identifier?.trim()
    || knownPayment?.storeProductId
    || null;
  const subscription = productId
    ? subscriber?.subscriptions?.[productId]
    : undefined;
  const expiresAt = latestDate(
    entitlement?.expires_date,
    entitlement?.grace_period_expires_date,
    subscription?.expires_date,
    subscription?.grace_period_expires_date,
  );
  const now = new Date();
  const isAppStorePurchase = !!subscription?.store
    && APP_STORE_NAMES.has(subscription.store.toLowerCase());
  const activeByDate = !!entitlement && (!expiresAt || expiresAt > now);
  const active = activeByDate && isAppStorePurchase && !subscription?.refunded_at;
  const cancelAtPeriodEnd = active && !!subscription?.unsubscribe_detected_at;

  const plan = productId
    ? await prisma.pricingPlan.findFirst({
        where: { appleProductId: productId, isActive: true },
      })
    : null;

  if (active && !plan) {
    throw new RevenueCatServiceError(
      `The App Store product ${productId} is not mapped to an active pricing plan`,
      409,
    );
  }

  return prisma.$transaction(async tx => {
    const existingPayment = await tx.subscriptionPayment.findUnique({
      where: { appStoreEntitlementKey: entitlementKey },
    });

    if (!active || !plan || !productId) {
      if (!existingPayment) {
        return {
          active: false,
          cancelAtPeriodEnd: false,
          entitlementId,
          expiresAt: expiresAt?.toISOString() ?? null,
          paymentId: null,
          pricingPlanId: null,
          productId,
          status: inactiveStatus(subscription, expiresAt, now),
        };
      }

      const effectiveExpiresAt = expiresAt || existingPayment.currentPeriodEnd;
      const status = inactiveStatus(subscription, effectiveExpiresAt, now);
      const revokedAt = effectiveExpiresAt && effectiveExpiresAt <= now
        ? effectiveExpiresAt
        : now;
      await tx.subscriptionPayment.update({
        where: { id: existingPayment.id },
        data: {
          status,
          cancelAtPeriodEnd: false,
          currentPeriodEnd: effectiveExpiresAt || revokedAt,
          storeProductId: productId || existingPayment.storeProductId,
          storeEnvironment: subscription
            ? (subscription.is_sandbox ? 'SANDBOX' : 'PRODUCTION')
            : existingPayment.storeEnvironment,
        },
      });
      await tx.userLicense.updateMany({
        where: { userId, paymentId: existingPayment.id },
        data: { expiresAt: revokedAt },
      });

      return {
        active: false,
        cancelAtPeriodEnd: false,
        entitlementId,
        expiresAt: revokedAt.toISOString(),
        paymentId: existingPayment.id,
        pricingPlanId: existingPayment.pricingPlanId,
        productId: productId || existingPayment.storeProductId,
        status,
      };
    }

    const isTrial = subscription?.period_type?.toLowerCase() === 'trial';
    const status = isTrial ? 'TRIALING' : 'COMPLETED';
    const paymentData = {
      userId,
      pricingPlanId: plan.id,
      planName: plan.name,
      durationMonths: plan.durationMonths,
      originalAmount: plan.originalPrice,
      amount: plan.price,
      method: 'app_store',
      status,
      appStoreEntitlementKey: entitlementKey,
      storeProductId: productId,
      storeEnvironment: subscription?.is_sandbox ? 'SANDBOX' : 'PRODUCTION',
      currentPeriodEnd: expiresAt,
      cancelAtPeriodEnd,
    };

    const payment = await tx.subscriptionPayment.upsert({
      where: { appStoreEntitlementKey: entitlementKey },
      create: {
        ...paymentData,
        createdAt: parseDate(
          subscription?.original_purchase_date
          || subscription?.purchase_date
          || entitlement.purchase_date,
        ) || now,
      },
      update: paymentData,
    });

    await tx.userLicense.upsert({
      where: { appStoreEntitlementKey: entitlementKey },
      create: {
        userId,
        paymentId: payment.id,
        appStoreEntitlementKey: entitlementKey,
        createdAt: now,
        expiresAt,
      },
      update: {
        userId,
        paymentId: payment.id,
        expiresAt,
      },
    });

    if (isTrial) {
      await tx.user.updateMany({
        where: { id: userId, trialUsedAt: null },
        data: { trialUsedAt: now },
      });
    }

    return {
      active: true,
      cancelAtPeriodEnd,
      entitlementId,
      expiresAt: expiresAt?.toISOString() ?? null,
      paymentId: payment.id,
      pricingPlanId: plan.id,
      productId,
      status,
    };
  });
};

export const findWebhookUserId = async (candidateIds: string[]): Promise<string | null> => {
  const candidates = [...new Set(candidateIds)]
    .map(value => value.trim())
    .filter(value => value.length > 0 && !value.startsWith('$RCAnonymousID:'));

  if (candidates.length === 0) return null;

  const users = await prisma.user.findMany({
    where: { id: { in: candidates } },
    select: { id: true },
  });
  const knownIds = new Set(users.map(user => user.id));
  return candidates.find(candidate => knownIds.has(candidate)) || null;
};
