export {};

const mockFindWebhookUserId = jest.fn();
const mockSyncRevenueCatEntitlement = jest.fn();

jest.mock('../src/services/revenueCatService', () => ({
  RevenueCatServiceError: class RevenueCatServiceError extends Error {
    statusCode: number;

    constructor(message: string, statusCode = 500) {
      super(message);
      this.statusCode = statusCode;
    }
  },
  findWebhookUserId: mockFindWebhookUserId,
  syncRevenueCatEntitlement: mockSyncRevenueCatEntitlement,
}));

const {
  handleRevenueCatWebhook,
} = require('../src/controllers/inAppPurchaseController') as typeof import('../src/controllers/inAppPurchaseController');

const createResponse = () => {
  const response: any = { body: null, statusCode: 0 };
  response.status = jest.fn((statusCode: number) => {
    response.statusCode = statusCode;
    return response;
  });
  response.json = jest.fn((body: unknown) => {
    response.body = body;
    return response;
  });
  return response;
};

const createRequest = (event: Record<string, unknown>, authorization = 'Bearer webhook-secret') => ({
  body: { event },
  get: jest.fn((header: string) => header.toLowerCase() === 'authorization' ? authorization : undefined),
});

describe('RevenueCat webhook controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.REVENUECAT_WEBHOOK_AUTHORIZATION = 'Bearer webhook-secret';
    mockSyncRevenueCatEntitlement.mockResolvedValue({ active: true });
  });

  it('rejects a webhook with the wrong Authorization header', async () => {
    const response = createResponse();

    await handleRevenueCatWebhook(
      createRequest({ type: 'RENEWAL' }, 'Bearer wrong-secret') as any,
      response,
    );

    expect(response.statusCode).toBe(401);
    expect(mockFindWebhookUserId).not.toHaveBeenCalled();
  });

  it('resolves normal events using app user ID, original ID, and aliases', async () => {
    mockFindWebhookUserId.mockResolvedValue('user-current');
    const response = createResponse();

    await handleRevenueCatWebhook(createRequest({
      type: 'RENEWAL',
      app_user_id: 'user-current',
      original_app_user_id: '$RCAnonymousID:old',
      aliases: ['user-previous'],
    }) as any, response);

    expect(mockFindWebhookUserId).toHaveBeenCalledWith([
      'user-current',
      '$RCAnonymousID:old',
      'user-previous',
    ]);
    expect(mockSyncRevenueCatEntitlement).toHaveBeenCalledWith('user-current');
    expect(response.body).toEqual({ received: true, active: true, syncedUsers: 1 });
  });

  it('syncs both sides of a RevenueCat transfer event', async () => {
    mockFindWebhookUserId.mockImplementation(async ([id]: string[]) => id);
    mockSyncRevenueCatEntitlement
      .mockResolvedValueOnce({ active: false })
      .mockResolvedValueOnce({ active: true });
    const response = createResponse();

    await handleRevenueCatWebhook(createRequest({
      type: 'TRANSFER',
      transferred_from: ['user-from'],
      transferred_to: ['user-to'],
    }) as any, response);

    expect(mockSyncRevenueCatEntitlement).toHaveBeenCalledTimes(2);
    expect(mockSyncRevenueCatEntitlement).toHaveBeenCalledWith('user-from');
    expect(mockSyncRevenueCatEntitlement).toHaveBeenCalledWith('user-to');
    expect(response.body).toEqual({ received: true, active: true, syncedUsers: 2 });
  });
});
