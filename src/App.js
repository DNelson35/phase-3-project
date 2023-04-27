import React from 'react'
import { Routes, Route } from 'react-router-dom'
import {useState, useEffect} from 'react'
import Nav from './componets/Nav'
import Home from './pages/Home'
import Drinks from './pages/Drinks'
import Company from './pages/company'
import Edit from './pages/Edit'


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
        <Route path='/company/:id' element={<Company companies={companies} setCompanies={setCompanies}/>}/>
        <Route path='/company/:id/drinks' element={<Drinks/>}/>
        <Route path='/edit' element={<Edit companies={companies} setCompanies={setCompanies}/>}/>
        <Route path='/' element={<Home companies={companies}/>}/>
      </Routes>
    </div>
  )
}

export default App