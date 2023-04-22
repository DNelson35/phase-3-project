import React from 'react'
import { useParams } from 'react-router-dom'

function Company({ companies }) {
  const { id } = useParams()
  const company = companies.find(company => company.id === parseInt(id))

  const drinksList = company ? company.drinks.map(drink => <li key={drink.id}>{drink.name}</li>) : null

  return company ? (
    <div>
      <h1>{company.name}</h1>
      <img src={company.logo_url} alt="logo" />
      <h2>Drinks</h2>
      <ul>
        {drinksList}
      </ul>
    </div>
  ) : null
}

export default Company
