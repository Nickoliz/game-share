import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import NavbarNotHome from '../components/NavbarNotHome'
import SearchModal from '../components/SearchModal';
import { addGameToCollection } from '../store/games';
import SearchCreateGameModal from '../components/SearchCreateGameModal'
import '../css/newgameinstance.css';



export default function NewGameInstance() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTermCreateGame, setSearchTermCreateGame] = useState('');
  const [gameTitle, setGameTitle] = useState('Title');
  const [gameId, setGameId] = useState(null);
  const [gameCondition, setGameCondition] = useState('Condition');
  const [listingPrice, setListingPrice] = useState('Listing Price');
  const [conditionDescription, setConditionDescription] = useState('Condition Description (200 characters)');
  const [year_published, setYearPublished] = useState(null)
  const [thumb_url, setThumbUrl] = useState(null)
  const [msrp, setMSRP] = useState(null)
  const [rank, setRank] = useState(null)
  const [forsale, setForSale] = useState(false)
  const [fortrade, setForTrade] = useState(false)
  const [forborrow, setForBorrow] = useState(false)
  const dispatch = useDispatch()

  const currentUserId = useSelector(state => state.auth.id);
  const game = useSelector(state => state.atlas.game)

  useEffect(() => {
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
  }, [game])


  var searchBarMorph = 'game_instance-search-input-inactive-collection';
  var searchBarMorphCreate = 'game_instance-search-input-inactive';

  const submitGame = e => {
    dispatch(addGameToCollection(
      currentUserId,
      gameId,
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
  };


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

  if (!currentUserId) return <Redirect to='/login' />;
  if (searchTerm) {
    searchBarMorph = 'game_instance-search-input-active-collection'
  }
  if (searchTermCreateGame) {
    searchBarMorphCreate = 'game_instance-search-input-active'
  }

  return (
    <>
      <NavbarNotHome />
      <div className='game_instance_container'>
        <div className='game_instance-add-from-collection'>
          <div className='game_instance-add-from-collection__label'>sell a game from your collection</div>
          <div className='game_instance-search-bar'>
            {/* <div id='game_instance-search-icon'>
              <i className='fas fa-search' />
            </div> */}
            {/* {(searchTerm) ? searchBarMorph = 'game_instance-search-input-active' : null} */}
            <input id={searchBarMorph} autoComplete='off' type='text' onChange={e => setSearchTerm(e.target.value)} placeholder='Search games from your collection...' />
            {(searchTerm) ?
              <SearchModal searchTerm={searchTerm} />
              :
              null
            }
          </div>
          <div className='or_div'>or</div>
          <div className='game_instance-add-from-atlas__label'>search for a game you own to list</div>
          <div className='add_game_form_container'>
            <div className='add_game_form-box'>
              <input className='add_game_form__search' id={searchBarMorphCreate} type='text' name='title' autoComplete='off' onChange={e => setSearchTermCreateGame(e.target.value)} placeholder='Search games from database...' />
              {(searchTermCreateGame) ?
                <SearchCreateGameModal searchTermCreateGame={searchTermCreateGame} />
                :
                null
              }
              <form className='add_game_form'>
                <input className='add_game_form-input-title' type='text' autoComplete='off' name='title' placeholder={gameTitle} />
                <div id='add_game_form-break'>
                  <input className='add_game_form-input-price' type='text' autoComplete='off' name='listingPrice' onChange={e => setListingPrice(e.target.value)} placeholder={listingPrice} />
                  <input disabled className='add_game_form-input-condition' type='text' autoComplete='off' name='gameCondition' placeholder={gameCondition} />
                  <div className='condition_select' placeholder='Listing Options'>
                    <div id='condition_option' onClick={e => handleCondition('New')}>New</div>
                    <div id='condition_option' onClick={e => handleCondition('Used')}>Used</div>
                    <div id='condition_option' onClick={e => handleCondition('Poor')}>Poor</div>
                  </div>
                </div>
                <textarea className='add_game_form-input-description' type='text' name='conditionDescription' onChange={e => setConditionDescription(e.target.value)} placeholder={conditionDescription} />
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
