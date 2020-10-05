import React from 'react';
import Auth from '../components/Auth'
import { Route } from 'react-router-dom';
import HomePage from './HomePage'




export default function Pages() {
  return (
    <>
      <Route exact path="/" component={HomePage} />
      <Auth />
    </>
  )
}
