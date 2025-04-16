
import Navbar from '../components/Navbar'
import BottomNav from '../components/BottomNav'
import HomePage from '../pages/HomePage'

import React from 'react'

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-base-100">
      <Navbar/>
      <HomePage/>
      <BottomNav/>
    </div>
  )
}

export default MainLayout