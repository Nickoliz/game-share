import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import NavbarNotHome from '../components/NavbarNotHome';
import { getOffer } from '../store/games';
import { clearGamesState } from '../store/games';


export default function OfferPage() {
  const params = useParams('id');
  const dispatch = useDispatch();

  const currentUser = useSelector(state => state.auth);
  const game = useSelector(state => state.games.game);

  useEffect(() => {
    dispatch(clearGamesState());
    dispatch(getOffer(params.id))
  }, [dispatch])

  if (!currentUser.id) return <Redirect to='/login' />;
  if (!game) return null;

  return (
    <>
      <NavbarNotHome />
      <h1>{game.title}</h1>
    </>
  )
}
