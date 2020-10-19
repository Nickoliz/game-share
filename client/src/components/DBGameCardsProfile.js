import React from 'react';
import { Link, useHistory } from 'react-router-dom';
// import { getGamePage } from '../store/atlas'
import '../css/dbgamecardsprofile.css';


export default function GameCardProfile({ game }) {
  const history = useHistory();

  const handleClick = id => {
    // dispatch(getGamePage(id))
    history.push(`/gamepage/${id}`)
  }


  if (!game) return null

  return (
    // <div id={game.id} onClick={e => handleClick(game.game_id)} className="card-wrapper">
    <div id={game.id} className="card-wrapper" onClick={e => handleClick(game.game_id)}>
      <div className='main-card-game-name' style={{ cursor: 'pointer' }}>
        <div id={game.id} className='top_card-name' style={{ cursor: 'pointer' }}>{game.title}
          <div className='rank-and-more'>Rank: {(game.rank > 500) ? "Not Ranked" : game.rank}</div>
        </div>
        <i className='fas fa-dice-six fa-2x game_dice' style={{ color: '#3881D4', position: 'absolute', marginLeft: '200px', marginTop: '180px', cursor: 'pointer' }} />
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
                <div id='main-card-info-box'>For Sale: $<span style={{backgroundColor: '#37404A'}}>{game.sale_price}</span></div>
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
