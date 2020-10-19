import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { clearAtlasState, loadGamesForSearch } from '../store/atlas';
import SearchCardAtlasNav from '../components/SearchCardAtlasNav';
import { logout } from '../store/auth'
import '../css/navbar.css'


export default function NavbarNotHome() {
  const currentUserId = useSelector(state => state.auth.id);
  const [searchTerm, setSearchTerm] = useState('');
  const games = useSelector(state => state.atlas.orderByGames);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(loadGamesForSearch(searchTerm))
  }, [searchTerm, dispatch]);

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
          <input className='navbar_search-bar' onChange={e => setSearchTerm(e.target.value)} style={{ color: '#AAB8C5' }} placeholder='Search for board games...' />
          {(searchTerm) ?
            <div className='unauth_search_modal'>
              <i className='fa fa-times fa-2x' onClick={e => setSearchTerm('')} />
              {(games.length > 0) ?
                games.map((game) =>
                  <SearchCardAtlasNav searchTerm={searchTerm} game={game} key={game.id} />)
                :
                <div id='unauth_no-search-results'>No games matching result.</div>
              }
            </div>
            :
            null
          }
        </div>
        <NavLink exact to='/' className='fas fa-dice fa-3x navbarauthdice' style={{ textDecoration: 'none', cursor: 'pointer', color: '#37404A', backgroundColor: '#3881D4', marginRight: '190px' }} />
        <div className='homepage_auth'>
          {(currentUserId) ?
            null
            :
            <NavLink exact to='/signup' id='auth-link' className='homepage_auth-button' style={{ textDecoration: "none" }}>Sign Up</NavLink>
          }
          {(currentUserId) ?
            <div className='auth_profile_container'>
              <NavLink exact to={`/profile/${currentUserId}`} className='auth_profile_button' style={{ textDecoration: 'none' }}>Profile</NavLink>
              <i className='fas fa-sign-out-alt fa-2x' onClick={e => signOut()} style={{ color: '#333A3F', backgroundColor: '#3881D4', cursor: 'pointer' }} />
            </div>
            :
            <NavLink exact to='/login' className='homepage_auth-button homepage_login-button' id='auth-id' style={{ textDecoration: "none" }}>Log in</NavLink>
          }
        </div>
      </div>
      <div id='ellipsis-div'>
        <div className='fa fa-ellipsis-h fa-2x' />
        <div className='redirect_container'>
          <NavLink exact to='/' className='redirect_button'>Home</NavLink>
          <NavLink exact to='/buy' className='redirect_button'>Buy</NavLink>
          <NavLink exact to='/sell' className='redirect_button'>Sell</NavLink>
          <NavLink exact to='/trade' className='redirect_button'>Trade</NavLink>
          <NavLink exact to='/borrow' className='redirect_button'>Borrow</NavLink>
        </div>
      </div>
    </>
  )
}