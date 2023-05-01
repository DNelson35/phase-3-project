import React from 'react'
import { useParams, useNavigate} from 'react-router-dom'
import useCompaniesContext from '../hooks/useCompaniesContext'
import CompanyProfile from '../components/CompanyProfile'
import EditProfileForm from '../components/EditProfileForm'
import DrinkCard from '../components/DrinkCard'

function Company({ onCreateDrinks}) {
  
  const {companies, setCompanies} = useCompaniesContext()
  
  const { id } = useParams()
  const company = companies.find(company => company.id === parseInt(id))
  const navigate = useNavigate()

  const onDeleteCompany = () => {
    fetch(`http://localhost:9292//companies/${id}`, {
      method: 'DELETE',
    })
    .then(setCompanies(companies.filter(deletedCompany => parseInt(id) !== deletedCompany.id)))
    navigate("/")
  }

  const drinksList = company? company.drinks.map(drink => (<DrinkCard key={drink.id} drink={drink}/>)): null
  
  return company? (
    <div>
      <div className='flex'>
        <CompanyProfile company={company} id={id}/>
        <EditProfileForm id={id} onCreateDrinks={onCreateDrinks} />
      </div>
      <button onClick={() => onDeleteCompany(id)}>Delete Company 🗑️</button>
      <div className='grid grid-cols-3 mt-10  place-items-center h-[282px]'>
        {drinksList}
      </div>
    </div>
    
  ) : null
}

export default Company
