import { useState } from 'react'
import './App.css'

function App() {
  let name  = 'darshan'
  return (
    <>
      <h1>Hello EduFlow 🚀</h1>
      <Greetings name='Darshan'/>
      <div className="counter-container">
        <Counter/>
      </div>
    </>
  )
}

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <>
      <div className="counter-box">
        {count}
      </div>
      <div className="counter-actions">
        <button onClick={() => setCount(count+1)}>+</button>
        <button onClick={() => setCount(count-1)}>-</button>
      </div>
    </>
  )
}

function Greetings({name}) {
  return (
    <>
      <p>Hello, {name}</p>
    </>
  )
}

export default App
