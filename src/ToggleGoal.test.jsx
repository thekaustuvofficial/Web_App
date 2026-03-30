import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('Goal Manager - Toggle Goal (Complete/Restore)', () => {
  it('should move a goal from Active to Accomplished when "Complete" is clicked', () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/Add your new goal/i);
    const addButton = screen.getByRole('button', { name: /Add Goal/i });
    
    // Add a goal
    fireEvent.change(input, { target: { value: 'Incomplete Goal' } });
    fireEvent.click(addButton);
    
    // Find the goal item
    const goalItem = screen.getByText('Incomplete Goal').closest('.goal-item');
    expect(goalItem).not.toHaveClass('done');
    
    // Click Complete
    const completeButton = screen.getByRole('button', { name: /Complete/i });
    fireEvent.click(completeButton);
    
    // Re-check the goal item in the Accomplished column
    const doneItem = screen.getByText('Incomplete Goal').closest('.goal-item');
    expect(doneItem).toHaveClass('done');
    
    // The button should now say "Restore"
    expect(screen.getByRole('button', { name: /Restore/i })).toBeInTheDocument();
  });

  it('should move an accomplished goal back to active when "Restore" is clicked', () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/Add your new goal/i);
    const addButton = screen.getByRole('button', { name: /Add Goal/i });
    
    // Add and Complete a goal
    fireEvent.change(input, { target: { value: 'Already Done Goal' } });
    fireEvent.click(addButton);
    fireEvent.click(screen.getByRole('button', { name: /Complete/i }));
    
    // Find and Click Restore
    const restoreButton = screen.getByRole('button', { name: /Restore/i });
    fireEvent.click(restoreButton);
    
    // Should now be back in Active Paths (no 'done' class)
    const activeItem = screen.getByText('Already Done Goal').closest('.goal-item');
    expect(activeItem).not.toHaveClass('done');
    
    // Button should now be 'Complete' again
    expect(screen.getByRole('button', { name: /Complete/i })).toBeInTheDocument();
  });
});
