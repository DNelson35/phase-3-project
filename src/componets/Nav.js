import React from 'react'
import { NavLink } from 'react-router-dom'

function Nav() {
  return (
    <div className='flex w-full h-10 bg-red-500 mb-10'>
        <NavLink to='/' className='bold text-black text-2xl'>Home</NavLink>
        <NavLink to='/edit' className='bold text-black text-2xl'>Edit</NavLink>
    </div>
  )
}

export default Nav