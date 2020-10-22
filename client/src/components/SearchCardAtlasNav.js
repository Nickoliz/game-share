import React from 'react';
import { useDispatch } from 'react-redux';
import { clearAtlasState, getGameById} from '../store/atlas';
import '../css/searchcardatlas.css';
import { useHistory } from 'react-router-dom';
import { getGameImages } from '../store/images';
import { getGameReviews } from '../store/reviews';

export default function SearchCardAtlasNav({ game }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (id) => {
    dispatch(clearAtlasState())
    dispatch(getGameById(id));
    dispatch(getGameImages(id));
    dispatch(getGameReviews(id));
    history.push(`/gamepage/${game.id}`)
    return () => dispatch(clearAtlasState());
  }

  return (
    <div onClick={e => handleSubmit(game.id)}  className='unauth_search_results_container'>
      <div className="unauth-listing">
        <h3 id='unauth_search-card-title'>{game.name}</h3>
        <div className="unauth-listing-information">
          <div className="unauth-listing-information-header">
            <img src={game.thumb_url} alt={game.id} />
          </div>
        </div>
        <div className='unauth_description'>
        </div>
      </div>
    </div>
  )
}
