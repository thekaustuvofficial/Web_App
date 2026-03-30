import React from 'react';

const GoalItem = ({ goal, onDeleteGoal, onToggleGoal }) => {
  return (
    <li className={`goal-item ${goal.isDone ? 'done' : ''}`}>
      <span className="goal-text">{goal.text}</span>
      <div className="goal-actions">
        <button
          className="btn-done"
          onClick={() => onToggleGoal(goal.id)}
        >
          {goal.isDone ? 'Restore' : 'Complete'}
        </button>
        <button
          className="btn-delete"
          onClick={() => onDeleteGoal(goal.id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default GoalItem;
