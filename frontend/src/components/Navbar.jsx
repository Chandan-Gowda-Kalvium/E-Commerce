import React from 'react'
import { Link } from 'react-router-dom'
import Logo from './Pictures/ClickCart.png'

function Navbar() {
  return (
    <div className='navbar'>
       <Link className='logo-div'>
        <img src={Logo} className='logo' alt="logo" />
       </Link>
       <div className='nav-contents-div'>
        <Link>HOME</Link>
        <Link>ABOUT</Link>
        <Link>CATEGORIES</Link>
       </div>
       <div className='login-div'>
        <Link className='login'>Login</Link>
       </div>
    </div>
  )
}

export default Navbar