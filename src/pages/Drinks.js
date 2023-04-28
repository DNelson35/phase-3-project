import React from 'react'
import { useParams } from 'react-router-dom'
import DrinkCard from '../components/DrinkCard'

function Drinks({companies}) {
  const { id } = useParams()
  const company = companies.find(company => company.id === parseInt(id))

  const drinksList = (company)? ( company.drinks.map(drink =><DrinkCard key={drink.id} drink={drink}/>)): null

  return (
    <div>
      {drinksList}
    </div>
  )
}

export default Drinks