import React, { useEffect, useState, useMemo, useCallback, useRef, useReducer, createContext, useContext } from 'react'
import './App.css'

/**
 * 🔹 Context API
 * - Creates a global state that can be accessed by any component in the tree
 * - Eliminates prop drilling (passing props through multiple levels)
 * - Here: ThemeContext manages the app's theme state globally
 */
const ThemeContext = createContext('light')

function App() {
  let name = 'darshan'

  let users = [
    {
      name: 'Darshan Panchal',
      age: 24,
      id: 1
    },
    {
      name: 'Abhay Panchal',
      age: 24,
      id: 3
    },
    {
      name: 'Mitesh Panchal',
      age: 22,
      id: 2
    }
  ]

  // 🔹 useState Hook
  // - Manages local component state
  // - Triggers re-renders when state updates
  // - Here: manages theme and timer visibility
  const [theme, setTheme] = useState('Dark');
  const [showTimer, setShowTimer] = useState(true);

  return (
    // 🔹 Context Provider
    // - Wraps components that need access to context
    // - Passes the current theme value down the component tree
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <>
        {/* 🔹 Event Handlers with Functional Updates */}
        {/* - Using prev state ensures we get the most current value */}
        <button className="bg-amber-800 text-blue-500" onClick={() => setShowTimer((prev) => !prev)}>{showTimer ? 'hide' : 'show'} timer</button>
        <h1 className='text-2xl font-bold text-blue-600'>Hello EduFlow 🚀</h1>
        <Greetings name='Darshan' />
        <div className="counter-container">
          <Counter />
        </div>
        {/* 🔹 Conditional Rendering */}
        {/* - Only renders Timer when showTimer is true */}
        <ul>
          {users.map((user) => <li key={user.id}>{user.name}</li>)}
        </ul>
        {
          showTimer && (<div className="font-bold">
            <Timer />
          </div>)
        }

        <br />

        <TodoApp />

        <ExpensiveComponent />

        <Users />
        <Parent />
      </>
    </ThemeContext.Provider>
  )
}

/**
 * 🔹 Component Composition
 * - Counter demonstrates multiple React concepts in one component
 * - Shows state management, event handling, and child components
 */
function Counter() {
  // 🔹 Basic State Management
  const [count, setCount] = useState(0);

  // 🔹 Event Handler Function
  // - Uses functional update to ensure latest state
  const increaseByTwo = () => {
    setCount(prev => prev + 2)
  }
  
  return (
    <>
      <div className="counter-box">
        {count}
      </div>
      <div className="counter-actions">
        {/* 🔹 Inline Event Handlers */}
        {/* - Direct state updates using current count value */}
        <button className='bg-green-500 px-4 py-2 rounded hover:bg-green-600 transition' onClick={() => setCount(count + 1)}>+</button>
        <button onClick={() => setCount(count - 1)}>-</button>
        {/* 🔹 Reusable Event Handler */}
        <button className='bg-green-500 px-4 py-2 rounded hover:bg-green-600 transition' onClick={() => increaseByTwo()}>+</button>
      </div>
      {/* 🔹 Child Components */}
      {/* - Demonstrates component reusability and separation of concerns */}
      <Input />
      <InputFocus />
      <RenderCounter />
    </>
  )
}

/**
 * 🔹 Context Consumer
 * - useContext hook accesses the theme from ThemeContext
 * - Eliminates need for prop drilling through component hierarchy
 */
function Greetings({ name }) {
  const { theme, setTheme } = useContext(ThemeContext)

  return (
    <>
      <p>Hello, {name}</p>
      <h2>{theme}</h2>
    </>
  )
}

/**
 * 🔹 Variable Scope vs State
 * - Demonstrates difference between regular variables and React state
 * - Regular variables reset on every render, state persists
 */
