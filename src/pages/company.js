import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function Company({ companies }) {
  const [formInput, setFormInput] = useState({
    name: '',
    image_url: '',
    description: ''
  })

  const [drinks, setDrinks] = useState([])

  const { id } = useParams()
  const company = companies.find(company => company.id === parseInt(id))

  useEffect(() => {
    if(company){
      setDrinks(company.drinks)
    }
  }, [company])

  const drinksList = drinks.map(drink => <li key={drink.id} className='text-lg font-semibold'>{drink.name}</li>)


  const onInputChange = (e) => {
    setFormInput({...formInput, [e.target.name]: e.target.value})
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

  return company ? (
    <div>
      <div className='ml-10'>
        <h1 className='text-2xl text-black font-bold mb-5'>{company.name}</h1>
        <img src={company.logo_url} alt="logo" className='block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0 object-cover w-[100px] mb-5'/>
        <h2 className='text-xl font-bold italic underline'>Drinks</h2>
        <ul>
          {drinksList}
        </ul>
      </div>
      <form onSubmit={onCreateDrinks}>
        <label>Name</label>
        <input type='text' name='name' value={formInput.name} onChange={onInputChange}></input>
        <label>Image URL</label>
        <input type='url' name='image_url' value={formInput.image_url} onChange={onInputChange}></input>
        <label>Description</label>
        <input type="text" name='description' value={formInput.description} onChange={onInputChange}></input>
        <button type="submit">Create Drinks</button>
      </form>
    </div>
    
  ) : null
}

export default Company
