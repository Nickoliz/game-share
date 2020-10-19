import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import '../css/gamecard.css';
import { getGameById } from '../store/atlas';


export default function GameCard({ game }) {
  const dispatch = useDispatch()

  const handleClick = id => {
    dispatch(getGameById(id))
  }

  if (!game) return null

  return (
    <div className="card-wrapper" id={game.id} onClick={e => handleClick(game.id)}>
      <div className='main-card-game-name'>{game.title}
        <div className='rank-and-more'>Rank: {(game.rank > 500) ? "Not Ranked" : game.rank}</div>
      </div>
      <div id={game.id} className="card">
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
