import React, { useState } from 'react';
import NavbarNotHome from '../components/NavbarNotHome'
import SearchModal from '../components/SearchModal';
import '../css/newgameinstance.css'

export default function NewGameInstance() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <>
      <NavbarNotHome />
      <div className='game_instance_container'>
        <div className='game_instance-add-from-collection'>
          <div className='game_instance-search-bar'>
            {/* <div id='game_instance-search-icon'>
              <i className='fas fa-search' />
            </div> */}
            <input id='game_instance-search-input' type='text' onChange={e => setSearchTerm(e.target.value)} placeholder='Search games from your collection...' />
              {(searchTerm) ?
                <SearchModal searchTerm={searchTerm} />
                :
                null
              }
          </div>
        </div>
        <div className='seperator'>
          <div className='seperator_box'>

          </div>
        </div>
        <div className='bottom'>

        </div>
      </div>
    </>
  )
}
