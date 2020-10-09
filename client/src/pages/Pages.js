import React from 'react';
import { Route } from 'react-router-dom';
import HomePage from './HomePage'
import BuyPage from './BuyPage'
// import TradePage from './TradePage'
// import BorrowPage from './BorrowPage'
import Navbar from './Navbar';




export default function Pages() {
  return (
    <>
    <Navbar />
      <Route exact path="/" component={HomePage} />
      <Route exact path="/buy" component={BuyPage} />
      {/* <Route exact path="/trade" component={TradePage} />
      <Route exact path="/borrow" component={BorrowPage} /> */}
    </>
  )
}
