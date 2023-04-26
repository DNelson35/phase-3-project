import React from 'react'
import { Routes, Route } from 'react-router-dom'
import {useState, useEffect} from 'react'
import Nav from './componets/Nav'
import Drinks from './pages/Drinks'
import Companies from './pages/company'
import Home from './pages/Home'


function App() {
  const [companies, setCompanies] = useState([])
  const [drinks, setDrinks] = useState([])

  useEffect(() => {
    fetch("http://localhost:9292/companies")
    .then(resp => resp.json())
    .then(companies => setCompanies(companies))
  },[])

  return (
    <div>
      <Nav /> 
      <Routes>
        <Route path='/company/:id' element={<Companies companies={companies} setCompanies={setCompanies} drinks={drinks} setDrinks={setDrinks}/>}/>
        <Route path='/drink/:id' element={<Drinks/>}/>
        <Route path='/' element={<Home companies={companies} setCompanies={setCompanies}/>}/>
      </Routes>
    </div>
  )
}

export default App