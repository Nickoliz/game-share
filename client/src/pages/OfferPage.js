import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import NavbarNotHome from '../components/NavbarNotHome';
import { getOffer } from '../store/games';
import { clearGamesState } from '../store/games';
import '../css/offerpage.css';


export default function OfferPage() {
  const [offerPrice, setOfferPrice] = useState(null);
  const currentUser = useSelector(state => state.auth);
  const game = useSelector(state => state.games.game);

  const params = useParams('id');
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(clearGamesState());
    dispatch(getOffer(params.id));
  }, [dispatch, params])

  if (!currentUser.id) return <Redirect to='/login' />;

  if (!game) return null;

  return (
    <>
      <NavbarNotHome />
      <div className='offerpage_main_container'>
        <div className='offerpage_main-game'>
          <h1>{game.title}</h1>
          <div className='offerpage_main-game-info'>
            <img style={{ borderRadius: '8px' }} src={game.thumb_url} />
          </div>
        </div>
        <div className='offerpage_game-description'>
          <h2>{game.sale_price.toFixed(2)}</h2>
          <h2>{game.condition}</h2>
          {game.condition_description}
        </div>
        <div className='offerpage_offer-container'>
          <form className='offerpage_offer-form'>
            <label id='offer-price-label' for='offer-price'>Offer Price: </label>
            <input id='counter-offer-price' name='offer-price' type='number' value={game.sale_price} onChange={e => setOfferPrice(e.target.value)} />
            <br />
            <label id='offer-message-label' for='offer-message'>Offer Message: </label>
            <textarea id='offer-message' name='offer-message' type='text' placeholder='Message the owner...' />
          </form>
        </div>
      </div>
    </>
  )
}
