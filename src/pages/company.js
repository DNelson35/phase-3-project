import React, { useState } from 'react'
import { useParams} from 'react-router-dom'
import CompanyProfile from '../components/CompanyProfile'
import EditProfileForm from '../components/EditProfileForm'

function Company({ companies, onDeleteCompany, onEditSubmit, onCreateDrinks, onDeleteDrink}) {
  
  const [editOn, setEditOn] = useState(false)
  const [newHeader, setNewHeader] = useState('')
  
  const { id } = useParams()
  const company = companies.find(company => company.id === parseInt(id))
  
  // TODO: try moving all request that need companies to the app and passing them down as props
  // TODO: after moving request company  could be passed using use location
  const onEdit = () => {
    setEditOn(true)
  }

  const header = () => {
    if (company){
      return editOn? (
        <form onSubmit={(e) => onEditSubmit(e, newHeader, setEditOn, id) }>
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

  return company? (
    <div>
      <div className='flex'>
        <CompanyProfile header={header} company={company} onDeleteDrink={onDeleteDrink} id={id}/>
        <EditProfileForm id={id} onCreateDrinks={onCreateDrinks} />
      </div>
        <button onClick={() => onDeleteCompany(id)}>Delete Company 🗑️</button>
    </div>
    
  ) : null
}

export default Company
