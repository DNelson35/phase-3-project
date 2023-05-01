import React from 'react'
import useCompaniesContext from '../hooks/useCompaniesContext'

function DrinkCard({drink}) {

    const {companies, setCompanies} = useCompaniesContext()

    const onDeleteDrink = (drink) => {
        fetch(`http://localhost:9292/companies/${drink.company_id}/drinks/${drink.id}`, {
          method: 'DELETE',
        })
        .then(setCompanies(companies.map(company => (
          (company.id === drink.company_id)?
          {...company, drinks: company.drinks.filter(currDrink => drink.id !== currDrink.id)}
          :
          company
        ))))
    }
  return (
    <div className='flex  justify-center w-auto h-full bg-red-500 border border-black'>
        <div className='relative text-center'>
            <div className='flex justify-center'>
                <img src={drink.image_url} alt="drink" className='w-full h-52 '/>
            </div>
            <h2>{drink.name}</h2>
            <p>{drink.description}</p>
            <div className='absolute w-full bg-orange-300 justify-center bottom-0 '>
                <button onClick={() => onDeleteDrink(drink)}>🗑️</button>
            </div>
        </div>
    
    </div>
  )
}

export default DrinkCard