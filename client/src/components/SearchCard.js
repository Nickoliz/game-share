import React from 'react';
// import { getgame } from '../store/games';
import { useDispatch, useSelector } from 'react-redux';
// import { Link, useHistory } from 'react-router-dom';
import { addGameToSell } from '../store/games';
import '../css/gamecardsmall.css';

export default function GameSearch({ game }) {
  // const history = useHistory();
  const dispatch = useDispatch();
  const currentUserId = useSelector(state => state.auth.id);

  const handleClick = game_id => {
    console.log(game_id)
    dispatch(addGameToSell(currentUserId, game_id))
  }

  return (
    <div className='search_results_container'>
      <div className='games-label'>
        <div className="game-listing-size">
          <div className="game-listing">
            {(!game.forsale) ?
              <>
                < h3 onClick={e => handleClick(game.game_id)} id='search-card-title'>{game.title}</h3>
                <div onClick={e => handleClick(game.game_id)} className="game-listing-information">
                  <div className="game-listing-information-header">
                    <img src={game.thumb_url} alt={game.description} />
                  </div>
                </div>
                <div className='game_description' />
              </>
              :
              // <div id='no-search-results_here'>The game you provided is already listed for sale in your collection.</div>
              <>
                < h3 id='search-card-title'>{game.title}</h3>
                <div className="game-listing-information">
                  <div id='no-search-results-here'>Already Listed</div>
                  <div className="game-listing-information-header">
                    <img src={game.thumb_url} alt={game.description} />
                  </div>
                </div>
                <div className='game_description' />
              </>
            }
          </div>
        </div>
      </div>
    </div >
  )
}
