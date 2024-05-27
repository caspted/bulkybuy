import React from 'react';
import '@testing-library/jest-dom'
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import RegisterCard from '../../src/components/custom/registerCard';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

const mockRouter: AppRouterInstance = {
  push: jest.fn(),
} as unknown as AppRouterInstance;

jest.mock('../../src/utils/authApi', () => ({
  register: jest.fn(),
}));

describe('RegisterCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders', () => {
    render(<RegisterCard router={mockRouter} />);
  });

  it('display error messages; invalid input', async () => {
    render(<RegisterCard router={mockRouter} />);

    fireEvent.click(screen.getByText('Create New Account'));

    await waitFor(() => {
      expect(screen.getByText('Enter a username')).toBeInTheDocument();
      expect(screen.getByText('Enter a valid email')).toBeInTheDocument();
      expect(screen.getByText('Enter a password')).toBeInTheDocument();
    });
  });

  it('register with valid input', async () => {
    const { register } = require('../../src/utils/authApi');

    render(<RegisterCard router={mockRouter} />);

    fireEvent.change(screen.getByPlaceholderText('Your username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText('Your email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Your password'), { target: { value: 'testpassword' } });

    fireEvent.click(screen.getByText('Create New Account'));
    await waitFor(() => {
      expect(register).toHaveBeenCalledWith('testuser', 'test@example.com', 'testpassword');
    });
  });
});