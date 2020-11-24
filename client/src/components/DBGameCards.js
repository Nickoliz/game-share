import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../css/gamecard.css';
import OfferPage from '../pages/OfferPage';
import { getGameById } from '../store/atlas';
import { getGameImages } from '../store/images';
import { getGameReviews } from '../store/reviews';
import { returned } from "../store/games";


export default function GameCard({ game, borrowed, borrowing }) {
  const currentUserId = useSelector(state => state.auth.id);
  const dispatch = useDispatch()

  const toOffer = () => {
    return <OfferPage game={game} />
  }

  const handleClick = id => {
    dispatch(getGameById(id));
    dispatch(getGameImages(id));
    dispatch(getGameReviews(id));
  }

  const returnGame = () => {
    dispatch(returned(currentUserId, game.id))
    window.location.reload();
  }

  if (!game) return null
  if (currentUserId === game.user_id && !borrowed && !borrowing) return null;

  return (
    <>
      <div className="card-wrapper" id={game.id} onClick={e => handleClick(game.game_id)} >
        <div className='main-card-game-name'>{game.title.substr(0, 34)}
          {(game.forsale === true) ?
            <span style={{ fontSize: '14px', backgroundColor: '#37404A', paddingTop: '5px', paddingBottom: '5px' }}>
              Price: ${game.sale_price.toFixed(2)} | Condition: {game.condition}</span>
            :
            null
          }
          {(!borrowed) ?
            <span style={{ fontSize: '14px', backgroundColor: '#37404A', paddingTop: '5px' }}>Owner:
          <Link className='game-card-instance-owner' to={`/profile/${game.user_id}`}> {game.username}</Link>
            </span>
            :
            null
          }
        </div>
        <div id={game.id} className="card">
          <div className='card_game-description' style={{ paddingBottom: '10px', fontSize: '14px', backgroundColor: '#37404A', maxWidth: '300px' }}>
            Description: {game.condition_description}
          </div>
          <Link id={game.id} className="card-link" style={{ textDecoration: "none", color: "black" }} to={`gamepage/${game.game_id}`}>
            <img id={game.id} src={game.thumb_url} alt={game.msrp} style={{ width: '150px', height: '150px' }} />
          </Link>
          {(!borrowed && !borrowing) ?
            <Link exact="true" to={`/offer/${game.username}/${game.id}`}>
              <button onClick={() => toOffer()} type='submit' className='buypage_make-offer'>Make Offer</button>
            </Link>
            :
            null
          }
          {(borrowed) ?
            <div className='edit-listing' style={{ margin: 'auto', marginTop: '10px' }} onClick={() => returnGame()}>Returned</div>
            :
            null
          }
          {(borrowing) ?
            <div className='edit-listing' style={{ margin: 'auto', marginTop: '10px' }} onClick={() => returnGame()}>Return</div>
            :
            null
          }
        </div>
      </div >
    </>
  )
}
