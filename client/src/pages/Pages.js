import React from 'react';
import { Route } from 'react-router-dom';
import HomePage from './HomePage';
import BuyPage from './BuyPage';
import TradePage from './TradePage';
import BorrowPage from './BorrowPage';
import Profile from './Profile';
import NewGameInstance from './NewGameInstance';
import GamePage from './GamePage';
import OfferPage from './OfferPage';


export default function Pages() {
  return (
    <>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/buy" component={BuyPage} />
      <Route exact path="/trade" component={TradePage} />
      <Route exact path="/borrow" component={BorrowPage} />
      {/* /offer/:username/:gameInstanceId */}
      <Route exact path="/offer/:username/:id" component={OfferPage} />
      {/* /profile/UserID */}
      <Route exact path="/profile/:id" component={Profile} />
      <Route exact path="/sell" component={NewGameInstance} />
      {/* /gamepage/API Game Id */}
      <Route exact path="/gamepage/:id" component={GamePage} />
    </>
  )
}
