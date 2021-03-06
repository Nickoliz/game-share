import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import NavbarNotHome from '../components/NavbarNotHome'
import { addGameToCollection } from '../store/games';
import SearchCreateGameModal from '../components/SearchCreateGameModal'
import '../css/newgameinstance.css';
import { clearAtlasState } from '../store/atlas';


export default function NewGameInstance() {
  const [searchTermCreateGame, setSearchTermCreateGame] = useState(null);
  const [gameTitle, setGameTitle] = useState('Title');
  const [gameId, setGameId] = useState(null);
  const [gameCondition, setGameCondition] = useState('Condition');
  const [listingPrice, setListingPrice] = useState('Listing Price');
  const [conditionDescription, setConditionDescription] = useState('Condition Description (200 characters)');
  const [year_published, setYearPublished] = useState(null);
  const [thumb_url, setThumbUrl] = useState(null);
  const [msrp, setMSRP] = useState(null);
  const [rank, setRank] = useState(null);
  const [forsale, setForSale] = useState(false);
  const [fortrade, setForTrade] = useState(false);
  const [forborrow, setForBorrow] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const currentUser = useSelector(state => state.auth);
  const game = useSelector(state => state.atlas.game);

  let inputDiv = 'add_game_form__search';


  useEffect(() => {
    dispatch(clearAtlasState());
    if (game) {
      game.map((g) => {
        return (
          setGameTitle(g.name),
          setGameId(g.id),
          setYearPublished(g.year_published),
          setThumbUrl(g.thumb_url),
          setMSRP(g.msrp),
          setRank(g.rank)
        )
      })
    }
  }, [dispatch, game])

  var conditionDescriptionClass = 'add_game_form-input-description';

  const submitGame = e => {
    if (conditionDescription.length <= 200) {
      setGameTitle('Title')
      dispatch(addGameToCollection(
        currentUser.id,
        gameId,
        currentUser.username,
        gameTitle,
        year_published,
        thumb_url,
        msrp,
        listingPrice,
        rank,
        forsale,
        fortrade,
        forborrow,
        gameCondition,
        conditionDescription,
      ));
    } else {
      setConditionDescription("Your description must be 200 characters or less.");
      return conditionDescriptionClass = 'add_game_form-input-description--bad'
    }
    return history.push(`/profile/${currentUser.id}`);
  };

  if (searchTermCreateGame !== null) {
    inputDiv = 'add_game_form__search__active'
  } else {
    inputDiv = 'add_game_form__search'
  }

  const handleCondition = e => {
    setGameCondition(e);
  };

  const handleCheckSale = () => {
    if (forsale === false) {
      return setForSale(true);
    } else {
      return setForSale(false)
    }
  }

  const handleCheckTrade = () => {
    if (fortrade === false) {
      return setForTrade(true);
    } else {
      return setForTrade(false);
    }
  }

  const handleCheckBorrow = () => {
    if (forborrow === false) {
      return setForBorrow(true);
    } else {
      return setForBorrow(false);
    }
  }

  const clearSearch = () => {
    setSearchTermCreateGame(null);
  }

  if (!currentUser.id) return <Redirect to='/login' />;

  return (
    <>
      <NavbarNotHome />
      <div className='game_instance_container' onClick={e => clearSearch()}>
        <div className='game_instance-add-from-collection'>
          <div className='game_instance-add-from-atlas__label'>search for a game you own to add or list</div>
          <div className='add_game_form_container'>
            <div className='add_game_form-box'>
              <input className={inputDiv} type='text' name='title' autoComplete='off' onChange={e => setSearchTermCreateGame(e.target.value)} placeholder='Search games from database...' />
              {(searchTermCreateGame) ?
                <SearchCreateGameModal searchTermCreateGame={searchTermCreateGame} setSearchTermCreateGame={setSearchTermCreateGame} />
                :
                null
              }
              <form className='add_game_form'>
                <input className='add_game_form-input-title' type='text' autoComplete='off' name='title' placeholder={gameTitle} />
                <div id='add_game_form-break'>
                  <input className='add_game_form-input-price' type='text' autoComplete='off' name='listingPrice' onChange={e => setListingPrice(e.target.value)} placeholder={listingPrice} />
                  <div className='add_game_form-input-condition'>{gameCondition}
                    <div className='condition_select'>
                      <div id='condition_option' onClick={e => handleCondition('New')}>New</div>
                      <div id='condition_option' onClick={e => handleCondition('Used')}>Used</div>
                      <div id='condition_option' onClick={e => handleCondition('Poor')}>Poor</div>
                    </div>
                  </div>
                </div>
                <textarea className={conditionDescriptionClass} type='text' name='conditionDescription' onChange={e => setConditionDescription(e.target.value)} placeholder={conditionDescription} />
                <div className='listing_option-box'>
                  <div>
                    <input className='listing-option' type='checkbox' name='forsale' value='true' onChange={e => handleCheckSale()} id='forsale' />
                    <label id='list-label'>For Sale</label>
                  </div>
                  <div>
                    <input className='listing-option' type='checkbox' name='fortrade' value='true' onChange={e => handleCheckTrade()} id='fortrade' />
                    <label id='list-label'>For Trade</label>
                  </div>
                  <div>
                    <input className='listing-option' type='checkbox' name='forborrow' value='true' onChange={e => handleCheckBorrow()} id='forborrow' />
                    <label id='list-label'>For Borrow</label>
                  </div>
                </div>
                <input className='add_game_form__submit' type='submit' text='submit' onClick={e => submitGame()} />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};
