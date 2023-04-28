import React from 'react'
import { useState } from 'react'

function EditProfileForm({id, onCreateDrinks}) {
    const [formInput, setFormInput] = useState({
        name: '',
        image_url: '',
        description: ''
    })
    const {name, image_url, description} = formInput

    const onInputChange = (e) => {
        setFormInput({...formInput, [e.target.name]: e.target.value})
    }

  
  return (
    <div className='w-12'>
        <form onSubmit={(e) => onCreateDrinks(e, formInput, id, setFormInput)}>
        <label>Name</label>
        <input type='text' name='name' value={name} onChange={onInputChange}></input>
        <label>Image URL</label>
        <input type='url' name='image_url' value={image_url} onChange={onInputChange}></input>
        <label>Description</label>
        <input type="text" name='description' value={description} onChange={onInputChange}></input>
        <button type="submit">Create Drinks</button>
        </form>
    </div>
  )
}

export default EditProfileForm