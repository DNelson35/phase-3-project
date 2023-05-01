import React from 'react'
import CompanyCard from '../components/CompanyCard'
import AddCompanyForm from '../components/AddCompanyForm'
import useCompaniesContext from '../hooks/useCompaniesContext'


function Edit() {

  const {companies} = useCompaniesContext()
 

  const companyCards = companies.map(company =>(<CompanyCard key={company.id} company={company}/>))


  return (
    <div className='relative h-screen mr-10 ml-10'>
      <div className='flex flex-wrap justify-between text-center'>
        {companyCards}
      </div>
      <div className='flex relative justify-center mt-20'>
        <AddCompanyForm/>
      </div>
    </div>
  )
}

export default Edit