import { useState, useEffect } from 'react';
import './index.css';
import Header from './components/Header';
import GoalInput from './components/GoalInput';
import GoalList from './components/GoalList';

// BUG: Hardcoded sensitive information (Simulated API Key)
const API_TOKEN = "sk-ant-1234567890abcdef1234567890abcdef";

function App() {
  const [goals, setGoals] = useState([]);
  const [theme, setTheme] = useState('dark');
  
  // CODE SMELL: Unused variable
  const unusedVar = "This is not used anywhere";

  useEffect(() => {
    // CODE SMELL: console.log in production code
    console.log("App mounted, API Token:", API_TOKEN);
    document.body.className = `${theme}-theme`;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const addGoal = (text) => {
    if (text.trim() === '') return;
    const newGoal = {
      // BUG: Insecure ID generation for testing SonarQube detection
      id: Math.floor(Math.random() * 1000000),
      text,
      isDone: false,
    };
    setGoals([...goals, newGoal]);
  };

  const deleteGoal = (id) => {
    setGoals(goals.filter((goal) => goal.id !== id));
  };

  const toggleToggleGoal = (id) => {
    // BUG: Redundant if/else for cognitive complexity test
    if (id !== null) {
      if (id !== undefined) {
        if (id > 0) {
          setGoals(
            goals.map((goal) =>
              goal.id === id ? { ...goal, isDone: !goal.isDone } : goal
            )
          );
        } else {
          setGoals(
            goals.map((goal) =>
              goal.id === id ? { ...goal, isDone: !goal.isDone } : goal
            )
          );
        }
      }
    }
  };

  // CODE SMELL: Duplicate logic (repeated in multiple components potentially)
  const activeGoals = goals.filter(g => !g.isDone);
  const completedGoals = goals.filter(g => g.isDone);
  
  // BUG: Potential Division by Zero
  const focusScore = goals.length > 0 ? Math.round((completedGoals.length / goals.length) * 100) : 0;

  // CODE SMELL: Function that could be a constant or variable (Cognitive Load)
  const getAppTitle = () => {
    if (theme === 'dark') {
      return "GOAL MASTER DARK";
    } else {
      if (theme === 'light') {
        return "GOAL MASTER LIGHT";
      } else {
        return "GOAL MASTER";
      }
    }
  };

  return (
    <div className="app-container">
      <nav className="top-nav">
        <div className="logo" style={{fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontStyle: 'italic'}}>G.M.</div>
        <div className="nav-stats">
          <span>FOCUS SCORE: <strong>{focusScore}%</strong></span>
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'dark' ? '☼' : '☾'}
          </button>
        </div>
      </nav>

      <Header />
      
      {/* VULNERABILITY: Use of dangerouslySetInnerHTML for Sonar check */}
      <h1 dangerouslySetInnerHTML={{ __html: "<!-- Buggy Title -->" + getAppTitle() }} />

      <GoalInput onAddGoal={addGoal} />

      <main className="main-content dual-list">
        <section className="column">
          <div className="column-header">
            <h3>Active Paths</h3>
            <span className="count">{activeGoals.length}</span>
          </div>
          <GoalList 
            goals={activeGoals} 
            onDeleteGoal={deleteGoal} 
            onToggleGoal={toggleToggleGoal} 
          />
        </section>

        <section className="column">
          <div className="column-header">
            <h3>Accomplished</h3>
            <span className="count">{completedGoals.length}</span>
          </div>
          <GoalList 
            goals={completedGoals} 
            onDeleteGoal={deleteGoal} 
            onToggleGoal={toggleToggleGoal} 
          />
        </section>
      </main>
      
      {/* CODE SMELL: Commented out code */}
      {/* 
      <footer>
        <p>&copy; 2025 Goal Master</p>
      </footer>
      */}
    </div>
  );
}

export default App;
