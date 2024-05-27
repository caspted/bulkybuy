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

  it('return token', () => {
    const mockToken = 'mock_token';
    localStorageMock.setItem('token', mockToken);

    const token = getToken();

    expect(token).toBe(mockToken);
  });

  it('return null; token is not found', () => {
    const token = getToken();

    expect(token).toBeNull();
  });
});