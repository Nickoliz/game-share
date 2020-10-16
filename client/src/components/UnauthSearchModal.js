import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadGamesForNavSearch } from '../store/atlas';
import SearchCardAtlasNav from '../components/SearchCardAtlasNav';
import '../css/unauthnavsearch.css';


function UnauthSearchModal({ searchTerm }) {
  const games = useSelector(state => state.atlas.loadNavSearch);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadGamesForNavSearch(searchTerm))
  }, [searchTerm, dispatch]);


  const notLoaded = games && searchTerm.length > 0;

  if (!notLoaded) return null;

  return (
    <>
      {(games.length > 0) ?
        games.map((game) =>
          <SearchCardAtlasNav searchTerm={searchTerm} game={game} key={game.id} />)
        :
        <div id='unauth_no-search-results'>Doesn't seem like that's a game. Create it?</div>
      }
    </>
  );
};

export default UnauthSearchModal;
