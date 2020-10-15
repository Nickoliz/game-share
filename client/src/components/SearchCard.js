import React from 'react';
// import { getgame } from '../store/games';
// import { useDispatch } from 'react-redux';
// import { Link, useHistory } from 'react-router-dom';
import '../css/gamecardsmall.css';

export default function GameSearch({ game }) {
  // const history = useHistory();
  // const dispatch = useDispatch();

  const handleClick = e => {

  }

  return (
    <div className='search_results_container'>
      <div className='games-label'>
        <div className="game-listing-size">
          <div className="game-listing">
            {(!game.forsale) ?
              <>
                < h3 id='search-card-title'>{game.title}</h3>
                <div className="game-listing-information">
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
