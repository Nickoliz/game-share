import React from 'react';
// import { getgame } from '../store/games';
// import { useDispatch } from 'react-redux';
// import { Link, useHistory } from 'react-router-dom';
import '../css/searchcardatlas.css';

export default function GameSearch({ game }) {
  console.log(game.name)
  // const history = useHistory();
  // const dispatch = useDispatch();

  return (
    <div className='atlas_search_results_container'>
      <div className='atlas-label'>
        <div className="atlas-listing-size">
          <div className="atlas-listing">
            <h3 id='search-card-title'>{game.name}</h3>
            <div className="atlas-listing-information">
              <div className="atlas-listing-information-header">
                <img src={game.thumb_url} alt={game.id} />
              </div>
            </div>
            <div className='atlas_description'>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
