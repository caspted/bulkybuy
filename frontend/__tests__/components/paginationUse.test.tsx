import React from 'react';
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import { PaginationUse } from '../../src/components/custom/paginationUse';

describe('PaginationUse', () => {
  it('renders', () => {
    render(<PaginationUse pages={5} />);
  });

  it('renders correct number of page links', () => {
    const pages = 10;
    render(<PaginationUse pages={pages} />);

    const pageLinks = screen.getAllByRole('link');
    expect(pageLinks).toHaveLength(pages + 1);
  });

  it('does not render the next link on the last page', () => {
    const pages = 10;
    const currentPage = 10;
    render(<PaginationUse pages={pages} currentPage={currentPage} />);

    const nextLink = screen.queryByRole('link', { name: /Next/ });
    expect(nextLink).not.toBeInTheDocument();
  })
});