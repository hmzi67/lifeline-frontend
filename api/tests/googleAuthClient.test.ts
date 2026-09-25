const mockAsyncStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  multiRemove: jest.fn(),
};

jest.mock('@react-native-async-storage/async-storage', () => ({
  __esModule: true,
  default: mockAsyncStorage,
}), { virtual: true });

const { AuthService } = require('../../../services/authService') as typeof import('../../../services/authService');

describe('Google auth client request', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    mockAsyncStorage.getItem.mockReset();
    mockAsyncStorage.setItem.mockReset();
    mockAsyncStorage.multiRemove.mockReset();
  });

  it('preserves a Google 401 without trying to refresh or clear an app session', async () => {
    jest.spyOn(console, 'log').mockImplementation(() => undefined);
    jest.spyOn(console, 'error').mockImplementation(() => undefined);

    const fetchMock = jest.fn().mockResolvedValue(new Response(
      JSON.stringify({
        success: false,
        message: 'Invalid or expired Google ID token',
      }),
      {
        status: 401,
        headers: { 'content-type': 'application/json' },
      },
    ));
    global.fetch = fetchMock as typeof fetch;

    await expect(AuthService.googleLogin('google-id-token')).rejects.toThrow(
      'Invalid or expired Google ID token',
    );

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.example.test/api/auth/google/mobile',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ idToken: 'google-id-token' }),
      }),
    );
    expect(mockAsyncStorage.getItem).not.toHaveBeenCalled();
    expect(mockAsyncStorage.multiRemove).not.toHaveBeenCalled();
  });
});
