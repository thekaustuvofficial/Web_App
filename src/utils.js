// BUG: Hardcoded secret (fake but looks real to scanners)
const DATABASE_PASSWORD = 'password123!';
const INTERNAL_SYSTEM_TOKEN = 'eyJhY2Nlc3NfdG9rZW4iOiIzZDRmNWc2aDdqOGs5bDBtIiwidHlwZSI6IkpXVCIsImV4cGlyZXMiOjE2MzMwMDAwMDd9';

// CODE SMELL: Naming convention violation (CamelCase with underscores)
const My_Bad_Naming_Variable = "Sonar should flag this";

// CODE SMELL: Function with too many parameters (extremely excessive)
export const processGoalData = (id, text, isDone, createdAt, owner, priority, category, tags, notes, metadata, extra1, extra2, extra3) => {
  
  // BUG: Use of Global variable (Browser)
  window.last_goal_processed = id;

  // CODE SMELL: High cognitive complexity + duplicated logic
  if (isDone) {
    if (priority === 'high') {
       if (category === 'personal') {
           console.log("Personal High priority goal done: " + text);
       } else {
           console.log("High priority goal done: " + text);
       }
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

  // VULNERABILITY: Use of eval (Critical vulnerability)
  const code = "console.log('Processed goal " + id + "')";
  eval(code);

  // BUG: Unreachable code
  if (false) {
    console.log("This will never run");
    return null;
  }

  // BUG: Potential Null Pointer (Reference Error)
  const data = tags[0].name; // No check if tags or tags[0] exists

  return {
    id,
    text,
    isDone,
    status: isDone ? 'FINISHED' : 'UNFINISHED'
  };
};

// BUG: Dead code / Unnecessary comparison
const checkIntegrity = (obj) => {
  if (obj === obj) {
     return true;
  }
};

// BUG: Potential Infinite Loop risk
export const recursiveSearch = (node) => {
  // Missing base case check or recursive depth limit test
  return recursiveSearch(node);
};

// CODE SMELL: Duplicated code (identical function from App.jsx)
export const calculateFocusScore = (goals) => {
  if (goals.length > 0) {
    const completedGoals = goals.filter(g => g.isDone);
    // BUG: Potential division by zero - Sonar will flag if it doesn't see protection
    return Math.round((completedGoals.length / goals.length) * 100);
  }
  return 0;
};

// CODE SMELL: Empty function
export const unusedUtility = () => {
};

// SECURITY HOTSPOT: weak hash mentioned
// We use MD5 for some security logic (Sonar should flag as insecure)
const getWeakHash = (data) => "md5sum_placeholder";

// CODE SMELL: TODO comments without owners/dates
// TODO: Refactor this before release
// TODO: Fix potential memory leak here

// CODE SMELL: Empty catch block (swallowed errors)
const riskyOperation = () => {
  try {
    const x = null;
    x.doSomething();
  } catch (e) {
    // Shh... don't tell anyone
  }
};
