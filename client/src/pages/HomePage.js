import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { loadTrendingGames, loadPopularGames, loadRedditGames } from '../store/atlas'
import GameCards from '../components/GameCards'
import '../css/homepage.css'


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


  const trendingGamesList = [];
  for (let game in trendingGames) {
    trendingGamesList.push(trendingGames[game])
  }

  // const popularGamesList = [];
  // for (let game in trendingGames) {
  //   popularGamesList.push(trendingGames[game])
  // }

  // const redditGamesList = [];
  // for (let game in trendingGames) {
  //   redditGamesList.push(trendingGames[game])
  // }

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
        <div className='card-container-wrapper'>
          {trendingGamesList.map((game) => <GameCards game={game} key={game.id} />)}
        </div>
      </div>
    </>
  )
}
