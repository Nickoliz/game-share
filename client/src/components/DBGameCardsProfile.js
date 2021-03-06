import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getGameById } from '../store/atlas'
import '../css/dbgamecardsprofile.css';
import { getGameImages } from '../store/images';
import { getGameReviews } from '../store/reviews';
import { deleteGame } from '../store/games';
import { viewOffer, getOfferById } from '../store/offers';
import ListingModal from '../components/ListingModal';
import OfferModal from './OfferModal';


export default function GameCardProfile({ game, ownerOffersList }) {
  const [newOffer, setNewOffer] = useState(null);
  const [offerInfo, setOfferInfo] = useState(null);
  const [offer, setOffer] = useState(null);
  const [offerId, setOfferId] = useState(null);
  const [listingModal, setListingModal] = useState(false);
  const [offerModal, setOfferModal] = useState(false);
  const [borrowed, setBorrowed] = useState(null);

  const currentUserId = useSelector(state => state.auth.id);
  const history = useHistory();
  const dispatch = useDispatch();

  const body = document.getElementById('body-id');

  const handleClick = id => {
    dispatch(getGameById(id));
    dispatch(getGameImages(id));
    dispatch(getGameReviews(id));
    history.push(`/gamepage/${id}`)
  }

  useEffect(() => {
    ownerOffersList.map((g) => {
      if (game.game_id === g.game_id) {
        setOfferInfo(g)
        setOfferId(g.id);
        if (g.new_offer === true) {
          return setNewOffer(true);
        } else if (g.pending_offer === true) {
          return setOffer(true);
        }
      } else {
        return null;
      }
    })
    if (game.borrowed === true) {
      setBorrowed(true);
    }
  }, [ownerOffersList, game.game_id, game.borrowed])


  const handleViewOffer = () => {
    setOfferModal(true);
    window.scrollTo(0,0);
    dispatch(getOfferById(offerId));
    dispatch(viewOffer(currentUserId, offerId));
    body.classList.add('lock-scroll')
  }

  const handleListingModal = () => {
    setListingModal(true);
    window.scrollTo(0,0);
    body.classList.add('lock-scroll')
  }

  const removeGame = (game_id) => {
    dispatch(deleteGame(currentUserId, game_id))
  }

  const hideModal = e => {
    setOfferModal(null);
    setListingModal(null);
    body.classList.remove('lock-scroll')
    window.location.reload();
  }

  if (!game) return null

  return (
    <>
      {(listingModal) ?
        <ListingModal game={game} key={game.id} hideModal={hideModal} />
        :
        null
      }
      {(offerModal) ?
        <OfferModal game={game} key={game.id} offerId={offerId} offerInfo={offerInfo} hideModal={hideModal} />
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
        {(newOffer) ?
          <div onClick={e => handleViewOffer()} style={{ cursor: 'pointer' }} className='card_offer-new'>
            New Offer
            </div>
          :
          null
        }
        <div id='profile_game_card-break'></div>
        <div id={game.id} className="card">
          <div className="card-link">
            <div id={game.id} style={{ backgroundColor: '#37404A', textDecoration: "none", color: "black", curosr: 'pointer' }} onClick={e => handleClick(game.game_id)}>
              <img style={{ cursor: 'pointer' }} id={game.id} src={game.thumb_url} alt={game.msrp} />
            </div>
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
          {(borrowed) ?
            null
            :
            <div className='revision-buttons'>
              {(!game.forsale && !game.fortrade && !game.forborrow) ?
                <div className="edit-listing" onClick={e => handleListingModal()} style={{ marginRight: '10px' }}>List Game</div>
                :
                null
              }
              {((game.forsale || game.fortrade || game.forborrow) && !offer && !newOffer) ?
                <div className="edit-listing" onClick={e => handleListingModal()}>Edit Listing</div>
                :
                null
              }
              {(offer || newOffer) ?
                <div className='view-offer' onClick={() => handleViewOffer()}>View Offer</div>
                :
                <div className='delete-game' onClick={() => removeGame(game.id)}>Remove</div>
              }
            </div>
          }
        </div>
      </div >
    </>
  )
}
