import React from 'react'
import { Routes, Route } from 'react-router-dom'
import {useState, useEffect} from 'react'
import Nav from './componets/Nav'
import Drinks from './pages/Drinks'
import Companies from './pages/company'
import Home from './pages/Home'


function App() {
  const [companies, setCompanies] = useState([])

  useEffect(() => {
    fetch("http://localhost:9292/companies")
    .then(resp => resp.json())
    .then(companies => setCompanies(companies))
  },[])

  return (
    <div>
      <Nav /> 
      <Routes>
        <Route path='/company/:id' element={<Companies companies={companies}/>}/>
        <Route path='/drinks' element={<Drinks/>}/>
        <Route path='/home' element={<Home companies={companies}/>}/>
      </Routes>
    </div>
  )
}

export default App