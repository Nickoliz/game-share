import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateGame } from '../store/games';




export default function ListingModal({ game, hideModal }) {

  const [gameCondition, setGameCondition] = useState('Condition');
  const [listingPrice, setListingPrice] = useState('Listing Price');
  const [conditionDescription, setConditionDescription] = useState('Condition Description (200 characters)');
  const [forsale, setForSale] = useState(false);
  const [fortrade, setForTrade] = useState(false);
  const [forborrow, setForBorrow] = useState(false);

  const currentUserId = useSelector(state => state.auth.id);
  const dispatch = useDispatch();

  const submitEdit = () => {
    dispatch(updateGame(
      currentUserId,
      game.id,
      listingPrice,
      gameCondition,
      conditionDescription,
      forsale,
      fortrade,
      forborrow
    ))
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


  return (
    <>
      <div className='edit-listing-overlay'>
        <div className='edit-listing-container'>
          <div className='edit-container-title'>{game.title}</div>
          <br />
          <form className='edit-listing-form'>
            <div className='edit-listing-info-1'>
              <label for='lsitingPrice'>Listing Price: </label>
              <input className='edit_listing_form-input-price' type='text' autoComplete='off' name='listingPrice' onChange={e => setListingPrice(e.target.value)} placeholder={'$' + game.sale_price} />
              <label>Game Condition:</label>
              <div className='edit_listing_form-input-condition' onChange={e => conditionDescription(e.target.value)}>{game.condition}
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
              <button className='edit_listing_form__submit' type='cancel' onClick={hideModal}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
