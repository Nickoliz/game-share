import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadGamesForSearch } from '../store/atlas';
import '../css/sellsearchmodal.css';
import SearchCardAtlas from './SearchCardAtlas';

function SearchCreateGameModal({ searchTermCreateGame, setSearchTermCreateGame}) {
  const games = useSelector(state => state.atlas.orderByGames);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadGamesForSearch(searchTermCreateGame))
  }, [searchTermCreateGame, dispatch]);

  const handleClick = e => {
    setSearchTermCreateGame('')
  }
  const notLoaded = games && searchTermCreateGame.length > 0;

  if (!notLoaded) return null;

  return (
    <div className='atlas_search_modal'>
      {
        (games.length > 0) ?
          games.map((game) =>
            <SearchCardAtlas onClick={e => handleClick()} searchTerm={searchTermCreateGame} game={game} key={game.id} />)
          :
          <div id='atlas_no-search-results'>No games matching result.</div>
      }
    </div>
  );
};

export default SearchCreateGameModal;
