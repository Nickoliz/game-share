import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { loadTrendingGames, loadPopularGames, loadRedditGames } from '../store/atlas'
import GameCards from '../components/GameCards'
import '../css/homepage.css'

// const {
//   atlas: { client_id },
// } = require("../config/index");

export default function HomePage() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadTrendingGames())
    // dispatch(loadPopularGames())
    // dispatch(loadRedditGames())
  }, [dispatch])

  const trendingGames = useSelector(state => state.atlas.trendingGames)
  // const popularGames = useSelector(state => state.atlas.popularGames)
  // const redditGames = useSelector(state => state.atlas.redditGames)
  console.log(trendingGames)

  // useEffect(() => {
  //   dispatch(getCategories())
  // }, [dispatch])

  // const handleClick = e => {

  // }

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
        {/* <GameCards trendingGames={trendingGames} /> */}
      </div>
    </>
  )
}
