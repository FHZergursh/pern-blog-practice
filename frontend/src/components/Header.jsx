import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='bg-slate-800 shadow-lg flex items-center justify-around py-3 px-32 fixed top-0 min-w-screen text-blue-500'>
        <div className='px-10'>
          <Link to="/">Homepage</Link>
        </div>
        <div className='px-10'>
          <Link to="/dashboard">Dashboard</Link>
        </div>

    </div>
  )
}

export default Header