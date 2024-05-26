import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import { CategorySelection } from '../../src/components/custom/categorySelection';

describe('CategorySelection', () => {
  it('should render without errors', () => {
    const setCategory = jest.fn();
    render(<CategorySelection setCategory={setCategory} />);
  });

  it('should select a category and close the popover', () => {
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
});