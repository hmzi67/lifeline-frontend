export {};

const mockPrisma = {
  userLicense: {
    findFirst: jest.fn(),
  },
};

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn(() => mockPrisma),
}));

const { getSubscriptionStatus } = require('../src/controllers/subscriptionController') as typeof import('../src/controllers/subscriptionController');
const { default: requireActiveLicense } = require('../src/middleware/requireActiveLicense') as typeof import('../src/middleware/requireActiveLicense');

type MockResponse = {
  statusCode: number;
  body: any;
  status: jest.Mock;
  json: jest.Mock;
};

const createResponse = (): MockResponse => {
  const response = { statusCode: 0, body: null } as MockResponse;
  response.status = jest.fn((statusCode: number) => {
    response.statusCode = statusCode;
    return response;
  });
  response.json = jest.fn((body: any) => {
    response.body = body;
    return response;
  });
  return response;
};

const authenticatedRequest = () => ({
  user: { id: 'user-one', email: 'user@example.com', role: '' },
});

describe('subscription access', () => {
  beforeEach(() => {
    mockPrisma.userLicense.findFirst.mockReset();
  });

  it('returns the authenticated user active entitlement without trusting payment status', async () => {
    const expiresAt = new Date('2026-10-01T00:00:00.000Z');
    mockPrisma.userLicense.findFirst.mockResolvedValue({
      expiresAt,
      payment: {
        cancelAtPeriodEnd: true,
        method: 'app_store',
        pricingPlanId: 'plan-one',
        storeProductId: 'com.irtaza.lifeline.vip.monthly',
      },
    });
    const response = createResponse();

    await getSubscriptionStatus(authenticatedRequest() as any, response as any);

    expect(mockPrisma.userLicense.findFirst).toHaveBeenCalledWith(expect.objectContaining({
      where: {
        userId: 'user-one',
        OR: [
          { expiresAt: null },
          { expiresAt: { gt: expect.any(Date) } },
        ],
      },
    }));
    expect(response.statusCode).toBe(200);
    expect(response.body.data).toEqual({
      active: true,
      expiresAt: expiresAt.toISOString(),
      cancelAtPeriodEnd: true,
      pricingPlanId: 'plan-one',
      productId: 'com.irtaza.lifeline.vip.monthly',
      source: 'app_store',
    });
  });

  it('returns an inactive canonical state when no active license exists', async () => {
    mockPrisma.userLicense.findFirst.mockResolvedValue(null);
    const response = createResponse();

    await getSubscriptionStatus(authenticatedRequest() as any, response as any);

    expect(response.statusCode).toBe(200);
    expect(response.body.data).toEqual({
      active: false,
      expiresAt: null,
      cancelAtPeriodEnd: false,
      pricingPlanId: null,
      productId: null,
      source: null,
    });
  });

  it('blocks protected content when the backend has no active license', async () => {
    mockPrisma.userLicense.findFirst.mockResolvedValue(null);
    const response = createResponse();
    const next = jest.fn();

    await requireActiveLicense(authenticatedRequest() as any, response as any, next);

    expect(response.statusCode).toBe(403);
    expect(response.body.code).toBe('ACTIVE_SUBSCRIPTION_REQUIRED');
    expect(next).not.toHaveBeenCalled();
  });

  it('allows protected content when the backend has an active license', async () => {
    mockPrisma.userLicense.findFirst.mockResolvedValue({
      expiresAt: null,
      payment: null,
    });
    const response = createResponse();
    const next = jest.fn();

    await requireActiveLicense(authenticatedRequest() as any, response as any, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(response.status).not.toHaveBeenCalled();
  });

  it('allows administrators to preview protected content without a consumer license', async () => {
    const response = createResponse();
    const next = jest.fn();

    await requireActiveLicense({
      user: { id: 'admin-one', email: 'admin@example.com', role: 'admin' },
    } as any, response as any, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(mockPrisma.userLicense.findFirst).not.toHaveBeenCalled();
  });
});
