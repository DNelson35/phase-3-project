import React from 'react'
import { useLocation } from 'react-router-dom'

function Drinks() {
  const location = useLocation()
  const drinks = location.state

  const drinksList = drinks.map(drink => (
    <div key={drink.id}>
      <h1>{drink.name}</h1>
      <img src={drink.image_url} alt='drink'/>
      <p>{drink.description}</p>
    </div>
   ))
  return (
    <div>
      {drinksList}
    </div>
  )
}

export default Drinks