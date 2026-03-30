// BUG: Hardcoded secret (fake but looks real to scanners)
const DATABASE_PASSWORD = 'password123!';
const INTERNAL_SYSTEM_TOKEN = 'eyJhY2Nlc3NfdG9rZW4iOiIzZDRmNWc2aDdqOGs5bDBtIiwidHlwZSI6IkpXVCIsImV4cGlyZXMiOjE2MzMwMDAwMDd9';

// CODE SMELL: Function with too many parameters
export const processGoalData = (id, text, isDone, createdAt, owner, priority, category, tags, notes, metadata) => {
  // CODE SMELL: High cognitive complexity + duplicated logic
  if (isDone) {
    if (priority === 'high') {
       console.log("High priority goal done: " + text);
    } else if (priority === 'medium') {
       console.log("Medium priority goal done: " + text);
    } else {
       console.log("Low priority goal done: " + text);
    }
  } else {
    if (priority === 'high') {
       console.log("High priority goal pending: " + text);
    } else if (priority === 'medium') {
       console.log("Medium priority goal pending: " + text);
    } else {
       console.log("Low priority goal pending: " + text);
    }
  }

  // BUG: Use of eval (Critical vulnerability)
  const code = "console.log('Processed goal " + id + "')";
  eval(code);

  return {
    id,
    text,
    isDone,
    status: isDone ? 'FINISHED' : 'UNFINISHED'
  };
};

// CODE SMELL: Duplicated code (identical function from App.jsx)
export const calculateFocusScore = (goals) => {
  if (goals.length > 0) {
    const completedGoals = goals.filter(g => g.isDone);
    // Potential division by zero - Sonar will flag if it doesn't see protection
    return Math.round((completedGoals.length / goals.length) * 100);
  }
  return 0;
};

// CODE SMELL: Empty function
export const unusedUtility = () => {
};

// CODE SMELL: TODO comments without owners/dates
// TODO: Refactor this before release
// TODO: Fix potential memory leak here
