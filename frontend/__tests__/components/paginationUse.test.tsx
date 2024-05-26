import React from 'react';
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import { PaginationUse } from '../../src/components/custom/paginationUse';

describe('PaginationUse', () => {
  it('should render without errors', () => {
    render(<PaginationUse pages={5} />);
    // Add assertions for the initial state
  });

  it('should render the correct number of page links', () => {
    const pages = 10;
    render(<PaginationUse pages={pages} />);

    const pageLinks = screen.getAllByRole('link');
    expect(pageLinks).toHaveLength(pages + 1);
  });

  // it('should mark the current page as active', () => {
  //   const pages = 5;
  //   const currentPage = 3;
  //   render(<PaginationUse pages={pages} currentPage={currentPage} />);

  //   const activePageLink = screen.getByRole('link', { current: true });
  //   expect(activePageLink).toHaveTextContent(`${currentPage}`);
  // });

  // it('should render the previous and next links correctly', () => {
  //   const pages = 10;
  //   const currentPage = 5;
  //   render(<PaginationUse pages={pages} currentPage={currentPage} />);

  //   const previousLink = screen.getByRole('link', { name: /Previous/ });
  //   expect(previousLink).toHaveAttribute('href', `/auctions/${currentPage - 1}`);

  //   const nextLink = screen.getByRole('link', { name: /Next/ });
  //   expect(nextLink).toHaveAttribute('href', `/auctions/${currentPage + 1}`);
  // });

  // it('should not render the previous link on the first page', () => {
  //   const pages = 10;
  //   const currentPage = 1;
  //   render(<PaginationUse pages={pages} currentPage={currentPage} />);

  //   const previousLink = screen.queryByRole('link', { name: /Previous/ });
  //   expect(previousLink).not.toBeInTheDocument();
  // });

  it('should not render the next link on the last page', () => {
    const pages = 10;
    const currentPage = 10;
    render(<PaginationUse pages={pages} currentPage={currentPage} />);

    const nextLink = screen.queryByRole('link', { name: /Next/ });
    expect(nextLink).not.toBeInTheDocument();
  })
});