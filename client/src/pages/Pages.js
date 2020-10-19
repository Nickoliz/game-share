import React from 'react';
import { Route } from 'react-router-dom';
import HomePage from './HomePage';
import BuyPage from './BuyPage';
import TradePage from './TradePage';
import BorrowPage from './BorrowPage';
import Profile from './Profile';
import NewGameInstance from './NewGameInstance';
import GamePage from './GamePage';




export default function Pages() {
  return (
    <>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/buy" component={BuyPage} />
      <Route exact path="/trade" component={TradePage} />
      <Route exact path="/borrow" component={BorrowPage} />
      <Route exact path="/profile/:id" component={Profile} />
      <Route exact path="/sell" component={NewGameInstance} />
      <Route exact path="/gamepage/:id" component={GamePage} />
    </>
  )
}
