import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Navbar from '../../src/components/custom/navbar';
import { usePathname, useRouter } from 'next/navigation';
import fetchUser from '@/utils/getUser';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useRouter: jest.fn(),
}));

jest.mock('../../src/utils/getUser', () => jest.fn());

describe('Navbar', () => {
  // beforeEach(() => {
  //   (usePathname as jest.Mock).mockReturnValue('/');
  //   (useRouter as jest.Mock).mockReturnValue({
  //     push: jest.fn(),
  //   });
  //   (fetchUser as jest.Mock).mockResolvedValue({ name: 'John Doe' });
  // });

  // it('should render without errors', async () => {
  //   render(<Navbar />);
  //   await waitFor(() => expect(screen.getByText('Hello John Doe')).toBeInTheDocument());
  // });

  // it('should navigate to the correct page when a link is clicked', async () => {
  //   const user = userEvent.setup();
  //   const { push } = (useRouter as jest.Mock).mock.results[0].value;
  //   render(<Navbar />);
  //   await waitFor(() => expect(screen.getByText('Hello John Doe')).toBeInTheDocument());

  //   const auctionsLink = screen.getByText('Auctions');
  //   await user.click(auctionsLink);

  //   expect(push).toHaveBeenCalledWith('/auctions');
  // });

  // it('should log out and navigate to the login page when the logout button is clicked', async () => {
  //   const user = userEvent.setup();
  //   const { push } = (useRouter as jest.Mock).mock.results[0].value;
  //   render(<Navbar />);
  //   await waitFor(() => expect(screen.getByText('Hello John Doe')).toBeInTheDocument());

  //   const logoutButton = screen.getByRole('button', { name: 'Logout' });
  //   await user.click(logoutButton);

  //   expect(localStorage.getItem('token')).toBeNull();
  //   expect(push).toHaveBeenCalledWith('/login');
  // });

  // it('should not render the navbar on the login or register page', () => {
  //   (usePathname as jest.Mock).mockReturnValue('/login');
  //   render(<Navbar />);
  //   expect(screen.queryByRole('header')).toBeNull();
  // });

  // Add more test cases as needed
});