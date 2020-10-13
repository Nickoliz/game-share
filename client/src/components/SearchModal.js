import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGamesByTitleToList } from '../store/games';
import { loadGamesForSearch } from '../store/atlas';
import '../css/sellsearchmodal.css';
import SearchCard from './SearchCard';

function SearchModal({ searchTerm, searchTermCreateGame }) {
  const currentUserId = useSelector(state => state.auth.id);

  const games = useSelector(state => state.games.gamesByTitle);
  const gamesForSearch = useSelector(state => state.atlas.orderByGames);

  console.log(games)

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getGamesByTitleToList(currentUserId, searchTerm));
    dispatch(loadGamesForSearch(searchTermCreateGame))
  }, [currentUserId, searchTerm, dispatch]);


  const notLoaded = games && searchTerm.length > 0;
  // const searchNotLoaded = gamesForSearch && searchTermCreateGame.length > 0;

  // const handleSubmit = async (e) => {
  //   dispatch(getGames(e))
  // }

  if (!notLoaded) return null;
  // if (!searchNotLoaded) return null;

  return (
    <div className='search_modal'>
      {
        (games.length > 0) ?
          games.map((game) =>
            <SearchCard game={game} key={game.id} />)
          :
          <div id='no-search-results'>No games matching result. Please add game below.</div>
      }
      {/* {
        (gamesForSearch.length > 0) ?
          gamesForSearch.map((game) =>
            <SearchCard game={game} key={game.id} />)
          :
          <div id='no-search-results'>No games matching result. Please add game below.</div>
      } */}
    </div>
  );
};

export default SearchModal;
