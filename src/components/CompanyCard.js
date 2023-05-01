import React from 'react'
import { Link } from 'react-router-dom'

function CompanyCard({company}) {
  return (
    <div className='border-solid border-2 border-black p-5 pt-2 pb-2 bg-orange-200'>
      <h2 className='pb-2 font-bold'>{company.name} <Link to={`/company/${company.id}`} state={company} className='text-xl font-extrabold '>✎</Link></h2>
      <img src={company.logo_url} alt='logo' className='block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0 object-cover w-[100px] mb-5'/>
      <p>Drinks: <span className='font-bold'>{company.drinks.length}</span></p>
    </div>
  )
}

export default CompanyCard