import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useParams } from 'react-router-dom';
import NavbarNotHome from '../components/NavbarNotHome';
import { getOffer } from '../store/games';
import { clearGamesState } from '../store/games';
import { buildOffer } from '../store/offers';
import '../css/offerpage.css';


export default function OfferPage() {
  const [offerModal, setOfferModal] = useState(null);
  const [offerBuy, setOfferBuy] = useState(false)
  const [offerTrade, setOfferTrade] = useState(false)
  const [offerBorrow, setOfferBorrow] = useState(false)
  const currentUser = useSelector(state => state.auth);
  const game = useSelector(state => state.games.game);
  const params = useParams('id');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearGamesState());
    dispatch(getOffer(params.id));
  }, [dispatch, params])

  const handleOfferBuy = () => {
    if (offerBuy === false) {
      setOfferBuy(true);
    } else {
      setOfferBuy(false)
    }
  }

  const handleOfferTrade = () => {
    if (offerTrade === false) {
      setOfferTrade(true);
    } else {
      setOfferTrade(false)
    }
  }

  const handleOfferBorrow = () => {
    if (offerBorrow === false) {
      setOfferBorrow(true);
    } else {
      setOfferBorrow(false)
    }
  }

  const submitOffer = e => {
    dispatch(buildOffer(game.user_id, currentUser.id, game.game_id, offerBuy, offerTrade, offerBorrow));
    setOfferModal(true);

    // if (offerBuy && offerTrade && offerBorrow === true) {

    // } else {
    //   setOfferModal(true);
    // }
  }

  if (!currentUser.id) return <Redirect to='/login' />;

  if (!game) return null;


  return (
    <>
      {(offerModal) ?
        <div className='offer-overlay'>
          <div className='offer_modal-container'>
            <div id='offer_modal-message' style={{ backgroundColor: '#37404A' }}>
              You made <span style={{ fontWeight: 'bold', backgroundColor: '#37404A' }}>
                {game.username}<span> </span>
              </span>
              an offer for <span> </span>
              <span style={{ fontWeight: 'bold', backgroundColor: '#37404A' }}>
                {game.title}
              </span>.
              <br />
              <Link to='/'>
                <button id='offer-modal-button'>Now, you wait...</button>
              </Link>
            </div>
          </div>
        </div>
        :
        null
      }
      <NavbarNotHome />
      <Link style={{textDecoration: 'none'}} to={`/gamepage/${game.game_id}`}>
        <h1 className='offerpage_game-title'>{game.title}</h1>
      </Link>
      <div className='offerpage_main_container'>
        <div className='offerpage_main-game'>
          <div className='offerpage_main-game-info'>
            <img style={{ borderRadius: '8px' }} src={game.thumb_url} alt={game.id} />
          </div>
        </div>
        <div className='offerpage_game-description'>
          <h2>Price: <span style={{ fontWeight: 'normal' }}>${game.sale_price.toFixed(2)}</span></h2>
          <h3>Condition: <span style={{ fontWeight: 'normal' }}>{game.condition}</span></h3>
          <h3 id='condition-description'>Condition Description:</h3>
          <span style={{ fontWeight: 'normal', marginTop: '10px' }}>{game.condition_description}</span>
        </div>
        {/* <div className='offerpage_offer-container'>
          <form className='offerpage_offer-form'>
            <label id='offer-price-label' htmlFor='offer-price'>Offer Price: </label>
            <input id='counter-offer-price' name='offer-price' type='number' value={game.sale_price} onChange={e => setOfferPrice(e.target.value)} />
            <br />
            <label id='offer-message-label' htmlFor='offer-message'>Offer Message: </label>
            <textarea id='offer-message' name='offer-message' type='text' placeholder='Message the owner...' />
          </form>
        </div> */}
      </div>
      <div className='offerpage_listing-type'>
        <div style={{ marginBottom: '10px' }}>What do you want to do?</div>
        <div id='offerpage_listing-container'>
          {(game.forsale) ?
            <div>
              <input className='offerpage_listing-option' type='checkbox' name='offerbuy' value='true' onChange={e => handleOfferBuy()} id='offerbuy' />
              <label id='offerpage_list-label'>Buy</label>
            </div>
            :
            null
          }
          {(game.fortrade) ?
            <div>
              <input className='offerpage_listing-option' type='checkbox' name='offertrade' value='true' onChange={e => handleOfferTrade()} id='offertrade' />
              <label id='offerpage_list-label'>Trade</label>
            </div>
            :
            null
          }
          {(game.forborrow) ?
            <div>
              <input className='offerpage_listing-option' type='checkbox' name='offerborrow' value='true' onChange={e => handleOfferBorrow()} id='offerborrow' />
              <label id='offerpage_list-label'>Borrow</label>
            </div>
            :
            null
          }
        </div>
      </div>
      <div className='submit_offer-button' onClick={e => submitOffer()}>Submit Offer</div>
    </>
  )
}
