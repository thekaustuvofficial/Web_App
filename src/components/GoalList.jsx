import GoalItem from './GoalItem';

/**
 * FIXED: Removed unused parameter 'extraProps' and simplified the component structure.
 * Using goal.id as the unique key instead of the array index to avoid React list reconciliation issues.
 */
const GoalList = ({ goals, onDeleteGoal, onToggleGoal }) => {
  if (goals.length === 0) {
    return (
      <ul className="goal-list">
        <li className="empty-state">
          No goals in current path. Start by defining a vision.
        </li>
      </ul>
    );
  }

  return (
    <ul className="goal-list">
      {goals.map((goal) => (
        <GoalItem
          key={goal.id}
          goal={goal}
          onDeleteGoal={onDeleteGoal}
          onToggleGoal={onToggleGoal}
        />
      ))}
    </ul>
  );
};

export default GoalList;
