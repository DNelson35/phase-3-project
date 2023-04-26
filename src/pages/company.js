import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

function Company({ companies, setCompanies, drinks, setDrinks }) {
  const [formInput, setFormInput] = useState({
    name: '',
    image_url: '',
    description: ''
  })

  const [editOn, setEditOn] = useState(false)
  const [newHeader, setNewHeader] = useState('')

  const { id } = useParams()
  const company = companies.find(company => company.id === parseInt(id))
  const {name, image_url, description} = formInput
  const navigate = useNavigate()

  useEffect(() => {
    if(company){
      setDrinks(company.drinks)
    }
  }, [company, setDrinks])

  const drinksList = drinks.map(drink => (
    <div key={drink.id}>
    <Link to={`/drink/${drink.id}`} className='text-lg font-semibold'>{drink.name}</Link>
    <button onClick={() => onDeleteDrink(drink)}>🗑️</button>
    </div>
  ))
    
  const onInputChange = (e) => {
    setFormInput({...formInput, [e.target.name]: e.target.value})
  }

  const onDeleteDrink = (drink) => {
    fetch(`http://localhost:9292/drinks/${drink.id}`, {
      method: 'DELETE',
    })
    .then(setDrinks(drinks.filter(deletedDrink => deletedDrink.id !== drink.id)))
  }
  const onEdit = () => {
    setEditOn(true)
  }

  const onEditSubmit = (e) => {
    e.preventDefault()
    fetch(`http://localhost:9292//companies/${id}`, {
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
    .then(setEditOn(false))
    
  }

  const onDeleteCompany = () => {
    fetch(`http://localhost:9292//companies/${id}`, {
      method: 'DELETE',
    })
    .then(setCompanies(companies.filter(deletedCompany => company.id !== deletedCompany.id)))
    navigate("/")
  }

  const header = () => {
    if (company){
      return editOn? (
        <form onSubmit={onEditSubmit}>
          <input type='text' value={newHeader} onChange={(e) => setNewHeader(e.target.value)} placeholder={company.name} autoFocus className='text-2xl text-black font-bold mb-5'/>
          <button type="submit">submit</button>
        </form> 
      ) 
      : 
      (
        <>
          <h1 className='text-2xl text-black font-bold mb-5'>{company.name}</h1>
          <button onClick={onEdit}>✎</button>
        </>
      )
    } else{
      return null
    }
  }

  const onCreateDrinks = (e) => { 
    e.preventDefault()
  
    fetch(`http://localhost:9292/companies/${id}/drinks`, {
      method: 'POST',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(formInput)
    })
    .then(resp => resp.json())
    .then(drinkData => setDrinks([...drinks, drinkData]))

    setFormInput({
      name: '',
      image_url: '',
      description: ''
    })
  }
  
  return company? (
    <div>
      <div className='ml-10'>
        {header()}
        <img src={company.logo_url} alt="logo" className='block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0 object-cover w-[100px] mb-5'/>
        <h2 className='text-xl font-bold italic underline'>Drinks</h2>
        <ul>
          {drinksList}
        </ul>
      </div>
      <form onSubmit={onCreateDrinks}>
        <label>Name</label>
        <input type='text' name='name' value={name} onChange={onInputChange}></input>
        <label>Image URL</label>
        <input type='url' name='image_url' value={image_url} onChange={onInputChange}></input>
        <label>Description</label>
        <input type="text" name='description' value={description} onChange={onInputChange}></input>
        <button type="submit">Create Drinks</button>
      </form>
      <button onClick={onDeleteCompany}>Delete Company 🗑️</button>
    </div>
    
  ) : null
}

export default Company
