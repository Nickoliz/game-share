import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGamesByTitleToList } from '../store/games';
import '../css/sellsearchmodal.css';
import SearchCard from './SearchCard';

function SearchModal({ searchTerm }) {
  const currentUserId = useSelector(state => state.auth.id);
  const games = useSelector(state => state.games.gamesByTitle);

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getGamesByTitleToList(currentUserId, searchTerm));
  }, [currentUserId, searchTerm, dispatch]);


  const notLoaded = games && searchTerm.length > 0;

  if (!notLoaded) return null;

  return (
    <div className='search_modal'>
      {
        (games.length > 0) ?
          games.map((game) =>
          <SearchCard game={game} key={game.id} />)
          :
          <div id='no-search-results'>No games matching result. Please add game below.</div>
      }
    </div>
  );
};

export default SearchModal;
