import React from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import {useState, useEffect} from 'react'
import Nav from './components/Nav'
import Home from './pages/Home'
import Drinks from './pages/Drinks'
import Company from './pages/Company'
import Edit from './pages/Edit'


function App() {
  const [companies, setCompanies] = useState([])
  const navigate = useNavigate()
  
  
  // TODO: ask if having drinks here is a violation of the project rules.
  useEffect(() => {
    fetch("http://localhost:9292/companies")
    .then(resp => resp.json())
    .then(companies => setCompanies(companies))
  },[])

  const onDeleteCompany = (id) => {
    fetch(`http://localhost:9292//companies/${id}`, {
      method: 'DELETE',
    })
    .then(setCompanies(companies.filter(deletedCompany => parseInt(id) !== deletedCompany.id)))
    navigate("/")
  }

  const onEditSubmit = (e, newHeader, func, id) => {
    e.preventDefault()
    fetch(`http://localhost:9292/companies/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: newHeader
      })
    })
    .then(resp => resp.json())
    .then(editedCompany => setCompanies(companies.map(company => {
      if(company.id === editedCompany.id) {
        return editedCompany
      } else {
        return company
      }
    })))
    .then(func(false))
    
  }

  const onCreateDrinks = (e, formInput, id, setFormInput) => { 
    e.preventDefault()
  
    fetch(`http://localhost:9292/companies/${id}/drinks`, {
      method: 'POST',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(formInput)
    })
    .then(resp => resp.json())
    .then(newDrink => setCompanies(companies.map(company => (
      (company.id === parseInt(id)) ? 
      {...company, drinks: [...company.drinks, newDrink]}
      :
      company
    ))))

    setFormInput({
      name: '',
      image_url: '',
      description: ''
    })
  }

  const onDeleteDrink = (id, drink) => {
    fetch(`http://localhost:9292/companies/${id}/drinks/${drink.id}`, {
      method: 'DELETE',
    })
    .then(setCompanies(companies.map(company => (
      (company.id === parseInt(id))?
      {...company, drinks: company.drinks.filter(currDrink => drink.id !== currDrink.id)}
      :
      company
    ))))
  }

  return (
    <div>
      <Nav /> 
      <Routes>
        <Route path='/company/:id' element={<Company companies={companies} onDeleteCompany={onDeleteCompany} onEditSubmit={onEditSubmit} onCreateDrinks={onCreateDrinks} onDeleteDrink={onDeleteDrink} />}/>
        <Route path='/company/:id/drinks' element={<Drinks companies={companies}/>}/>
        <Route path='/edit' element={<Edit companies={companies} setCompanies={setCompanies}/>}/>
        <Route path='/' element={<Home companies={companies}/>}/>
      </Routes>
    </div>
  )
}

export default App