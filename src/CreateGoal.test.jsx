import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('Goal Manager - Create Goal', () => {
  it('should add a new goal when the add button is clicked', () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/Add your new goal/i);
    const addButton = screen.getByText(/Add Goal/i, { selector: 'button' });
    
    fireEvent.change(input, { target: { value: 'New Test Goal' } });
    fireEvent.click(addButton);
    
    expect(screen.getByText('New Test Goal')).toBeInTheDocument();
  });

  it('should not add an empty goal', () => {
    render(<App />);
    const addButton = screen.getByRole('button', { name: /Add Goal/i });
    const initialItems = screen.queryAllByRole('listitem');
    fireEvent.click(addButton);
    const currentItems = screen.queryAllByRole('listitem');
    expect(currentItems.length).toBe(initialItems.length);
  });
});
