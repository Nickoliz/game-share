import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import '../css/navbar.css'


export default function Navbar() {
  const currentUserId = useSelector(state => state.auth.id);


  return (
    <>
      <div className='navbar_container'>
        <div className='navbar_search_container'>
          <div>
            <i className='fa fa-search' />
          </div>
          <input className='navbar_search-bar' style={{color: '#AAB8C5'}} placeholder='Search for board games...' />
        </div>
        <div className='homepage_auth'>
          {(currentUserId) ?
            null
            :
            <NavLink exact to='/signup' id='auth-link' className='homepage_auth-button' style={{ textDecoration: "none" }}>Sign Up</NavLink>
          }
          {(currentUserId) ?
            <NavLink exact to='/profile' className='auth_profile_button' style={{textDecoration: 'none'}}>Profile</NavLink>
            :
            <NavLink exact to='/login' className='homepage_auth-button homepage_login-button' id='auth-id' style={{ textDecoration: "none" }}>Log in</NavLink>
          }
        </div>
      </div>
    </>
  )
}
