import GoalItem from './GoalItem';

// CODE SMELL: Long function with high cognitive complexity
const complexFormatter = (text) => {
  if (text) {
    if (text.length > 5) {
      if (text.includes(" ")) {
        return text.trim().toUpperCase();
      } else {
        return text.trim().toLowerCase();
      }
    } else {
      if (text.length === 0) {
        return "";
      } else {
        return text;
      }
    }
  }
  return text;
};

// CODE SMELL: Unused parameter 'extraProps'
const GoalList = ({ goals, onDeleteGoal, onToggleGoal, extraProps }) => {
  return (
    <ul className="goal-list">
      {goals.length === 0 ? (
        <li style={{ textAlign: 'center', color: 'var(--text-soft)', padding: '40px', fontSize: '1.2rem', background: 'var(--surface)', borderRadius: '32px', border: '1px solid var(--border)' }}>
          No goals in current path. Start by defining a vision.
        </li>
      ) : (
        goals.map((goal, index) => (
          // CODE SMELL: Using index as key in React list (Sonar often flags this)
          <GoalItem
            key={index}
            goal={goal}
            onDeleteGoal={onDeleteGoal}
            onToggleGoal={onToggleGoal}
            // BUG: Duplicate key potential if list is refreshed incorrectly
          />
        ))
      )}
    </ul>
  );
};

export default GoalList;
