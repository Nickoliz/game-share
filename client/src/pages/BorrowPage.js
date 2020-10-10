import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getForBorrow } from '../store/games'
import DBGameCards from '../components/DBGameCards';
import NavbarNotHome from '../components/NavbarNotHome'

export default function BorrowPage() {
  const dispatch = useDispatch();
  const gamesForBorrow = useSelector(state => state.games.gamesforborrow);

  useEffect(() => {
    dispatch(getForBorrow())
  }, [dispatch])

  const gamesForBorrowList = [];
  for (let game in gamesForBorrow) {
    gamesForBorrowList.push(gamesForBorrow[game]);
  }

  console.log(gamesForBorrowList)

  return (
    <>
    <NavbarNotHome />
      <div className='card-container-wrapper'>
        {gamesForBorrowList.map((game) => <DBGameCards game={game} key={game.id} />)}
      </div>
    </>
  )
}