function Input() {
  let number = 0; // ❌ Regular variable - resets on every render
  const [text, setText] = useState(''); // ✅ State - persists across renders
  
  // 🔹 Controlled Component
  // - Input value controlled by React state
  const handleTextChange = (value) => {
    setText(value);
  }
  
  // 🔹 Function that modifies regular variable
  // - Won't persist because 'number' is recreated on each render
  const increaseNum = () => {
    number = number + 1; // ❌ This won't work as expected
    console.log(number);
  }
  
  return (
    <>
      <p>You have wrote -- {text}</p>
      <p>Number {number}</p>
      <button onClick={() => increaseNum()}>Increase</button>
      {/* 🔹 Controlled Input */}
      {/* - Value synced with state, onChange updates state */}
      <input 
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' 
        type="text" 
        value={text} 
        onChange={(e) => handleTextChange(e.target.value)} 
      />
    </>
  )
}

/**
 * 🔹 useEffect Hook - Side Effects
 * - Handles side effects in functional components (API calls, subscriptions, timers)
 * - Runs after render, can be controlled with dependency array
 */
function Timer() {
  const [seconds, setSeconds] = useState(0);
  const { theme, setTheme } = useContext(ThemeContext)

  // 🔹 useEffect with Cleanup
  // - [] dependency array = runs once on mount
  // - Returns cleanup function that runs on unmount
  useEffect(() => {
    console.log('timer mounted')
    const id = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
    
    // 🔹 Cleanup Function
    // - Prevents memory leaks by clearing intervals on unmount
    return () => {
      console.log('run on destroy of this component')
      clearInterval(id);
    }
  }, [])

  // 🔹 useEffect for Side Effects on State Change
  // - Runs whenever 'seconds' changes
  useEffect(() => {
    // console.log('current time',seconds)
  }, [seconds])

  /** 
   * 🔹 useEffect Summary:
   * - Runs after rendering
   * - Dependencies array controls when:
   *   [] → run once (on mount)
   *   [value] → run when value changes
   *   none → run after every render
  */
  return (
    <>
      <p>{seconds}</p>
      <PreviousValue value={seconds} />
      <button onClick={() => setTheme('light')}>Set light theme</button>
      <h2>current theme is {theme}</h2>
    </>
  )
}

/**
 * 🔹 useRef Hook - DOM Manipulation
 * - Creates a mutable ref object that persists across renders
 * - Commonly used for accessing DOM elements directly
 * - Doesn't trigger re-renders when updated
 */
function InputFocus() {
  const inputRef = useRef(null);

  // 🔹 Ref Callback
  // - Automatically called with the DOM element when it mounts
  const focusInput = () => {
    inputRef.current.focus(); // ✅ Direct DOM access
  };

  return (
    <>
      {/* 🔹 Ref Assignment */}
      {/* - React assigns the input element to inputRef.current */}
      <input 
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' 
        type="text" 
        ref={inputRef} 
      />
      <button onClick={focusInput}>Focus Input</button>
    </>
  );
}

/**
 * 🔹 useRef Hook - Tracking Values
 * - Can store any mutable value that persists across renders
 * - Unlike state, updating refs doesn't trigger re-renders
 * - Perfect for tracking render counts, previous values, etc.
 */
function RenderCounter() {
  const renderCount = useRef(0);
  renderCount.current += 1; // ✅ Updates without re-render

  return <p>I’ve rendered {renderCount.current} times!</p>;
}

/**
 * 🔹 useRef for Previous State Values
 * - Tracks previous value of state between renders
 * - Useful for comparisons, animations, or debugging
 */
function PreviousValue({ value }) {
  const prevValue = useRef();
  const [someVar, setSomeVar] = useState(0);
  
  // 🔹 useEffect to Update Ref
  // - Updates ref.current with current value on every render
  useEffect(() => {
    prevValue.current = value;
  }, [value]);

  return (
    <>
      <button onClick={() => setSomeVar((prev) => prev + 10)}>break flow</button>
      <p>Current: {value}, Previous: {prevValue.current}</p>
      <p>{someVar}</p>
    </>
  )
}

/**
 * 🔹 useReducer Hook
 * - Alternative to useState for complex state logic
 * - Similar to Redux - single state object, pure reducer function
 * - Great for: multiple sub-values, complex state transitions, predictable updates
 */
