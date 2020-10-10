import React from 'react';
import { Link } from 'react-router-dom';
import '../css/dbgamecardsprofile.css';


export default function GameCard({ game }) {

  if (!game) return null

  return (
    <div id={game.id} className="card-wrapper">
      <div className='main-card-game-name'>
        <div id={game.id} className='top_card-name'>{game.title}
          <div className='rank-and-more'>Rank: {(game.rank > 500) ? "Not Ranked" : game.rank}</div>
        </div>
        <i className='fas fa-dice-d20 fa-2x game_dice' style={{ color: '#3881D4', position: 'absolute', marginLeft: '195px' }} />
      </div>
      <div id='profile_game_card-break'></div>
      <div id={game.id} className="card">
        <Link id={game.id}
          className="card-link"
          style={{ textDecoration: "none", color: "black" }}
          // onClick={searchID}
          to={`game/${game.id}`}>
          <img id={game.id}
            src={game.thumb_url}
            alt={game.msrp}
          />
          {(game.forsale || game.fortrade || game.forborrow) ?
            <div id={game.id} className='main-card-game-info'>Listed:
          {(game.forsale) ?
                <div id='main-card-info-box'>For Sale</div>
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
