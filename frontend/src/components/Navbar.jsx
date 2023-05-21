import React from 'react'
import { Link } from 'react-router-dom'
import Logo from './Pictures/ClickCart.png'
import LoginButton from './Login/LoginButton'

function Navbar() {
  return (
    <div className='navbar'>
       <Link className='logo-div' to={"/"}>
        <img src={Logo} className='logo' alt="logo" />
       </Link>
       <div className='nav-contents-div'>
        <Link to={"/"}>HOME</Link>
        <Link to={"/about"}>ABOUT</Link>
        <Link to={"/categories"}>CATEGORIES</Link>
       </div>
       <div className='login-div'>
        <LoginButton />
       </div>
    </div>
  )
}

export default Navbar