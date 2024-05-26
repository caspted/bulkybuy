import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import LoginCard from '../../src/components/custom/loginCard';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

const mockRouter: AppRouterInstance = {
  push: jest.fn(),
} as unknown as AppRouterInstance;

jest.mock('../../src/utils/authApi', () => ({
  login: jest.fn(),
}));

describe('LoginCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render without errors', () => {
    render(<LoginCard router={mockRouter} />);
  });

  it('should display error messages for invalid input', async () => {
    render(<LoginCard router={mockRouter} />);

    fireEvent.click(screen.getByText('Log In'));

    await waitFor(() => {
      expect(screen.getByText('Enter a valid email')).toBeInTheDocument();
      expect(screen.getByText('Enter your password')).toBeInTheDocument();
    });
  });

  it('should call the login function with valid input', async () => {
    const { login } = require('../../src/utils/authApi');

    render(<LoginCard router={mockRouter} />);

    fireEvent.change(screen.getByPlaceholderText('Your email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Your password'), {
      target: { value: 'testpassword' },
    });

    fireEvent.click(screen.getByText('Log In'));

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith('test@example.com', 'testpassword');
    });
  });

  it('should display incorrect credentials message on login error', async () => {
    const { login } = require('../../src/utils/authApi');
    login.mockRejectedValueOnce(new Error('Incorrect credentials'));

    render(<LoginCard router={mockRouter} />);

    fireEvent.change(screen.getByPlaceholderText('Your email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Your password'), {
      target: { value: 'testpassword' },
    });

    fireEvent.click(screen.getByText('Log In'));

    await waitFor(() => {
      expect(screen.getByText('Password or username is incorrect')).toBeInTheDocument();
    });
  });
});