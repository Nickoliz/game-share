import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import '../css/dbgamecards.css';
import { clearAtlasState, getGameById } from '../store/atlas';
import { getGameImages } from '../store/images';
import { clearGamesState } from '../store/games';
import { getGameReviews } from '../store/reviews';

export default function GameCard({ game }) {
  const dispatch = useDispatch();

  const handleClick = id => {
    dispatch(clearAtlasState());
    dispatch(clearGamesState());
    dispatch(getGameById(id));
    dispatch(getGameImages(id));
    dispatch(getGameReviews(id));
  }

  if (!game) return null

  return (
    <div className="card-wrapper" onClick={e => handleClick(game.id)}>
      <div className='main-card-game-name'>{game.name.substr(0, 34)}
        <div className='rank-and-more'>Rank: {(game.rank > 500) ? "Not Ranked" : game.rank}</div>
      </div>
      <div className="card">
        <Link className="card-link"
          style={{ textDecoration: "none", color: "black" }}
          to={`gamepage/${game.id}`}>
          <img src={game.thumb_url}
            alt={game.images.small}
          />
          <div className='card-game-description' id='card-game-description'>
            <div className="card-information">
              <div className="card-header">
              </div>
            </div>
            <div id='main-card-publisher'>Publisher: {game.primary_publisher}</div>
            <div id='main-card-designer'>Designer: {game.designers.map((designer, index) =>
              <div id='main-card-designer' key={index}>{designer}</div>
            )}
            </div>
          </div>
          <div className='main-card-game-info'>
            <div id='main-card-info-box'>Player: {game.min_players} - {game.max_players}</div>
            <div id='main-card-info-box'>Playtime: {game.max_playtime}</div>
            <div style={{backgroundColor: '#37404A', marginTop: '5px'}}>Rating
            <div style={{ backgroundColor: '#3881D4', marginTop: '5px', color: 'white', width: '35px', height: '30px', textAlign: 'center', padding: '4px', borderRadius: '4px' }}>{Math.trunc(game.average_user_rating * 2 * 10)}</div>
            </div>
          </div>
        </Link>
      </div>
    </div >
  )
}
