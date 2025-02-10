import { useState } from 'react'
import React from 'react'
import Login from './components/Login'
import Profile from './components/Profile'
import './App.css'
import UserContextProvider from './context/UserContextProvider'
import UserContext from './context/UserContext'

function App() {
  const [count, setCount] = useState(0)

  return (
    <UserContextProvider>
      <h1>Welcome to this page</h1>
      <Login /> 
      <Profile />
    </UserContextProvider>
  )
}

export default App
