import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('Smart Basket Domain Analysis', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('renders standard empty core layout state', () => {
    render(<App />);
    expect(screen.getByText(/Your shopping list is currently empty/i)).toBeInTheDocument();
  });

  it('proves addition engine appends pricing matrices correctly', () => {
    render(<App />);

    const nameInput = screen.getByPlaceholderText(/e.g. Fresh Spinach.../i);
    const priceInput = screen.getByPlaceholderText(/£ Price/i);
    const addButton = screen.getByRole('button', { name: /Add/i });

    fireEvent.change(nameInput, { target: { value: 'Avocado Combo' } });
    fireEvent.change(priceInput, { target: { value: '4.25' } });
    fireEvent.click(addButton);

    expect(screen.getByText('Avocado Combo')).toBeInTheDocument();
    expect(screen.getByTestId('item-cost')).toHaveTextContent('£4.25');  });

  it('reorders items when moved up or down', () => {
    render(<App />);

    const nameInput = screen.getByPlaceholderText(/e.g. Fresh Spinach.../i);
    const addButton = screen.getByRole('button', { name: /Add/i });

    fireEvent.change(nameInput, { target: { value: 'Apples' } });
    fireEvent.click(addButton);
    fireEvent.change(nameInput, { target: { value: 'Bread' } });
    fireEvent.click(addButton);

    const getTitlesInOrder = () =>
      screen.getAllByText(/Apples|Bread/).map((el) => el.textContent);

    expect(getTitlesInOrder()).toEqual(['Apples', 'Bread']);

    fireEvent.click(screen.getByLabelText('Move Bread up'));

    expect(getTitlesInOrder()).toEqual(['Bread', 'Apples']);
  });
});