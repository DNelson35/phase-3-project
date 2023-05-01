import { companiesContext } from '../context/companiesContext'
import { useContext } from 'react'

function useCompaniesContext() {
  return (useContext(companiesContext))
}

export default useCompaniesContext