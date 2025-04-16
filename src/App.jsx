import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import MainLayout from './layouts/MainLayout'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/auth" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} /> 
      </Routes>
    </BrowserRouter>

    // <button className="btn btn-success">Success</button>
  
  )
}

export default App
