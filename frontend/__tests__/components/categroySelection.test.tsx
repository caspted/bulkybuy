import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import { CategorySelection } from '../../src/components/custom/categorySelection';

describe('CategorySelection', () => {
  let setCategory: jest.Mock;

  beforeEach(() => {
    setCategory = jest.fn()
  })

  it('renders', () => {
    const setCategory = jest.fn();
    render(<CategorySelection setCategory={setCategory} />);
  });

  it('selects a category and close the popover', () => {
    const setCategory = jest.fn();
    render(<CategorySelection setCategory={setCategory} />);

    const triggerButton = screen.getByRole('combobox');
    fireEvent.click(triggerButton);

    const foodCategory = screen.getByText('Food');
    fireEvent.click(foodCategory);

    const popoverContent = screen.queryByRole('menu');
    expect(popoverContent).not.toBeInTheDocument();
    expect(setCategory).toHaveBeenCalledWith('food');
    expect(triggerButton).toHaveTextContent('Food');
  });

  it('displays "No category found"; no category matches the search term', () => {
    const setCategory = jest.fn();
    render(<CategorySelection setCategory={setCategory} />);

    const triggerButton = screen.getByRole('combobox');
    fireEvent.click(triggerButton);

    const searchInput = screen.getByPlaceholderText('Search category...');
    fireEvent.change(searchInput, { target: { value: 'nonexistent' } });

    const noCategoryFoundMessage = screen.getByText('No category found.');
    expect(noCategoryFoundMessage).toBeInTheDocument();
  });

  it('selects a category and closes the popover', () => {
    render(<CategorySelection setCategory={setCategory} />)
    const button = screen.getByRole('combobox')
    fireEvent.click(button)
    
    const categoryOption = screen.getByText('Food')
    fireEvent.click(categoryOption)
    
    expect(setCategory).toHaveBeenCalledWith('food')
    expect(screen.queryByText('Search category...')).not.toBeInTheDocument()
  })
});