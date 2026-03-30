import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('Goal Manager - Theme Switching', () => {
  it('should toggle between Light and Dark themes', () => {
    render(<App />);
    
    // Initial theme should be Dark (check body class)
    expect(document.body).toHaveClass('dark-theme');
    
    // Click toggle
    const themeToggle = screen.getByRole('button', { name: /[☼☾]/ });
    fireEvent.click(themeToggle);
    
    // Should now be Light
    expect(document.body).toHaveClass('light-theme');
    
    // Click toggle again
    fireEvent.click(themeToggle);
    
    // Should be Dark again
    expect(document.body).toHaveClass('dark-theme');
  });
});
