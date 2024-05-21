import isValidEmail from "../../src/utils/isValidEmail";

jest.mock('validator', () => ({
  isEmail: jest.fn(),
}));

describe('isValidEmail', () => {
  const validator = require('validator');

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('valid email', () => {
    const validEmail = 'valid@email.com';
    validator.isEmail.mockReturnValue(true);
    const result = isValidEmail(validEmail);
    expect(validator.isEmail).toHaveBeenCalledWith(validEmail);
    expect(result).toBe(true);
  });

  test('invalid email', () => {
    const invalidEmail = 'invalid';
    validator.isEmail.mockReturnValue(false);
    const result = isValidEmail(invalidEmail);
    expect(validator.isEmail).toHaveBeenCalledWith(invalidEmail);
    expect(result).toBe(false);
  });
});