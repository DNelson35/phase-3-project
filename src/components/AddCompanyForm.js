import React from 'react'
import { useState } from 'react'
import useCompaniesContext from '../hooks/useCompaniesContext'

function AddCompanyForm() {
    const [formInput, setFormInput] = useState({
        name: '',
        logo_url: ''
    })
    const {companies, setCompanies} = useCompaniesContext()

    const {name, logo_url} = formInput

    const onChange = (e) => {
      setFormInput({...formInput, [e.target.name]: e.target.value})
    }
  
    const onSubmit = (e) => {
      e.preventDefault()
      fetch('http://localhost:9292/companies', {
        method: 'POST',
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formInput)
      })
      .then(resp => resp.json())
      .then(newCompany => setCompanies([...companies, newCompany]))
      .then(setFormInput({
        name: '',
        logo_url: ''
      }))
    }
  return (
    <div className='relative flex-block w-auto h-auto bg-orange-300 m-10 border-black border'>
        <h3 className='flex justify-center p-2 font-bold text-xl'>Add Company</h3>
        <form onSubmit={onSubmit} className='relative flex-block  pl-10 pr-10 text-center w-auto h-auto '>
            <label>Company Name: </label>
            <br/>
            <input type="text" name='name' value={name} onChange={onChange}></input>
            <br/>
            <label>Image Url: </label>
            <br/>
            <input type="text" name='logo_url' value={logo_url} onChange={onChange}></input>
            <br/>
            <button type="submit" className='font-bold pt-2'>Submit</button>
        </form>
    </div>
  )
}

export default AddCompanyForm