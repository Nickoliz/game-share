import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearAtlasState, loadOrderByGames } from '../store/atlas';
import GameCards from '../components/GameCards';
import { Link as PageLink } from 'react-scroll';
import '../css/homepage.css';
import Navbar from '../components/Navbar';

export default function HomePage() {
  const [sticky, setSticky] = useState('');
  const [categoryDisplay, setCategoryDisplay] = useState('Top Ranked');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearAtlasState());
    setTimeout(() => {
      dispatch(loadOrderByGames('popular'));
    }, 1500)
    return () => dispatch(clearAtlasState());
  }, [dispatch])

  const orderByGames = useSelector(state => state.atlas.orderByGames);

  const orderByGamesList = [];
  for (let game in orderByGames) {
    orderByGamesList.push(orderByGames[game]);
  }

  const handleGameGrid = e => {
    setCategoryDisplay(e);
    if (e === 'Reddit Daily') {
      dispatch(loadOrderByGames('reddit_day_count'))
    } else if (e === 'Top Ranked') {
      dispatch(loadOrderByGames('popular'))
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
      <Navbar />
      <div className='homepage_main_container'>
        <div className='homepage_logo-container' />
        <div className='homepage_nav-container' id={sticky}>
          <div className='homepage_nav-button'>
            <div className='discover_modal-div' style={{ cursor: "pointer" }}>
              Discovery
              <div className='fa fa-caret-down' style={{ backgroundColor: '#3881D4', paddingLeft: '5px', paddingTop: '2px' }} />
              <div className='discovery_modal-container'>
                <div className='discovery_modal-selection'>
                  <PageLink to='navbar_container' smooth={true} duration={700} className='discovery_modal-selection' onClick={e => handleGameGrid('Top Ranked')}>Top Ranked</PageLink>
                </div>
                <div className='discovery_modal-selection'>
                  <PageLink to='navbar_container' smooth={true} duration={700} className='discovery_modal-selection' onClick={e => handleGameGrid('Trending')}>Trending</PageLink>
                </div>
                <div className='discovery_modal-selection'>
                  <PageLink to='navbar_container' smooth={true} duration={700} className='discovery_modal-selection' onClick={e => handleGameGrid('Popularity')}>Popularity</PageLink>
                </div>
                <div className='discovery_modal-selection'>
                  <PageLink to='navbar_container' smooth={true} duration={700} className='discovery_modal-selection' onClick={e => handleGameGrid('Reddit Daily')}>Reddit Daily</PageLink>
                </div>
              </div>
            </div>
          </div>
          <Link to='/buy' className='homepage_nav-button'>
            <div id='homepage_nav-button-box'>
              Buy
            </div>
          </Link>
          <Link to='/sell' className='homepage_nav-button'>
            <div id='homepage_nav-button-box'>
              Sell
            </div>
          </Link>
          <Link to='/trade' className='homepage_nav-button'>
            <div id='homepage_nav-button-box'>
              Trade
            </div>
          </Link>
          <Link to='/borrow' className='homepage_nav-button'>
            <div id='homepage_nav-button-box'>
              Borrow
            </div>
          </Link>
        </div>
        {(orderByGames) ?
          <div id='grid-label'>{categoryDisplay}</div>
          :
          <div id='grid-label'>Loading...</div>
        }
        <div className='home_card-container-wrapper'>
          {(orderByGames) ?
            orderByGamesList.map((game) => <GameCards game={game} key={game.id} />)
            :
            <div className='fas fa-dice-d20 fa-spin fa-5x' style={{ gridArea: 'b', color: '#3881D4', justifyContent: 'center', marginTop: '50px' }}></div>
          }
        </div>
      </div>
    </>
  )
}
