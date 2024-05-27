import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from '../../src/components/custom/navbar';
import { usePathname, useRouter } from 'next/navigation';

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

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

jest.mock('../../src/utils/getUserInfo', () => ({
  __esModule: true,
  default: () => ({ id: 'mockUserId' }),
}));

jest.mock('../../src/utils/getUser', () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue({ name: 'John Doe' }),
}));

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('Navbar', () => {
  beforeEach(() => {
    localStorage.clear();
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  it('renders', () => {
    (usePathname as jest.Mock).mockReturnValue('');
    render(<Navbar />);
    expect(screen.getByText('BulkyBuy')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Auctions')).toBeInTheDocument();
    expect(screen.getByText('Your Products')).toBeInTheDocument();
    expect(screen.getByText('User Profile')).toBeInTheDocument();
  });

  it('displays the username and logout button when user is logged in', async () => {
    (usePathname as jest.Mock).mockReturnValue('');
    localStorage.setItem('token', 'mockToken');

    render(<Navbar />);
    await waitFor(() => expect(screen.getByText('Hello John Doe')).toBeInTheDocument());
    expect(screen.getByRole('button', { name: 'Logout' })).toBeInTheDocument();
  });

  it('pushes to login; user is not logged in', () => {
    (usePathname as jest.Mock).mockReturnValue('');
    render(<Navbar />);

    const mockRouter = useRouter();
    expect(mockRouter.push).toHaveBeenCalledWith('/login');
  });

  it('clear local storage and navigate to login on logout', () => {
    (usePathname as jest.Mock).mockReturnValue('');
    localStorage.setItem('token', 'mockToken');

    render(<Navbar />);
    fireEvent.click(screen.getByRole('button', { name: 'Logout' }));

    expect(localStorage.getItem('token')).toBeNull();
    const mockRouter = useRouter();
    expect(mockRouter.push).toHaveBeenCalledWith('/login');
  });

  it('does not render the navbar when path is login', () => {
    (usePathname as jest.Mock).mockReturnValue('/login');
    render(<Navbar />);
    expect(screen.queryByText('BulkyBuy')).not.toBeInTheDocument();
    expect(screen.queryByText('Home')).not.toBeInTheDocument();
    expect(screen.queryByText('Auctions')).not.toBeInTheDocument();
    expect(screen.queryByText('Your Products')).not.toBeInTheDocument();
    expect(screen.queryByText('User Profile')).not.toBeInTheDocument();
  });

  it('does not render the navbar when path is register', () => {
    (usePathname as jest.Mock).mockReturnValue('/register');
    render(<Navbar />);
    expect(screen.queryByText('BulkyBuy')).not.toBeInTheDocument();
    expect(screen.queryByText('Home')).not.toBeInTheDocument();
    expect(screen.queryByText('Auctions')).not.toBeInTheDocument();
    expect(screen.queryByText('Your Products')).not.toBeInTheDocument();
    expect(screen.queryByText('User Profile')).not.toBeInTheDocument();
  });
});
