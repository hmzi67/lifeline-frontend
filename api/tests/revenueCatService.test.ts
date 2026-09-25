export {};

const transaction = {
  subscriptionPayment: {
    findUnique: jest.fn(),
    upsert: jest.fn(),
    update: jest.fn(),
  },
  userLicense: {
    updateMany: jest.fn(),
    upsert: jest.fn(),
  },
  user: {
    updateMany: jest.fn(),
  },
};

const mockPrisma = {
  pricingPlan: {
    findFirst: jest.fn(),
  },
  subscriptionPayment: {
    findUnique: jest.fn(),
  },
  user: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
  },
  $transaction: jest.fn(async (operation: any) => operation(transaction)),
};

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn(() => mockPrisma),
}));

process.env.REVENUECAT_SECRET_API_KEY = 'sk_test_revenuecat';
process.env.REVENUECAT_ENTITLEMENT_ID = 'lifeline_vip';

const {
  RevenueCatServiceError,
  syncRevenueCatEntitlement,
} = require('../src/services/revenueCatService') as typeof import('../src/services/revenueCatService');

const productId = 'com.irtaza.lifeline.vip.monthly';
const plan = {
  id: 'plan-one',
  name: 'Monthly VIP',
  durationMonths: 1,
  price: 9.99,
  originalPrice: null,
};

const subscriberResponse = (subscriptionOverrides: Record<string, unknown> = {}) => ({
  subscriber: {
    entitlements: {
      lifeline_vip: {
        expires_date: '2026-10-01T00:00:00.000Z',
        product_identifier: productId,
        purchase_date: '2026-09-01T00:00:00.000Z',
      },
    },
    subscriptions: {
      [productId]: {
        expires_date: '2026-10-01T00:00:00.000Z',
        is_sandbox: true,
        original_purchase_date: '2026-09-01T00:00:00.000Z',
        period_type: 'normal',
        store: 'app_store',
        ...subscriptionOverrides,
      },
    },
  },
});

describe('RevenueCat App Store entitlement sync', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockPrisma.user.findUnique.mockResolvedValue({ id: 'user-one' });
    mockPrisma.subscriptionPayment.findUnique.mockResolvedValue(null);
    mockPrisma.pricingPlan.findFirst.mockResolvedValue(plan);
    mockPrisma.$transaction.mockImplementation(async (operation: any) => operation(transaction));
    transaction.subscriptionPayment.findUnique.mockResolvedValue(null);
    transaction.subscriptionPayment.upsert.mockResolvedValue({
      id: 'payment-one',
      userId: 'user-one',
      pricingPlanId: 'plan-one',
      storeProductId: productId,
    });
    transaction.userLicense.upsert.mockResolvedValue({ id: 'license-one' });
    transaction.user.updateMany.mockResolvedValue({ count: 0 });
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => subscriberResponse(),
    }) as jest.Mock;
  });

  it('creates an App Store payment and backend license from an active entitlement', async () => {
    const result = await syncRevenueCatEntitlement('user-one');

    expect(result).toEqual(expect.objectContaining({
      active: true,
      paymentId: 'payment-one',
      pricingPlanId: 'plan-one',
      productId,
      status: 'COMPLETED',
    }));
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.revenuecat.com/v1/subscribers/user-one',
      expect.objectContaining({
        headers: expect.objectContaining({ Authorization: 'Bearer sk_test_revenuecat' }),
      }),
    );
    expect(transaction.subscriptionPayment.upsert).toHaveBeenCalledWith({
      where: { appStoreEntitlementKey: 'user-one:lifeline_vip' },
      create: expect.objectContaining({
        appStoreEntitlementKey: 'user-one:lifeline_vip',
        method: 'app_store',
        pricingPlanId: 'plan-one',
        status: 'COMPLETED',
        storeEnvironment: 'SANDBOX',
        storeProductId: productId,
      }),
      update: expect.objectContaining({
        appStoreEntitlementKey: 'user-one:lifeline_vip',
        status: 'COMPLETED',
      }),
    });
    expect(transaction.userLicense.upsert).toHaveBeenCalledWith({
      where: { appStoreEntitlementKey: 'user-one:lifeline_vip' },
      create: expect.objectContaining({
        appStoreEntitlementKey: 'user-one:lifeline_vip',
        userId: 'user-one',
        paymentId: 'payment-one',
        expiresAt: new Date('2026-10-01T00:00:00.000Z'),
      }),
      update: expect.objectContaining({
        userId: 'user-one',
        paymentId: 'payment-one',
        expiresAt: new Date('2026-10-01T00:00:00.000Z'),
      }),
    });
  });

  it('revokes the backend license immediately when RevenueCat reports a refund', async () => {
    const existingPayment = {
      id: 'payment-one',
      userId: 'user-one',
      pricingPlanId: 'plan-one',
      storeProductId: productId,
      storeEnvironment: 'PRODUCTION',
    };
    transaction.subscriptionPayment.findUnique.mockResolvedValue(existingPayment);
    transaction.subscriptionPayment.update.mockResolvedValue(existingPayment);
    transaction.userLicense.updateMany.mockResolvedValue({ count: 1 });
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => subscriberResponse({ refunded_at: '2026-09-15T00:00:00.000Z' }),
    }) as jest.Mock;

    const beforeSync = Date.now();
    const result = await syncRevenueCatEntitlement('user-one');
    const licenseUpdate = transaction.userLicense.updateMany.mock.calls[0][0];

    expect(result.active).toBe(false);
    expect(result.status).toBe('REFUNDED');
    expect(licenseUpdate.where).toEqual({ userId: 'user-one', paymentId: 'payment-one' });
    expect(licenseUpdate.data.expiresAt.getTime()).toBeGreaterThanOrEqual(beforeSync);
    expect(licenseUpdate.data.expiresAt.getTime()).toBeLessThanOrEqual(Date.now());
  });

  it('does not grant access when the App Store product is not mapped to a plan', async () => {
    mockPrisma.pricingPlan.findFirst.mockResolvedValue(null);

    await expect(syncRevenueCatEntitlement('user-one')).rejects.toEqual(
      expect.objectContaining<Partial<InstanceType<typeof RevenueCatServiceError>>>({
        statusCode: 409,
      }),
    );
    expect(mockPrisma.$transaction).not.toHaveBeenCalled();
  });
});
