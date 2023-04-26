import React, { useState } from 'react'
import {Link} from 'react-router-dom'

function Home({ companies, setCompanies }) {
  const [formInput, setFormInput] = useState({
    name: '',
    logo_url: ''
  })

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
  }

 const companyLinks = companies.map(company =>(
  <div key={company.id}>
    <Link to={`/company/${company.id}`}>{company.name}</Link>
    <img src={company.logo_url} alt='logo' className='block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0 object-cover w-[100px] mb-5'/>
  </div>
 ))

  return (
    <div className='relative h-screen mr-10 ml-10'>
      <div className='flex flex-wrap justify-between text-center'>
        {companyLinks}
      </div>
      <div className='flex relative justify-center mt-20'>
        <div className='flex-block bg-red-500 h-auto w-[20%] align-middle text-center'>
          <h3 className='flex justify-center'>Add Company</h3>
          <form onSubmit={onSubmit}>
            <label>Company Name</label>
            <input type="text" name='name' value={name} onChange={onChange}></input>
            <label>Image Url</label>
            <input type="text" name='logo_url' value={logo_url} onChange={onChange}></input>
            <br/>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Home