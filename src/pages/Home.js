import React from 'react'
import {Link} from 'react-router-dom'

function Home({ companies }) {

 const companyLinks = companies.map(company => <Link key={company.id} to={`/company/${company.id}`}>{company.name}</Link>)

  return (
    <div>
      {companyLinks}
    </div>
  )
}

export default Home