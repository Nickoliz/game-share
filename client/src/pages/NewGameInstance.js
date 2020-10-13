import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import NavbarNotHome from '../components/NavbarNotHome'
import SearchModal from '../components/SearchModal';
import '../css/newgameinstance.css'



export default function NewGameInstance() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchTermCreateGame, setSearchTermCreateGame] = useState('')
  const currentUserId = useSelector(state => state.auth.id)

  var searchBarMorph = 'game_instance-search-input-inactive'

  const submitGame = (currentUserId) => {


  }

  if (!currentUserId) return <Redirect to='/login' />

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
        </div>
        <div className='or_div'>or</div>
        <div className='add_game_form_container'>
          <div className='add_game_form-box'>
            <form className='add_game_form' action='' method='post'>
              <input className='add_game_form__input' type='text' name='title' autoComplete='off' onChange={e => setSearchTermCreateGame(e.target.value)} placeholder='Search games from database...' />
              {(searchTermCreateGame) ?
                <SearchModal searchTermCreateGame={searchTermCreateGame} />
                :
                null
              }
            </form>
          </div>
        </div>
        <div className='bottom'>

        </div>
      </div>
    </>
  )
}
