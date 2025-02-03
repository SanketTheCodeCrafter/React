import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [color, setColor] = useState("olive")

  return (
    <>
      <div className="main-container" style={{backgroundColor:color}}>
        <div className="color-container">
          <button onClick={()=>setColor("red")} style={{backgroundColor:"red"}}>
            Red</button>
          <button onClick={()=>setColor("blue")} style={{backgroundColor:"blue"}}>
            Blue</button>
          <button onClick={()=>setColor("green")} style={{backgroundColor:"green"}}>
            Green</button>
          <button onClick={()=>setColor("orange")} style={{backgroundColor:"orange"}}>
            Orange</button>
          <button onClick={()=>setColor("purple")} style={{backgroundColor:"purple"}}>
            Purple</button>
          <button onClick={()=>setColor("yellow")} style={{backgroundColor:"yellow"}}>
            Yellow</button>
        </div>
      </div>
    </>
  )
}

export default App
