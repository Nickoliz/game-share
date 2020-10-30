import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getGameById } from '../store/atlas'
import '../css/dbgamecardsprofile.css';
import { getGameImages } from '../store/images';
import { getGameReviews } from '../store/reviews';


export default function GameCardProfile({ game, ownerOffersList }) {
  const [offer, setOffer] = useState(null);
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

  console.log(offer);

  if (!game) return null

  return (
    // <div id={game.id} onClick={e => handleClick(game.game_id)} className="card-wrapper">
    <div id={game.id} className="card-wrapper" onClick={e => handleClick(game.game_id)}>
      <div className='main-card-game-name' style={{ cursor: 'pointer' }}>
        <div id={game.id} className='top_card-name' style={{ cursor: 'pointer' }}>{game.title.substring(0, 40)}
          <div className='rank-and-more'>Rank: {(game.rank > 500) ? "Not Ranked" : game.rank}</div>
          {(offer) ?
            <div className='card_offer-new'>
              New Offer
          </div>
            :
            null
          }
        </div>
      </div>
      <div id='profile_game_card-break'></div>
      <div id={game.id} className="card">
        <Link id={game.id}
          className="card-link"
          style={{ textDecoration: "none", color: "black" }}
          // onClick={searchID}
          to={`gamepage/${game.id}`}>
          <img id={game.id}
            src={game.thumb_url}
            alt={game.msrp}
          />
          {(game.forsale || game.fortrade || game.forborrow) ?
            <div id={game.id} className='main-card-game-info'>Listed:
          {(game.forsale) ?
                <div id='main-card-info-box'>For Sale: $<span style={{ backgroundColor: '#37404A' }}>{game.sale_price}</span></div>
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
        </Link>
      </div>
    </div >
  )
}
