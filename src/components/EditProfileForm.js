import React from 'react'
import { useState } from 'react'
import useCompaniesContext from '../hooks/useCompaniesContext'

function EditProfileForm({id}) {
  const [formInput, setFormInput] = useState({
      name: '',
      image_url: '',
      description: ''
  })
  const {name, image_url, description} = formInput
  const {companies, setCompanies} = useCompaniesContext()

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

  
  return (
    <div className='flex w-full justify-center'>
        <div className=' relative flex border border-1 border-black h-full w-auto justify-center bg-red-500'>
          <form onSubmit={onCreateDrinks} className=' relative text-center pr-5 pl-5 pt-3'>
            <label className='font-bold text-lg'>Create Drinks</label>
            <br/>
            <label>Name</label>
            <br/>
            <input type='text' name='name' value={name} onChange={onInputChange}/>
            <br/>
            <label>Image URL</label>
            <br/>
            <input type='url' name='image_url' value={image_url} onChange={onInputChange}/>
            <br/>
            <label>Description</label>
            <br/>
            <input type="text" name='description' value={description} onChange={onInputChange}/>
            <br/>
            <button type="submit" className='font-bold text-lg'>Submit</button>
          </form>
        </div>
    </div>
  )
}

export default EditProfileForm