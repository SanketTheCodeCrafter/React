import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  // var counter=0;

  let [counter, setCounter] = useState(0);

  const addValue = () => {
    console.log("Value added", Math.random())
    if (counter < 20)
      // counter = counter + 1;
      setCounter(counter+1)
  }

  const decreaseValue = () => {
    if (counter > 0)
      setCounter(counter - 1);
  }

  return (
    <>
      <h1>Om Namo Bhagwate Vasudevay!</h1>

      <h2>Counter value: {counter}</h2>

      <button onClick={addValue}>
        Add Value  {counter}</button>
      <br />
      <button onClick={decreaseValue}>
        Decrease Value  {counter}</button>

      <p>Value: {counter}</p>
    </>
  )
}

export default App
