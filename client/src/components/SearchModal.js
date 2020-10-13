import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGamesByTitleToList } from '../store/games';
import '../css/sellsearchmodal.css';
import SearchCard from './SearchCard';
import { useHistory } from 'react-router-dom';
// import { Redirect } from 'react-router-dom';

function SearchModal({ searchTerm }) {
  const currentUserId = useSelector(state => state.auth.id);
  const games = useSelector(state => state.games.gamesByTitle);
  console.log(games)

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getGamesByTitleToList(currentUserId, searchTerm));
  }, [currentUserId, searchTerm, dispatch]);


  // if (!currentUserId) return <Redirect to='/login' />;


  const notLoaded = games && searchTerm.length > 0;

  // const handleSubmit = async (e) => {
  //   dispatch(getGames(e))
  // }

  if (!notLoaded) return null;

  return (
    <div className='search_modal'>
      {/* <div className='games-label'>Games</div> */}
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