function reducer(state, action) {
  switch (action.type) {
    case "add":
      return [...state, { id: Date.now(), text: action.text, done: false }];
    case "toggle":
      return state.map(todo =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    case "remove":
      return state.filter(todo => todo.id !== action.id);
    default:
      return state;
  }
}

/**
 * 🔹 Todo App with useReducer
 * - Demonstrates complex state management with reducer pattern
 * - Dispatch actions instead of calling multiple setState functions
 * - More predictable and easier to test
 */
function TodoApp() {
  // 🔹 useReducer Usage
  // - Takes reducer function and initial state
  // - Returns [state, dispatch] similar to useState
  const [todos, dispatch] = useReducer(reducer, []);
  const [text, setText] = useState("");

  // 🔹 Action Dispatching
  // - Dispatch sends actions to reducer with type and payload
  const handleAdd = () => {
    if (text.trim() === "") return;
    dispatch({ type: "add", text }); // ✅ Dispatch action
    setText("");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Todo App</h1>

      {/* 🔹 Controlled Form */}
      <div className="flex gap-2 mb-4">
        <input
          className="border px-2 py-1 flex-1 rounded"
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Enter a todo..."
        />
        <button
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          onClick={handleAdd}
        >
          Add
        </button>
      </div>

      {/* 🔹 List Rendering with Keys */}
      {/* - 'key' prop helps React identify which items changed */}
      <ul className="space-y-2">
        {todos.map(todo => (
          <li
            key={todo.id} // ✅ Unique key for list items
            className="flex justify-between items-center border px-3 py-2 rounded"
          >
            {/* 🔹 Inline Event Handlers for State Updates */}
            <span
              onClick={() => dispatch({ type: "toggle", id: todo.id })}
              className={`cursor-pointer ${todo.done ? "line-through text-gray-500" : ""
                }`}
            >
              {todo.text}
            </span>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => dispatch({ type: "remove", id: todo.id })}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * 🔹 useMemo Hook
 * - Memoizes (caches) expensive calculations
 * - Only recalculates when dependencies change
 * - Prevents unnecessary computations on every render
 */
function ExpensiveComponent() {
  const [count, setCount] = useState(0);
  const [dark, setDark] = useState(false);

  /*
    🔹 useMemo Usage
    - Used when we want to memoize (cache) a VALUE.
    - Helps avoid recalculating heavy/expensive functions
      unless the dependency actually changes.
    - Here: factorial calculation is heavy, so we only
      recompute when "count" changes, not on every render.
  */
  const factorial = useMemo(() => {
    console.log("Calculating factorial...");
    let result = 1;
    for (let i = 1; i <= count; i++) {
      result *= i;
    }
    return result;
  }, [count]); // ✅ recomputes only when "count" changes

  // 🔹 Inline Object Creation
  // - Created on every render (could be memoized if needed)
  const themeStyles = {
    backgroundColor: dark ? "black" : "white",
    color: dark ? "white" : "black",
    padding: "10px",
    marginTop: "10px",
  };

  return (
    <div>
      <h3>Factorial Calculator</h3>
      <input
        type="number"
        value={count}
        onChange={(e) => setCount(Number(e.target.value))}
      />
      <button onClick={() => setDark((prev) => !prev)}>Toggle Theme</button>

      <div style={themeStyles}>Factorial: {factorial}</div>
    </div>
  );
}

/**
 * 🔹 React.memo - Component Memoization
 * - Prevents re-renders if props haven't changed
 * - Works with useCallback to optimize child-parent communication
 * - Only shallow comparison of props by default
 */
const Child = React.memo(({ onClick }) => {
  console.log("Child rendered");
  return <button onClick={onClick}>Click Me</button>;
});

/**
 * 🔹 useCallback Hook
 * - Memoizes (caches) functions to prevent recreation on every render
 * - Useful when passing functions to optimized child components
 * - Only recreates function when dependencies change
 */
function Parent() {
  const [count, setCount] = useState(0);

  /*
    🔹 useCallback Usage
    - Used when we want to memoize (cache) a FUNCTION.
    - Prevents re-creation of a new function on every render.
    - Useful when passing functions to memoized child components.
    - Here: "handleClick" will only be recreated if "count" changes.
      So the Child component won't re-render unnecessarily.
  */
  const handleClick = useCallback(() => {
    console.log("Clicked! Count:", count);
  }, [count]); // ✅ function reference changes only if "count" changes

  return (
    <div>
      <h3>Parent Count: {count}</h3>
      <button onClick={() => setCount((c) => c + 1)}>Increase</button>
      {/* 🔹 Optimized Child Component */}
      {/* - Won't re-render unless onClick prop changes */}
      <Child onClick={handleClick} />
    </div>
  );
}

/**
 * 🔹 Custom Hooks
 * - Reusable logic extracted into functions
 * - Must start with "use" prefix
 * - Can use other hooks internally
 * - Promotes code reusability and separation of concerns
 */
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔹 useEffect for API Calls
  // - Fetches data when URL changes
  // - Handles loading and error states
  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [url]); // ✅ Refetches only when URL changes

  // 🔹 Hook Return Value
  // - Returns object with all necessary state values
  return { data, loading, error };
}

/**
 * 🔹 Inline Styles and State-Driven UI
 * - Uses useState for hover effects
 * - Demonstrates conditional styling based on component state
 */
function UserCard({ user }) {
  // 🔹 Inline Style Objects
  // - JavaScript objects for dynamic styling
  const cardStyle = {
    width: "250px",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
    overflow: "hidden",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    transition: "transform 0.3s, box-shadow 0.3s",
    cursor: "pointer",
    backgroundColor: "#fff",
    margin: "20px",
  };

  const cardHoverStyle = {
    transform: "translateY(-5px)",
    boxShadow: "0 12px 25px rgba(0,0,0,0.25)",
  };

  const headerStyle = {
    backgroundColor: "#4b7bec",
    height: "80px",
  };

  const avatarStyle = {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    border: "3px solid #fff",
    position: "relative",
    top: "-40px",
    margin: "0 auto",
    display: "block",
    objectFit: "cover",
  };

  const infoStyle = {
    textAlign: "center",
    padding: "0 20px 20px 20px",
  };

  const nameStyle = {
    fontSize: "1.2rem",
    fontWeight: "600",
    margin: "10px 0 5px 0",
  };

  const roleStyle = {
    fontSize: "0.9rem",
    color: "#777",
    marginBottom: "10px",
  };

  // 🔹 Local State for UI Interactions
  // - Manages hover state for smooth animations
  const [hover, setHover] = React.useState(false);

  // 🔹 Event Handlers for Interactivity
  return (
    <div
      style={{ ...cardStyle, ...(hover ? cardHoverStyle : {}) }} // 🔹 Conditional Styling
      onMouseEnter={() => setHover(true)} // 🔹 Mouse Events
      onMouseLeave={() => setHover(false)}
    >
      <div style={headerStyle}></div>
      <img src={user.image} alt="avatar" style={avatarStyle} />
      <div style={infoStyle}>
        <div style={nameStyle}>
          {user.firstName} {user.lastName}
        </div>
        <div style={roleStyle}>{user.maidenName}</div>
      </div>
    </div>
  );
}

/**
 * 🔹 Custom Hook Integration
 * - Uses useFetch custom hook for data fetching
 * - Demonstrates loading and error states
 * - Shows list rendering with mapped components
 */
function Users() {
  // 🔹 Custom Hook Usage
  // - Clean separation of data fetching logic
  const { data, loading, error } = useFetch("https://dummyjson.com/users");

  // 🔹 Conditional Rendering for Loading/Error States
  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error fetching users!</p>;
  
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        backgroundColor: "#f2f2f2",
        padding: "20px",
      }}
    >
      {/* 🔹 Mapped Rendering */}
      {/* - Transforms array into JSX elements */}
      {data.users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}

export default App