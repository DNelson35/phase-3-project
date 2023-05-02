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
            <h1 className='flex text-2xl text-black font-bold mb-3 whitespace-nowrap justify-center'>{company.name}<button onClick={onEdit} className='pl-2'>✎</button></h1>
          </>
        )
    } else{
      return null
    }
  }

  return (
    <div className='flex-block justify-center ml-4 mr-4 w-auto h-auto'>
      <div className=' rounded-[100%] min-w-[200px]'>
          <img src={company.logo_url} alt="logo" className=' rounded-[100%] max-h-[200px] min-h-[200px] max-w-[200px] min-w-[200px]'/>
      </div>
      {header()}
    </div>
  )
}

export default CompanyProfile