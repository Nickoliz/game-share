import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getForBorrow } from '../store/games'
import DBGameCards from '../components/DBGameCards';
import NavbarNotHome from '../components/NavbarNotHome';
import '../css/borrowpage.css';

export default function BuyPage() {
  const dispatch = useDispatch();
  const gamesForBorrow = useSelector(state => state.games.gamesforborrow);

  useEffect(() => {
    dispatch(getForBorrow())
  }, [dispatch])

  const gamesForBorrowList = [];
  for (let game in gamesForBorrow) {
    gamesForBorrowList.push(gamesForBorrow[game]);
  }

  return (
    <>
      <NavbarNotHome />
      <div className='borrow_box'>
        <div className='borrowpage_label' />
        <div className='borrow_card-container-wrapper'>
          {gamesForBorrowList.map((game) => <DBGameCards game={game} key={game.id} />)}
        </div>
      </div>
    </>
  )
}
