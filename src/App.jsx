import { useState } from 'react'
import './App.css'

function App() {
  let name  = 'darshan'
  return (
    <>
      <h1 className='text-2xl font-bold text-blue-600'>Hello EduFlow 🚀</h1>
      <Greetings name='Darshan'/>
      <div className="counter-container">
        <Counter/>
      </div>
    </>
  )
}

function Counter() {
  const [count, setCount] = useState(0);

  const increaseByTwo = () => {
    setCount(prev => prev + 2)
  }
  return (
    <>
      <div className="counter-box">
        {count}
      </div>
      <div className="counter-actions">
        <button className='bg-green-500 px-4 py-2 rounded hover:bg-green-600 transition' onClick={() => setCount(count+1)}>+</button>
        <button onClick={() => setCount(count-1)}>-</button>
        <button className='bg-green-500 px-4 py-2 rounded hover:bg-green-600 transition' onClick={() => increaseByTwo()}>+</button>
      </div>
      <Input />
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

function Input() {
  const [text,setText] = useState('');
  const handleTextChange = (value) => {
    setText(value);
  }
  return (
    <>
      <p>You have wrote -- {text}</p>
      <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' type="text" value={text} onChange={(e) => handleTextChange(e.target.value)} />
    </>
  )
}

export default App
