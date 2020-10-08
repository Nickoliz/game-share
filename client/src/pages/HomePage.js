import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import GameCards from '../components/GameCards'
import '../css/homepage.css'

// const {
//   atlas: { client_id },
// } = require("../config/index");

export default function HomePage() {
  const [gameList, setGameList] = useState(null)

  const trendingGames = useSelector(state => state.trendingGames.games)

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])


  return (
    <>
      <div className='homepage_main_container'>
        <div className='homepage_logo-container' />
        <div className='homepage_nav-container'>
          <div className='homepage_nav-button'>
            <div id='homepage_nav-button-box'>
              Discover
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
        <GameCards trendingGames={trendingGames} />
      </div>
    </>
  )
}
