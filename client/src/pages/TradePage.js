import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getForTrade } from '../store/games'
import DBGameCards from '../components/DBGameCards';
import NavbarNotHome from '../components/NavbarNotHome';

export default function TradePage() {
  const dispatch = useDispatch();
  const gamesForTrade = useSelector(state => state.games.gamesfortrade);

  useEffect(() => {
    dispatch(getForTrade())
  }, [dispatch])

  console.log(gamesForTrade)
  const gamesForTradeList = [];
  for (let game in gamesForTrade) {
    gamesForTradeList.push(gamesForTrade[game]);
  }


  return (
    <>
    <NavbarNotHome />
      <div className='card-container-wrapper'>
        {gamesForTradeList.map((game) => <DBGameCards game={game} key={game.id} />)}
      </div>
    </>
  )
}
