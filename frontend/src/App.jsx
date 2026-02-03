import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import Header from './components/Header.jsx'

const App = () => {
  return (
    <div className='bg-slate-700 min-h-screen'>
      <Header />
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
    
    </div>
  )
}

export default App