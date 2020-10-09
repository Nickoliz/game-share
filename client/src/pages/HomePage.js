import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { loadTrendingGames, loadPopularGames, loadRedditGames } from '../store/atlas';
import GameCards from '../components/GameCards';
import Login from '../components/Login';
import Signup from '../components/Signup';
import DiscoveryModal from '../components/DiscoveryModal'
import '../css/homepage.css';

let modalDisplay = 'active'

export default function HomePage() {
  const [sticky, setSticky] = useState('')
  const [categoryChoice, setCategoryChoice] = useState('Discovery')
  const [discoveryModal, setDiscoveryModal] = useState(null)
  const dispatch = useDispatch()
  const currentUserId = useSelector(state => state.auth.id)

  useEffect(() => {
    dispatch(loadTrendingGames())
    dispatch(loadPopularGames())
    dispatch(loadRedditGames())
  }, [dispatch])

  const trendingGames = useSelector(state => state.atlas.trendingGames)
  const popularGames = useSelector(state => state.atlas.popularGames)
  const redditGames = useSelector(state => state.atlas.redditGames)

  const trendingGamesList = [];
  for (let game in trendingGames) {
    trendingGamesList.push(trendingGames[game])
  }

  const popularGamesList = [];
  for (let game in trendingGames) {
    popularGamesList.push(trendingGames[game])
  }

  const redditGamesList = [];
  for (let game in trendingGames) {
    redditGamesList.push(trendingGames[game])
  }

  const hideModal = e => {
    // e.stopPropogation;
    setDiscoveryModal(null)
  }

  const showDiscoveryModal = () => {
    setDiscoveryModal(<DiscoveryModal hideModal={hideModal} />);
  }

  const stickNav = () => {
    if (window.pageYOffset >= 270) {
      setSticky('sticky');
    } else {
      setSticky('');
    }
  }

  window.onscroll = function () { stickNav() }

  return (
    <>
      <div className='homepage_auth'>
        {(currentUserId) ?
          null
          :
          <NavLink exact to='/signup' id='auth-link' className='homepage_auth-button' style={{ "text-decoration": "none" }}>Sign Up</NavLink>
        }
        {(currentUserId) ?
          <div className='homepage_auth-button homepage_login-button'>Profile</div>
          :
          <NavLink exact to='/login' className='homepage_auth-button homepage_login-button' id='auth-id' style={{ "text-decoration": "none" }}>Log in</NavLink>
        }
      </div>
      <div className='homepage_main_container'>
        <div className='homepage_logo-container' />
        <div className='homepage_nav-container' id={sticky}>
          <div className='homepage_nav-button'>
            <div className='discover_modal-div' onClick={e => showDiscoveryModal()} style={{ cursor: "pointer" }}>
              {categoryChoice}
              <div className='fa fa-caret-down' style={{ backgroundColor: '#3881D4', paddingLeft: '5px', paddingTop: '2px' }} />
              <div className='discovery_modal-container'>
                {/* {discoveryModal} */}
                <DiscoveryModal hideModal={hideModal} />
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
        <div className='card-container-wrapper'>
          {trendingGamesList.map((game) => <GameCards game={game} key={game.id} />)}
          {(popularGames || redditGames) ?
            popularGamesList.map((game) => <GameCards game={game} key={game.id} />)
            :
            redditGamesList.map((game) => <GameCards game={game} key={game.id} />)
          }
        </div>
      </div>
    </>
  )
}
