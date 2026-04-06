import { useState } from 'react';

/**
 * FIXED: Removed duplicated logic and unused state variables. 
 * Simplified the handle submit logic and improved accessibility.
 */
const GoalInput = ({ onAddGoal }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // FIXED: Cleaned up redundant checks
    const trimmedValue = inputValue.trim();
    if (trimmedValue) {
      onAddGoal(trimmedValue);
      setInputValue('');
    }
  };

  return (
    <form className="input-container" onSubmit={handleSubmit}>
      {/* FIXED: Added aria-label for accessibility */}
      <label htmlFor="goal-input" className="sr-only">New Goal</label>
      <input
        type="text"
        id="goal-input"
        placeholder="Add your new goal..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        aria-label="New Goal"
      />
      
      {/* FIXED: Added descriptive aria-label for the icon button */}
      <button type="submit" className="btn-add" aria-label="Add Goal">
        +
      </button>
    </form>
  );
};

export default GoalInput;
