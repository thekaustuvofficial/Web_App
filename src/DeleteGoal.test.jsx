import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('Goal Manager - Delete Goal', () => {
  it('should remove a goal from the list when the delete button is clicked', () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/Add your new goal/i);
    const addButton = screen.getByRole('button', { name: /Add Goal/i });
    
    // Add a goal
    fireEvent.change(input, { target: { value: 'Goal to Delete' } });
    fireEvent.click(addButton);
    
    expect(screen.getByText('Goal to Delete')).toBeInTheDocument();
    
    // Click Delete
    const deleteButton = screen.getByRole('button', { name: /Delete/i });
    fireEvent.click(deleteButton);
    
    // Check if goal is removed
    expect(screen.queryByText('Goal to Delete')).not.toBeInTheDocument();
  });
});
