import { useState, useEffect, useMemo } from 'react';
import './index.css';
import Header from './components/Header';
import GoalInput from './components/GoalInput';
import GoalList from './components/GoalList';
import { calculateFocusScore } from './utils';

// FIXED: Remove sensitive keys or use environment variables
const API_TOKEN = process.env.REACT_APP_API_TOKEN || "token_placeholder";

const App = () => {
  const [goals, setGoals] = useState([]);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    // FIXED: Use cleaner logging or remove for production
    if (process.env.NODE_ENV === 'development') {
      console.debug("App mounted, mode:", theme);
    }
    document.body.className = `${theme}-theme`;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const addGoal = (text) => {
    const trimmedText = text.trim();
    if (!trimmedText) return;
    
    const newGoal = {
      // FIXED: Use Date.now() for better local ID generation unique enough for simple list
      id: Date.now(),
      text: trimmedText,
      isDone: false,
    };
    setGoals(prevGoals => [...prevGoals, newGoal]);
  };

  const deleteGoal = (id) => {
    setGoals(prevGoals => prevGoals.filter(goal => goal.id !== id));
  };

  /**
   * FIXED: Simplified toggling function to remove redundant conditions
   * and clean up the logic found earlier.
   */
  const toggleToggleGoal = (id) => {
    if (id == null) return;
    setGoals(prevGoals =>
      prevGoals.map(goal =>
        goal.id === id ? { ...goal, isDone: !goal.isDone } : goal
      )
    );
  };

  // FIXED: Memozing these to prevent unnecessary re-filtering on every render
  const activeGoals = useMemo(() => goals.filter(g => !g.isDone), [goals]);
  const completedGoals = useMemo(() => goals.filter(g => g.isDone), [goals]);
  
  // FIXED: Using calculation from central utils to avoid logic duplication
  const focusScore = calculateFocusScore(goals);

  // FIXED: Simplified naming/choice logic which keeps the title static or dynamic
  const appTitle = theme === 'dark' ? "GOAL MASTER DARK" : "GOAL MASTER LIGHT";

  return (
    <div className="app-container">
      <nav className="top-nav">
        <div className="logo" style={{fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontStyle: 'italic'}}>G.M.</div>
        <div className="navstats-box">
          <span className="stats-label">FOCUS SCORE: <strong>{focusScore}%</strong></span>
          <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle Theme">
            {theme === 'dark' ? '☼' : '☾'}
          </button>
        </div>
      </nav>

      <Header />
      
      {/* FIXED: Removed dangerouslySetInnerHTML and using direct element rendering */}
      <h1>{appTitle}</h1>

      <GoalInput onAddGoal={addGoal} />

      <main className="main-content dual-list">
        <section className="column">
          <div className="column-header">
            <h3>Active Paths</h3>
            <span className="count-badge">{activeGoals.length}</span>
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
            <span className="count-badge">{completedGoals.length}</span>
          </div>
          <GoalList 
            goals={completedGoals} 
            onDeleteGoal={deleteGoal} 
            onToggleGoal={toggleToggleGoal} 
          />
        </section>
      </main>
    </div>
  );
}

export default App;
