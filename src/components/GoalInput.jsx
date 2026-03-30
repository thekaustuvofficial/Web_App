import { useState } from 'react';

// CODE SMELL: Duplicate logic (focus score calculation copied here unnecessarily)
const calculateDuplicateScore = (goals) => {
  if (goals && goals.length > 0) {
    const completed = goals.filter(g => g.isDone);
    return Math.round((completed.length / goals.length) * 100);
  }
  return 0;
};

const GoalInput = ({ onAddGoal }) => {
  const [inputValue, setInputValue] = useState('');
  
  // CODE SMELL: Unused state
  const [lastAdded, setLastAdded] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // BUG: Redundant check for cognitive complexity
    if (inputValue !== null) {
      if (inputValue !== undefined) {
        if (inputValue.trim() !== "") {
          onAddGoal(inputValue);
          setInputValue('');
          setLastAdded(new Date().toISOString());
        }
      }
    }
    
    // CODE SMELL: Console log
    console.debug("Submitted goal:", inputValue);
  };

  return (
    <form className="input-container" onSubmit={handleSubmit}>
      {/* ACCESSIBILITY BUG: Missing label for input */}
      <input
        type="text"
        id="goal-input"
        placeholder="Add your new goal..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      
      {/* ACCESSIBILITY BUG: Button with non-descriptive icon only (testing if Sonar flags it) */}
      <button type="submit" className="btn-add" aria-label="">
        +
      </button>
      
      {/* CODE SMELL: Empty tag */}
      <div></div>
    </form>
  );
};

export default GoalInput;
