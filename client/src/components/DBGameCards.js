import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import '../css/gamecard.css';
import { getGameById } from '../store/atlas';
import { getGameImages } from '../store/images';
import { getGameReviews } from '../store/reviews';


export default function GameCard({ game }) {
  const dispatch = useDispatch()

  const handleClick = id => {
    dispatch(getGameById(id));
    dispatch(getGameImages(id));
    dispatch(getGameReviews(id));
  }

  if (!game) return null

  return (
    <div className="card-wrapper" id={game.id} onClick={e => handleClick(game.game_id)}>
      <div className='main-card-game-name'>{game.title}
        {(game.forsale === true) ? <span style={{ fontSize: '14px', backgroundColor: '#37404A', paddingTop: '5px', paddingBottom: '5px' }}>Price: ${game.sale_price}</span> : null}
        <span style={{ fontSize: '14px', backgroundColor: '#37404A', paddingTop: '5px', paddingBottom: '5px' }}>Condition: {game.condition}</span>
        <span style={{ fontSize: '14px', backgroundColor: '#37404A', paddingTop: '5px' }}>Owner:
          <Link className='game-card-instance-owner' to={`/profile/${game.user_id}`}> {game.username}</Link>
        </span>
      </div>
      <div id={game.id} className="card">
        <div className='card_game-description' style={{ paddingBottom: '10px', fontSize: '14px', backgroundColor: '#37404A', maxWidth: '300px' }}>Description: {game.condition_description}</div>
        <Link id={game.id}
          className="card-link"
          style={{ textDecoration: "none", color: "black" }}
          to={`gamepage/${game.id}`}>
          <img id={game.id}
            src={game.thumb_url}
            alt={game.msrp}
          />
        </Link>
      </div>
    </div >
  )
}
