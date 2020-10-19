import React from 'react';
import { useDispatch } from 'react-redux';
import { getGameById} from '../store/atlas';
import '../css/searchcardatlas.css';

export default function GameSearch({ game, searchTermCreateGame }) {
  // const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = async (id) => {
    dispatch(getGameById(id));
    searchTermCreateGame = ''
  }



  return (
    <div onClick={e => handleSubmit(game.id)}  className='atlas_search_results_container'>
      <div className="atlas-listing">
        <h3 id='atlas_search-card-title'>{game.name}</h3>
        <div className="atlas-listing-information">
          <div className="atlas-listing-information-header">
            <img src={game.thumb_url} alt={game.id} />
          </div>
        </div>
        <div className='atlas_description'>
        </div>
      </div>
    </div>
  )
}
