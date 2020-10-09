import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getForBuy } from '../store/games'
import DBGameCards from '../components/DBGameCards';

export default function BuyPage() {
  const dispatch = useDispatch();
  const gamesForBuy = useSelector(state => state.games.gamesforbuy);

  useEffect(() => {
    dispatch(getForBuy())
  }, [dispatch])

  console.log(gamesForBuy)
  const gamesForBuyList = [];
  for (let game in gamesForBuy) {
    gamesForBuyList.push(gamesForBuy[game]);
  }

  return (
    <>
      <div className='card-container-wrapper'>
        {gamesForBuyList.map((game) => <DBGameCards game={game} key={game.id} />)}
      </div>
    </>
  )
}
