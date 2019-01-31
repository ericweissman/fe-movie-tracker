import React from 'react'
import { NavLink } from 'react-router-dom'

export const Header = (props) => {
  return (
    <header>
      <NavLink to='/' className='nav'>Show All Movies</NavLink>
      <NavLink to='/login' className='nav'>Login</NavLink>
      <NavLink to='/signup' className='nav'>Signup</NavLink>
      <NavLink to='/favorites' className='nav' >View Favorites</NavLink>
      {props.user.name && <button onClick={props.logoutUser}>LOG OUT</button>}
    </header>
  )
}