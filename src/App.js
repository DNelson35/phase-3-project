import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Nav from './components/Nav'
import Company from './pages/Company'
import Edit from './pages/Edit'

function App() {
  return (
    <div>
      <Nav /> 
      <Routes>
        <Route path='*' element={<Navigate to='/companies' replace/>}/>
        <Route path='/companies' default element={<Edit/>}/>
        <Route path='/company/:id' element={<Company/>}/>
      </Routes>
    </div>
  )
}

export default App