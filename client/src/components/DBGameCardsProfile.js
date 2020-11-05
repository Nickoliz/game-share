import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getGameById } from '../store/atlas'
import '../css/dbgamecardsprofile.css';
import { getGameImages } from '../store/images';
import { getGameReviews } from '../store/reviews';
import { deleteGame } from '../store/games';


export default function GameCardProfile({ game, ownerOffersList }) {
  const [offer, setOffer] = useState(null);
  const [listingModal, setListingModal] = useState(false);
  const [offerModal, setOfferModal] = useState(false);

  const [gameCondition, setGameCondition] = useState('Condition');
  const [listingPrice, setListingPrice] = useState('Listing Price');
  const [conditionDescription, setConditionDescription] = useState('Condition Description (200 characters)');
  const [forsale, setForSale] = useState(false);
  const [fortrade, setForTrade] = useState(false);
  const [forborrow, setForBorrow] = useState(false);

  const currentUserId = useSelector(state => state.auth.id);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClick = id => {
    dispatch(getGameById(id));
    dispatch(getGameImages(id));
    dispatch(getGameReviews(id));
    history.push(`/gamepage/${id}`)
  }

  useEffect(() => {
    ownerOffersList.map((g) => {
      if (game.game_id === g.game_id) {
        return setOffer(true);
      } else {
        return null;
      }
    })
  }, [ownerOffersList, game.game_id])


  const goToOffers = () => {
    history.push(`/offers/${currentUserId}`)
  }

  const submitEdit = () => {

  }

  const removeGame = (game_id) => {
    dispatch(deleteGame(currentUserId, game_id))
  }

  const handleCondition = e => {
    setGameCondition(e);
  };

  const handleCheckSale = () => {
    if (forsale === false) {
      return setForSale(true);
    } else {
      return setForSale(false)
    }
  }

  const handleCheckTrade = () => {
    if (fortrade === false) {
      return setForTrade(true);
    } else {
      return setForTrade(false);
    }
  }

  const handleCheckBorrow = () => {
    if (forborrow === false) {
      return setForBorrow(true);
    } else {
      return setForBorrow(false);
    }
  }

  if (!game) return null

  return (
    <>
      {(listingModal) ?
        <div className='edit-listing-overlay'>
          <div className='edit-listing-container'>
            <div className='edit-container-title'>{game.title}</div>
            <br />
            <form className='edit-listing-form'>
              <div className='edit-listing-info-1'>
                <label for='lsitingPrice'>Listing Price: </label>
                <input className='edit_listing_form-input-price' type='text' autoComplete='off' name='listingPrice' onChange={e => setListingPrice(e.target.value)} placeholder={'$' + game.sale_price} />
                <label>Game Condition:</label>
                <div className='edit_listing_form-input-condition'>{game.condition}
                  <i className='fa fa-caret-down' style={{ marginLeft: '10px' }} />
                  <div className='edit-listing-condition_select'>
                    <div id='listing-condition_option' onClick={e => handleCondition('New')}>New</div>
                    <div id='listing-condition_option' onClick={e => handleCondition('Used')}>Used</div>
                    <div id='listing-condition_option' onClick={e => handleCondition('Poor')}>Poor</div>
                  </div>
                </div>
              </div>
              <div className='edit-listing-info-2'>
                <div id='listing-condition-description'>Condition Description:</div>
                <br />
                <textarea id='edit-condition-description' type='text' name='conditionDescription' onChange={e => setConditionDescription(e.target.value)} placeholder={game.condition_description} />
              </div>
              <div className='listing_option-box'>
                <div>
                  <input className='listing-option' type='checkbox' name='forsale' value='true' onChange={e => handleCheckSale()} id='forsale' />
                  <label id='list-label'>For Sale</label>
                </div>
                <div>
                  <input className='listing-option' type='checkbox' name='fortrade' value='true' onChange={e => handleCheckTrade()} id='fortrade' />
                  <label id='list-label'>For Trade</label>
                </div>
                <div>
                  <input className='listing-option' type='checkbox' name='forborrow' value='true' onChange={e => handleCheckBorrow()} id='forborrow' />
                  <label id='list-label'>For Borrow</label>
                </div>
              </div>
              <div className='edit-listing-buttons'>
                <input className='edit_listing_form__submit' type='submit' text='submit' onClick={e => submitEdit()} />
                <button className='edit_listing_form__submit' type='cancel' onClick={e => setListingModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
        :
        null
      }
      {(offerModal) ?
        <div className='edit-listing-overlay'>
          <div className='edit-listing-container'>
            <div className='edit-container-title'>{game.title}</div>
            <br />
            <form className='edit-listing-form'>
              <div className='edit-listing-info-1'>
                <label for='lsitingPrice'>Listing Price: </label>
                <input className='edit_listing_form-input-price' type='text' autoComplete='off' name='listingPrice' onChange={e => setListingPrice(e.target.value)} placeholder={'$' + game.sale_price} />
                <label>Game Condition:</label>
                <div className='edit_listing_form-input-condition'>{game.condition}
                  <i className='fa fa-caret-down' style={{ marginLeft: '10px' }} />
                  <div className='edit-listing-condition_select'>
                    <div id='listing-condition_option' onClick={e => handleCondition('New')}>New</div>
                    <div id='listing-condition_option' onClick={e => handleCondition('Used')}>Used</div>
                    <div id='listing-condition_option' onClick={e => handleCondition('Poor')}>Poor</div>
                  </div>
                </div>
              </div>
              <div className='edit-listing-info-2'>
                <div id='listing-condition-description'>Condition Description:</div>
                <br />
                <textarea id='edit-condition-description' type='text' name='conditionDescription' onChange={e => setConditionDescription(e.target.value)} placeholder={game.condition_description} />
              </div>
              <div className='listing_option-box'>
                <div>
                  <input className='listing-option' type='checkbox' name='forsale' value='true' onChange={e => handleCheckSale()} id='forsale' />
                  <label id='list-label'>For Sale</label>
                </div>
                <div>
                  <input className='listing-option' type='checkbox' name='fortrade' value='true' onChange={e => handleCheckTrade()} id='fortrade' />
                  <label id='list-label'>For Trade</label>
                </div>
                <div>
                  <input className='listing-option' type='checkbox' name='forborrow' value='true' onChange={e => handleCheckBorrow()} id='forborrow' />
                  <label id='list-label'>For Borrow</label>
                </div>
              </div>
              <div className='edit-listing-buttons'>
                <input className='edit_listing_form__submit' type='submit' text='submit' onClick={e => submitEdit()} />
                <button className='edit_listing_form__submit' type='cancel' onClick={e => setListingModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
        :
        null
      }
      {/* END MODAL */}
      <div id={game.id} className="card-wrapper" >
        <div className='main-card-game-name' style={{ cursor: 'pointer' }} onClick={e => handleClick(game.game_id)}>
          <div id={game.id} className='top_card-name' style={{ cursor: 'pointer' }}>{game.title.substring(0, 30)}
            <div className='rank-and-more'>Rank: {(game.rank > 500) ? "Not Ranked" : game.rank}</div>
          </div>
        </div>
        {(offer) ?
          <div onClick={e => setOfferModal(true)} style={{cursor: 'pointer'}} className='card_offer-new'>
            New Offer
            </div>
          :
          null
        }
        <div id='profile_game_card-break'></div>
        <div id={game.id} className="card">
          <div className="card-link">
            <Link id={game.id}
              style={{ textDecoration: "none", color: "black" }}
              onClick={e => handleClick(game.game_id)}>
              <img id={game.id}
                src={game.thumb_url}
                alt={game.msrp}
              />
            </Link>
            {(game.forsale || game.fortrade || game.forborrow) ?
              <div id={game.id} className='main-card-game-info'>Listed:
              {(game.forsale) ?
                  <div id='main-card-info-box'>For Sale: $<span style={{ backgroundColor: '#37404A' }}>{game.sale_price.toFixed(2)}</span></div>
                  :
                  null
                }
                {(game.fortrade) ?
                  <div id='main-card-info-box'>For Trade</div>
                  :
                  null
                }
                {(game.forborrow) ?
                  <div id='main-card-info-box'>For Borrow</div>
                  :
                  null
                }
              </div>
              :
              null
            }
          </div>
          <div className='revision-buttons'>
            {(game.forsale || game.fortrade || game.forborrow) ?
              <div className="edit-listing" onClick={e => setListingModal(true)}>Edit Listing</div>
              :
              null
            }
            {(offer) ?
              null
              :
              <div className='delete-game' onClick={() => removeGame(game.id)}>Remove</div>
            }
          </div>
        </div>
      </div >
    </>
  )
}
