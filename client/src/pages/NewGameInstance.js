import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import NavbarNotHome from '../components/NavbarNotHome'
import SearchModal from '../components/SearchModal';
import SearchCreateGameModal from '../components/SearchCreateGameModal'
import '../css/newgameinstance.css';



export default function NewGameInstance() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTermCreateGame, setSearchTermCreateGame] = useState('');
  const [gameTitle, setGameTitle] = useState('Title');
  const [gameCondition, setGameCondition] = useState('Condition');
  const [listingPrice, setListingPrice] = useState('Listing Price');
  const [conditionDescription, setConditionDescription] = useState('Condition Description (200 characters)');

  const currentUserId = useSelector(state => state.auth.id);
  const game = useSelector(state => state.atlas.game)

  if (game) {
    console.log(game.map((g) => g.name))
  }

  useEffect(() => {
    if (game) {
      setGameTitle(game.map((g) => g.name))
      setListingPrice(game.map((g) => g.msrp))
    }
  }, [game])


  var searchBarMorph = 'game_instance-search-input-inactive';

  const submitGame = (currentUserId) => {


  };

  const handleListingPrice = e => {
    setListingPrice(e)
  };

  const handleCondition = e => {
    setGameCondition(e);
  };

  const handleDescription = e => {
    setConditionDescription(e)
  };

  if (!currentUserId) return <Redirect to='/login' />;

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
            {(searchTerm) ? searchBarMorph = 'game_instance-search-input-active' : null}
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
              <input className='add_game_form__search' type='text' name='title' autoComplete='off' onChange={e => setSearchTermCreateGame(e.target.value)} placeholder='Search games from database...' />
              {(searchTermCreateGame) ?
                <SearchCreateGameModal searchTermCreateGame={searchTermCreateGame} />
                :
                null
              }
              <form className='add_game_form'>
                <input className='add_game_form-input-title' type='text' autoComplete='off' name='title' placeholder={gameTitle} />
                <div id='add_game_form-break'>
                  {/* <input className='add_game_form-input-else' type='text' name='title' placeholder={(searchTerm) ? game.mrsp : 'Listing Price'} /> */}
                  <input className='add_game_form-input-price' type='text' autoComplete='off' name='listingPrice' onClick={e => handleListingPrice(e.target.value)} placeholder={listingPrice} />
                  <input className='add_game_form-input-condition' type='text' autoComplete='off' name='gameCondition' placeholder={gameCondition} />
                  <div className='condition_select'>
                    <div id='condition_option' onClick={e => handleCondition('New')}>New</div>
                    <div id='condition_option' onClick={e => handleCondition('Used')}>Used</div>
                    <div id='condition_option' onClick={e => handleCondition('Poor')}>Poor</div>
                  </div>
                </div>
                <textarea className='add_game_form-input-description' type='text' name='conditionDescription' onClick={e => handleDescription(e.target.value)} placeholder={conditionDescription} />
                <input className='add_game_form__submit' type='submit' text='submit' onClick={e => submitGame()} />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};
