import React from 'react'

function DrinkCard({drink}) {
  return (
    <div>
      <h1>{drink.name}</h1>
      <img src={drink.image_url} alt='drink'/>
      <p>{drink.description}</p>
    </div>
  )
}

export default DrinkCard