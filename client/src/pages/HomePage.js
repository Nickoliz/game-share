import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { loadOrderByGames } from '../store/atlas';
import GameCards from '../components/GameCards';
import '../css/homepage.css';


export default function HomePage() {
  const [sticky, setSticky] = useState('');
  const [categoryDisplay, setCategoryDisplay] = useState('Trending');
  const dispatch = useDispatch();
  const currentUserId = useSelector(state => state.auth.id);

  useEffect(() => {
    dispatch(loadOrderByGames('trending'))
  },[dispatch])

  const orderByGames = useSelector(state => state.atlas.orderByGames);

  const orderByGamesList = [];
  for (let game in orderByGames) {
    orderByGamesList.push(orderByGames[game]);
  }

  const handleGameGrid = e => {
    setCategoryDisplay(e);
    if (e === 'Reddit Weekly') {
      dispatch(loadOrderByGames('reddit_week_count'))
    } else {
      dispatch(loadOrderByGames(e.toLowerCase()))
    }
  }

  const stickNav = () => {
    if (window.pageYOffset >= 270) {
      setSticky('sticky');
    } else {
      setSticky('');
    }
  }

  window.onscroll = function () { stickNav() };

  return (
    <>
      <div className='homepage_auth'>
        {(currentUserId) ?
          null
          :
          <NavLink exact to='/signup' id='auth-link' className='homepage_auth-button' style={{ textDecoration: "none" }}>Sign Up</NavLink>
        }
        {(currentUserId) ?
          <div className='homepage_auth-button homepage_login-button'>Profile</div>
          :
          <NavLink exact to='/login' className='homepage_auth-button homepage_login-button' id='auth-id' style={{ textDecoration: "none" }}>Log in</NavLink>
        }
      </div>
      <div className='homepage_main_container'>
        <div className='homepage_logo-container' />
        <div className='homepage_nav-container' id={sticky}>
          <div className='homepage_nav-button'>
            <div className='discover_modal-div' style={{ cursor: "pointer" }}>
              Discovery
              <div className='fa fa-caret-down' style={{ backgroundColor: '#3881D4', paddingLeft: '5px', paddingTop: '2px' }} />
              <div className='discovery_modal-container'>
                <div className='discovery_modal-selection' onClick={e => handleGameGrid('Trending')}>
                  Trending
                </div>
                <div className='discovery_modal-selection' onClick={e => handleGameGrid('Popular')}>
                  Popular
                </div>
                <div className='discovery_modal-selection' onClick={e => handleGameGrid('Reddit Weekly')}>
                  Reddit Weekly
                </div>
              </div>
            </div>
          </div>
          <div className='homepage_nav-button'>
            <div id='homepage_nav-button-box'>
              Buy
            </div>
          </div>
          <div className='homepage_nav-button'>
            <div id='homepage_nav-button-box'>
              Sell
            </div>
          </div>
          <div className='homepage_nav-button'>
            <div id='homepage_nav-button-box'>
              Trade
            </div>
          </div>
          <div className='homepage_nav-button'>
            <div id='homepage_nav-button-box'>
              Borrow
            </div>
          </div>
        </div>
        <div id='grid-label'>{categoryDisplay}</div>
        <div className='card-container-wrapper'>
          {orderByGamesList.map((game) => <GameCards game={game} key={game.id} />)}
          {/* {(popularGames || redditGames) ?
            popularGamesList.map((game) => <GameCards game={game} key={game.id} />)
            :
            redditGamesList.map((game) => <GameCards game={game} key={game.id} />)
          } */}
        </div>
      </div>
    </>
  )
}
