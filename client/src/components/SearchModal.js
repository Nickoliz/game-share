import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGamesByTitleToList } from '../store/games';
import '../css/sellsearchmodal.css';
import SearchCard from './SearchCard';
import { Redirect } from 'react-router-dom';

function SearchModal({ searchTerm }) {
  const currentUser = useSelector(state => state.auth);
  const games = useSelector(state => state.games);

  const [currentUserId, setCurrentUserId] = useState(null)
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getGamesByTitleToList(currentUserId, searchTerm));
  }, [currentUserId, searchTerm, dispatch]);


  if (!currentUserId) {
    return <Redirect to='/login' />;
  } else {
    setCurrentUserId(currentUser.id);
  }


  console.log(games)

  const notLoaded = games.gamesTitle && searchTerm.length > 0;

  // const handleSubmit = async (e) => {
  //   dispatch(getGames(e))
  // }

  if (!notLoaded) return null;

  return (
    <div className='search_modal'>
      <div className="search_modal__container">
        <div className='games-label'>games</div>
        {
          (games.title.length > 0) ?
            games.title.map((game) =>
              <SearchCard key={game.id} />)
            :
            <div id='no-search-results'>No games matching result. Please add game below.</div>
        }
      </div>
    </div>
  );
};

export default SearchModal;
