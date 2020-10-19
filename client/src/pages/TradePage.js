import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearGamesState, getForTrade } from '../store/games'
import DBGameCards from '../components/DBGameCards';
import NavbarNotHome from '../components/NavbarNotHome';
import '../css/tradepage.css';
import { clearAtlasState } from '../store/atlas';

export default function BuyPage() {
  const dispatch = useDispatch();
  const gamesForTrade = useSelector(state => state.games.gamesfortrade);

  useEffect(() => {
    dispatch(clearGamesState());
    dispatch(clearAtlasState());
    dispatch(getForTrade())
  }, [dispatch])

  const gamesForTradeList = [];
  for (let game in gamesForTrade) {
    gamesForTradeList.push(gamesForTrade[game]);
  }

  return (
    <>
      <NavbarNotHome />
      <div className='trade_box'>
        <div className='trade_card-container-wrapper'>
          {gamesForTradeList.map((game) => <DBGameCards game={game} key={game.id} />)}
        </div>
      </div>
    </>
  )
}
