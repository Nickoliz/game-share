import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { getForSale } from '../store/games'
import DBGameCards from '../components/DBGameCards';
import NavbarNotHome from '../components/NavbarNotHome'

export default function NewGameInstance() {
  const dispatch = useDispatch();
  const gamesForSale = useSelector(state => state.games.gamesforborrow);

  // useEffect(() => {
  //   dispatch(getForSale())
  // }, [dispatch])

  const gamesForSaleList = [];
  for (let game in gamesForSale) {
    gamesForSaleList.push(gamesForSale[game]);
  }


  return (
    <>
    <NavbarNotHome />
      <div className='card-container-wrapper'>
        {gamesForSaleList.map((game) => <DBGameCards game={game} key={game.id} />)}
      </div>
    </>
  )
}
