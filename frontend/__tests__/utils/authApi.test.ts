global.fetch = jest.fn();
import { login, register } from "../../src/utils/authApi";

describe('login', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return a token when credentials are valid', async () => {
    const mockEmail = 'test@example.com';
    const mockPassword = 'password';
    const mockToken = 'mock-token';

    // Mock the fetch response
    const mockResponse = {
      ok: true,
      status: 200,
      json: async () => ({ body: { token: mockToken } }),
    } as unknown as Response;
    (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

    const result = await login(mockEmail, mockPassword);

    expect(global.fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: mockEmail, password: mockPassword }),
      }
    );
    expect(result).toBe(mockToken);
  });

  test('should throw an error when credentials are invalid', async () => {
    const mockEmail = 'invalid@example.com';
    const mockPassword = 'wrongpassword';

    // Mock the fetch response with an error
    const mockErrorResponse = {
      ok: false,
      status: 401,
    } as unknown as Response;
    (global.fetch as jest.Mock).mockResolvedValue(mockErrorResponse);

    await expect(login(mockEmail, mockPassword)).rejects.toThrow('Invalid credentials');
  });
});

describe('register', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return a token when registration is successful', async () => {
    const mockUsername = 'testuser';
    const mockEmail = 'test@example.com';
    const mockPassword = 'password';
    const mockToken = 'mock-token';

    // Mock the fetch response
    const mockResponse = {
      ok: true,
      status: 201,
      json: async () => ({ body: { token: mockToken } }),
    } as unknown as Response;
    (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

    const result = await register(mockUsername, mockEmail, mockPassword);

    expect(global.fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName: mockUsername, email: mockEmail, password: mockPassword }),
      }
    );
    expect(result).toBe(mockToken);
  });

  test('should throw an error when email is already in use', async () => {
    const mockUsername = 'testuser';
    const mockEmail = 'existing@example.com';
    const mockPassword = 'password';

    // Mock the fetch response with an error
    const mockErrorResponse = {
      ok: false,
      status: 409,
    } as unknown as Response;
    (global.fetch as jest.Mock).mockResolvedValue(mockErrorResponse);

    await expect(register(mockUsername, mockEmail, mockPassword)).rejects.toThrow('Email already in use');
  });

  test('should throw an error when registration fails', async () => {
    const mockUsername = 'testuser';
    const mockEmail = 'test@example.com';
    const mockPassword = 'password';

    // Mock the fetch response with an error
    const mockErrorResponse = {
      ok: false,
      status: 500,
    } as unknown as Response;
    (global.fetch as jest.Mock).mockResolvedValue(mockErrorResponse);

    await expect(register(mockUsername, mockEmail, mockPassword)).rejects.toThrow('Registration failed');
  });
});