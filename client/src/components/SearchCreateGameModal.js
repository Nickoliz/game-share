import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadGamesForSearch } from '../store/atlas';
import '../css/sellsearchmodal.css';
import SearchCardAtlas from './SearchCardAtlas';

function SearchModal({ searchTermCreateGame }) {
  // const currentUserId = useSelector(state => state.auth.id);
  const games = useSelector(state => state.atlas.orderByGames);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadGamesForSearch(searchTermCreateGame))
  }, [searchTermCreateGame, dispatch]);


  const notLoaded = games && searchTermCreateGame.length > 0;


  if (!notLoaded) return null;

  return (
    <div className='atlas_search_modal'>
      {
        (games.length > 0) ?
          games.map((game) =>
            <SearchCardAtlas searchTerm={searchTermCreateGame} game={game} key={game.id} />)
          :
          <div id='no-search-results'>No games matching result.</div>
      }
    </div>
  );
};

export default SearchModal;
