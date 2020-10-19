import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearGamesState, getForBuy } from '../store/games'
import DBGameCards from '../components/DBGameCards';
import NavbarNotHome from '../components/NavbarNotHome';
import '../css/buypage.css';

export default function BuyPage() {
  const dispatch = useDispatch();
  const gamesForBuy = useSelector(state => state.games.gamesforbuy);

  useEffect(() => {
    dispatch(clearGamesState())
    dispatch(getForBuy())
  }, [dispatch])

  const gamesForBuyList = [];
  for (let game in gamesForBuy) {
    gamesForBuyList.push(gamesForBuy[game]);
  }

  return (
    <>
      <NavbarNotHome />
      <div className='buy_box'>
        <div className='buy_card-container-wrapper'>
          {gamesForBuyList.map((game) => <DBGameCards game={game} key={game.id} />)}
        </div>
      </div>
    </>
  )
}
