import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteOffer } from '../store/offers';



export default function OfferModal({ game, offerId, hideModal }) {
  const currentUserId = useSelector(state => state.auth.id);
  const offer = useSelector(state => state.offers.offer);
  const dispatch = useDispatch();

  const decline = () => {
    dispatch(deleteOffer(currentUserId, offerId));
    window.location.reload();
  }

  console.log(offer);

  return (
    <>
      <div onClick={hideModal} className='edit-listing-overlay'>
        <div className='edit-listing-container'>
          <div className='edit-container-title'>{game.title}</div>
          <br />
          <div className='offer-type'>
          </div>
          <div className='edit-listing-buttons'>
            <button className='edit_listing_form__submit'>Accept</button>
            <button className='edit_listing_form__submit' type='cancel' onClick={() => decline()}>Decline</button>
          </div>
        </div>
      </div>
    </>
  )
}
