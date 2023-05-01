import React from 'react'
import { useState } from 'react'
import useCompaniesContext from '../hooks/useCompaniesContext'

function CompanyProfile({ company, id }) {
    
  const [editOn, setEditOn] = useState(false)
  const [newHeader, setNewHeader] = useState('')
  const {companies, setCompanies} = useCompaniesContext()


  const onEditSubmit = (e) => {
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
    .then(setEditOn(false))
    
  }


 

  const onEdit = () => {
    setEditOn(true)
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
            <h1 className='text-2xl text-black font-bold mb-3 whitespace-nowrap'>{company.name} <button onClick={onEdit}>✎</button></h1>
          </>
        )
    } else{
      return null
    }
  }

  return (
    <div className='flex w-auto ml-4 mr-4'>

      <div className='flex-block justify-center w-auto text-center'>
          <img src={company.logo_url} alt="logo" className='flex relative mx-auto h-auto rounded-full object-cover w-[200px]'/>
          {header()}
      </div>
    </div>
  )
}

export default CompanyProfile