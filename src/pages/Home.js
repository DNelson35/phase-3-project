// import React from 'react'
// import { Link } from 'react-router-dom'
// import useCompaniesContext from '../hooks/useCompaniesContext'
 
// function Home() {

//     const {companies} = useCompaniesContext()

//     const companyLinks = companies.map(company => (
//         <div key={company.id}>
//             <h2>{company.name}</h2>
//             <Link to={`/company/${company.id}/drinks`} state={company.drinks}>
//                 <img src={company.logo_url} alt='logo' className='block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0 object-cover w-[100px] mb-5'/>
//             </Link>
//         </div> 
//     ))

//   return (
//     <div className='relative h-screen mr-10 ml-10'>
//         <div className='flex flex-wrap justify-between text-center'>
//             {companyLinks}
//         </div>
//     </div>
    
//   )
// }

// export default Home