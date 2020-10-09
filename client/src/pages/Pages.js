import React from 'react';
import Auth from '../components/Auth'
import { Route } from 'react-router-dom';
import HomePage from './HomePage'
import BuyPage from './BuyPage'
import TradePage from './TradePage'
import BorrowPage from './BorrowPage'




export default function Pages() {
  return (
    <>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/buy" component={BuyPage} />
      <Route exact path="/trade" component={TradePage} />
      <Route exact path="/borrow" component={BorrowPage} />
      <Auth />
    </>
  )
}
