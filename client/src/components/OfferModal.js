import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteOffer } from '../store/offers';
import { getUser } from '../store/users';



export default function OfferModal({ game, offerId, offerInfo, hideModal }) {
  const currentUserId = useSelector(state => state.auth.id);
  const offeree = useSelector(state => state.users.user);
  const [buy, setBuy] = useState(null);
  const [trade, setTrade] = useState(null);
  const [borrow, setBorrow] = useState(null);
  const dispatch = useDispatch();

  const decline = () => {
    dispatch(deleteOffer(currentUserId, offerId));
    window.location.reload();
  }

  let username;

  for (let key in offeree) {
    username = offeree.username;
  }

  useEffect(() => {
    dispatch(getUser(offerInfo.offeree_id))
    if (offerInfo.offer_buy === true) {
      setBuy(true);
    } else if (offerInfo.offer_trade === true) {
      setTrade(true);
    } else if (offerInfo.offer_borrow === true) {
      setBorrow(true);
    }
  }, [dispatch, offerInfo])

  if (!offeree) return null;

  return (
    <>
      <div onClick={hideModal} className='edit-listing-overlay'>
        <div className='edit-listing-container'>
          <div className='edit-container-title'>{game.title}</div>
          <br />
          <div className='offer-type'>
            {(buy) ?
              <div style={{marginBottom: '20px', fontSize: '20px'}}>
                {username} wants to buy {game.title} for {game.sale_price}.
              </div>
              :
              null
            }
            {(trade) ?
              <div style={{marginBottom: '20px', fontSize: '20px'}}>
                {username} wants to trade: {game.title} for another game.
              </div>
              :
              null
            }
            {(borrow) ?
              <div style={{marginBottom: '20px', fontSize: '20px'}}>
                {username} wants to borrow {game.title}.
              </div>
              :
              null
            }
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
