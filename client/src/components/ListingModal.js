import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateGame } from '../store/games';




export default function ListingModal({ game, hideModal }) {

  const [gameCondition, setGameCondition] = useState(null);
  const [listingPrice, setListingPrice] = useState(null);
  const [conditionDescription, setConditionDescription] = useState(null);
  const [forsale, setForSale] = useState(null);
  const [fortrade, setForTrade] = useState(null);
  const [forborrow, setForBorrow] = useState(null);

  const currentUserId = useSelector(state => state.auth.id);
  const dispatch = useDispatch();


  useEffect(() => {
    setGameCondition(game.condition);
    setListingPrice(game.sale_price);
    setConditionDescription(game.condition_description);
    setForSale(game.forsale);
    setForTrade(game.fortrade);
    setForBorrow(game.forborrow);
  }, [game]);

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
    ));
  };

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
              <label style={{ marginRight: '15px' }}>Listing Price: </label>
              <input className='edit_listing_form-input-price' type='text' autoComplete='off' name='listingPrice' onChange={e => setListingPrice(e.target.value)} placeholder={'$' + listingPrice} />
              <label style={{ marginRight: '15px' }}>Game Condition:</label>
              <div className='edit_listing_form-input-condition' onChange={e => setGameCondition(e.target.value)}>{gameCondition}
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
              <textarea id='edit-condition-description' type='text' onChange={e => setConditionDescription(e.target.value)} defaultValue={conditionDescription} />
            </div>
            <div className='listing_option-box'>
              <div>
                {(forsale) ?
                  <input defaultChecked={forsale} className='listing-option' type='checkbox' name='forsale' onChange={e => handleCheckSale()} id='forsale' />
                  :
                  <input className='listing-option' type='checkbox' name='forsale' onChange={e => handleCheckSale()} id='forsale' />
                }
                <label id='list-label'>For Sale</label>
              </div>
              <div>
                {(fortrade) ?
                  <input defaultChecked className='listing-option' type='checkbox' name='fortrade' onChange={e => handleCheckTrade()} id='fortrade' />
                  :
                  <input className='listing-option' type='checkbox' name='fortrade' onChange={e => handleCheckTrade()} id='fortrade' />
                }
                <label id='list-label'>For Trade</label>
              </div>
              <div>
                {(forborrow) ?
                  <input defaultChecked className='listing-option' type='checkbox' name='forborrow' onChange={e => handleCheckBorrow()} id='forborrow' />
                  :
                  <input className='listing-option' type='checkbox' name='forborrow' onChange={e => handleCheckBorrow()} id='forborrow' />
                }
                <label id='list-label'>For Borrow</label>
              </div>
            </div>
            <div className='edit-listing-buttons'>
              <input className='edit_listing_form__submit' type='submit' text='submit' onClick={() => submitEdit()} />
              <button className='edit_listing_form__submit' type='cancel' onClick={hideModal}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
