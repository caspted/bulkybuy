import getToken from '../../src/utils/getToken';

const localStorageMock = (function() {
  let store: { [key: string]: string | null } = {};

  return {
    getItem(key: string): string | null {
      return store[key] || null;
    },
    setItem(key: string, value: string | null) {
      store[key] = value;
    },
    removeItem(key: string) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('getToken', () => {
  afterEach(() => {
    localStorageMock.clear();
  });

  test('should return token from localStorage', () => {
    const mockToken = 'mock_token';
    localStorageMock.setItem('token', mockToken);

    const token = getToken();

    expect(token).toBe(mockToken);
  });

  test('should return null if token is not found in localStorage', () => {
    const token = getToken();

    expect(token).toBeNull();
  });
});