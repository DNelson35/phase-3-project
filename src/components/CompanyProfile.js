import React from 'react'

function CompanyProfile({ header, company, onDeleteDrink, id }) {
    
    const drinksList = company.drinks.map(drink => (
        <div key={drink.id}>
          <li className='text-lg font-semibold'>
            {drink.name} 
            <button onClick={() => onDeleteDrink(id, drink)}>🗑️</button>
          </li>
        </div>
    ))

  return (
    <div className='w-1/2 ml-4 mr-4'>
        {header()}
        <img src={company.logo_url} alt="logo" className='block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0 object-cover w-[100px] mb-5'/>
        <h2 className='text-xl font-bold italic underline'>Drinks</h2>
        <ul>
        {drinksList}
        </ul>
    </div>
  )
}

export default CompanyProfile