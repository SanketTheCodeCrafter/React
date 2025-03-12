import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import { Header, Footer } from './components'
import { Outlet } from 'react-router-dom'


function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        }
        else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [])

  return !loading ? (
    <div className='min-h-screen flex flex-col bg-gray-300'>
      <Header />
      {/* <div className='w-full flex flex-col flex-grow'> */}
      {/* <Outlet /> */}
      <main className='flex-1 py-4 sm:py-6 lg:py-8'> {/* Added main wrapper */}
        <Outlet />
      </main>
      <Footer />
    </div>
    // </div >
  ): null
}

export default App
