import React from 'react'
import { createContext, useState, useEffect } from 'react'

const companiesContext = createContext()


function Provider({children}) {
    const [companies, setCompanies] = useState([])
    
    useEffect(() => {
        fetch("http://localhost:9292/companies")
        .then(resp => resp.json())
        .then(companies => setCompanies(companies))
    },[])

  return (
    <companiesContext.Provider value={{companies, setCompanies}}>
        {children}
    </companiesContext.Provider>
  )
}

export { companiesContext }
export default Provider