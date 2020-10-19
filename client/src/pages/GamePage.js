import React, { useEffect, useState } from 'react';
import NavbarNotHome from '../components/NavbarNotHome';
import { useSelector, useDispatch } from 'react-redux';
import '../css/gamepage.css';
import { getGameById } from '../store/atlas';


export default function GamePage() {
  const [showMoreDesigners, setShowMoreDesigners] = useState(false);
  const dispatch = useDispatch();
  const gameOnState = useSelector(state => state.atlas.game);

  useEffect(() => {
    dispatch(getGameById('TAAifFP590'))
  }, [dispatch])

  const game = [];
  for (let g in gameOnState) {
    game.push(gameOnState[g]);
  }

  const handleDesigners = e => {
    if (showMoreDesigners === false) {
      setShowMoreDesigners(true);
    } else {
      setShowMoreDesigners(false);
    }
  }

  return (
    <>
      <NavbarNotHome />
      {game.map(g =>
        <div className='gamepage_main_container'>
          <div className='gamepage_info_header'>
            <div id='gamepage_image-div'>
              <img id='gamepage_image' src={g.images.large} alt={g.id} />
              <div className='gamepage_info_header-details'>
                <div id='gamepage_game-name'>{g.name} <span id='game_year_published'>({g.year_published})</span></div>
                <div id='gamepage_game-rating'>
                  {
                    Math.trunc(g.average_user_rating * 2 * 10)
                  }
                </div>
                <div id='gamepage_header-details'>Overall Rank: {g.rank}</div>
                <div id='gamepage_header-details'>Trending Rank: {g.trending_rank}</div>
                <div id='gamepage_header-details'>Game Weight: {g.weight_amount} {g.weight_units}</div>
              </div>
            </div>
            <div className='gamepage_header-specs'>
              <div id='gamepage_game-name'>Quick Info:</div>
              <div id='gamepage_specs'>Players: {g.min_players} - {g.max_players}</div>
              <div id='gamepage_specs'>Age: {g.min_playtime} - {g.max_playtime} mins.</div>
              <div id='gamepage_specs'>Age: {g.min_age}+</div>
              <div id='gamepage_specs'>Publisher: {g.primary_publisher}</div>
              <div id='gamepage_specs'>Designer(s): {g.designers[0]}
                <span id='show-more-designers' style={{cursor: 'pointer'}} onClick={e => handleDesigners()}> [+]</span>
                {(showMoreDesigners) ?
                  <li id='more-designers' style={{marginLeft: '10px'}}>{g.designers.map((d, i) => {
                    if (i === 0) {
                      return;
                    } else {
                      return d;
                    }
                  })}</li>
                  :
                  null
                }
              </div>
            </div>
          </div>
          <div className='gamepage_game_information'>
            <h1 id='description-label'>Description</h1>
            <div className='gamepage_long-description'>
              {g.description}
            </div>
          </div>
        </div>
      )
      }
    </>
  )
}
