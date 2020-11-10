import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../store/auth';
import NavbarSearchModal from './NavbarSearchModal';
import '../css/navbar.css';
import '../css/unauthnavsearch.css';
import AboutMe from './AboutMe';


export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState(null);
  const [aboutMeModal, setAboutMeModal] = useState(null);
  const currentUserId = useSelector(state => state.auth.id);
  const dispatch = useDispatch()

  const body = document.getElementById('body-id');

  const signOut = () => {
    dispatch(logout());
  }

  const handleAboutMe = () => {
    setAboutMeModal(true);
    body.classList.add('lock-scroll');
  }

  const hideModal = () => {
    setAboutMeModal(null);
    body.classList.remove('lock-scroll');
  }

  return (
    <>
      {(aboutMeModal) ?
        <AboutMe hideModal={hideModal} />
        :
        null
      }
      <div className='navbar_container'>
        <div className='navbar_search_container'>
          <div>
            <i className='fa fa-search' />
          </div>
          <input className='navbar_search-bar' onChange={e => setSearchTerm(e.target.value)} style={{ color: '#AAB8C5' }} placeholder='Search for board games...' />
          {(searchTerm) ?
            <div className='unauth_search_modal'>
              <i className='fa fa-times fa-2x' onClick={() => setSearchTerm('')} />
              <NavbarSearchModal searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
            :
            null
          }
        </div>
        <div className='homepage_auth'>
          <div className='homepage_auth-button' style={{ padding: '12px' }} onClick={() => handleAboutMe()}>About Me</div>
          {(currentUserId) ?
            null
            :
            <NavLink exact to='/signup' id='auth-link' className='homepage_auth-button' style={{ textDecoration: "none" }}>Sign Up</NavLink>
          }
          {(currentUserId) ?
            <div className='auth_profile_container'>
              {/* <i className='fas fa-bell fa-2x' style={{ backgroundColor: '#3881D4', color: '#333A3F', cursor: 'pointer' }} /> */}
              <NavLink exact to={`/profile/${currentUserId}`} className='auth_profile_button' style={{ textDecoration: 'none' }}>Profile</NavLink>
              <i className='fas fa-sign-out-alt fa-2x' onClick={e => signOut()} style={{ color: '#333A3F', backgroundColor: '#3881D4', cursor: 'pointer' }} />
            </div>
            :
            <NavLink exact to='/login' className='homepage_auth-button homepage_login-button' id='auth-id' style={{ textDecoration: "none" }}>Log in</NavLink>
          }
        </div>
      </div>
    </>
  )
}
