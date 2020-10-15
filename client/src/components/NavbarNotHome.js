import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { logout } from '../store/auth'
import '../css/navbar.css'


export default function Navbar() {
  const currentUserId = useSelector(state => state.auth.id);
  const dispatch = useDispatch();
  const history = useHistory()

  const signOut = e => {
    dispatch(logout())
    history.push('/')

  }


  return (
    <>
      <div className='navbar_container'>
        <div className='navbar_search_container'>
          <div>
            <i className='fa fa-search' />
          </div>
          <input className='navbar_search-bar' placeholder='Search for board games...' />
        </div>
        <NavLink exact to='/' className='fas fa-dice fa-3x' style={{ textDecoration: 'none', cursor: 'pointer', color: '#37404A', backgroundColor: '#3881D4', marginRight: '140px' }} />
        <div className='homepage_auth'>
          {(currentUserId) ?
            null
            :
            <NavLink exact to='/signup' id='auth-link' className='homepage_auth-button' style={{ textDecoration: "none" }}>Sign Up</NavLink>
          }
          {(currentUserId) ?
            <div className='auth_profile_container'>
              <NavLink exact to='/profile' className='auth_profile_button' style={{ textDecoration: 'none' }}>Profile</NavLink>
              <i className='fas fa-sign-out-alt fa-2x' onClick={e => signOut()} style={{color: '#333A3F', backgroundColor: '#3881D4', cursor: 'pointer'}}/>
            </div>
            :
            <NavLink exact to='/login' className='homepage_auth-button homepage_login-button' id='auth-id' style={{ textDecoration: "none" }}>Log in</NavLink>
          }
        </div>
      </div>
    </>
  )
}
