import getUserInfo from '../../src/utils/getUserInfo';

const localStorageMock = (function() {
  let store: { [key: string]: string } = {};

  return {
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value: string) {
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

jest.mock('jsonwebtoken', () => ({
  decode: jest.fn(),
}));

afterEach(() => {
  jest.resetAllMocks();
  localStorageMock.clear();
});

interface DecodedToken {
  userId: string;
  email: string;
}

describe('getUserInfo', () => {
  it('return decoded token', () => {
    const mockDecodedToken: DecodedToken = { userId: '123', email: 'user@example.com' };
    const mockToken = 'mock_token';
    
    localStorageMock.setItem('token', mockToken);
    const jwtMock = require('jsonwebtoken');
    jwtMock.decode.mockReturnValue(mockDecodedToken);

    const result = getUserInfo();

    expect(jwtMock.decode).toHaveBeenCalledWith(mockToken);
    expect(result).toEqual(mockDecodedToken);
  });

  it('return null; token is not found', () => {
    const jwtMock = require('jsonwebtoken');
    jwtMock.decode.mockReturnValue(null);

    const result = getUserInfo();

    expect(jwtMock.decode).toHaveBeenCalledWith(null);
    expect(result).toBeNull();
  });
});