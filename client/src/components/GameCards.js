import React, { useState } from 'react';
// import { getProject } from '../store/project';
import { Link, useHistory } from 'react-router-dom';
import '../css/gamecard.css';


export default function GameCard({ game }) {
  // const [container, setContainer] = useState('')

  // const history = useHistory();

  // function searchID(e) {
  //   e.preventDefault()
  //   let id = e.target.id.trim()
  //   dispatch(getProject(id))
  //   history.push(`/atlas/${id}`)
  // }


  // const stickContainer = () => {
  //   if (window.pageYOffset >= 230) {
  //     setContainer('sticky');
  //   } else {
  //     setContainer('');
  //   }
  // }

  // window.onscroll = function() {stickContainer()}


  if (!game) return null

  return (
    <div id={game.id} className="card-wrapper">
      <div id={game.id} className='main-card-game-name'>{game.name}
        <div id={game.id} className='rank-and-more'>Rank: {game.rank}</div>
      </div>
      <div id={game.id} className="card">
        <Link id={game.id}
          className="card-link"
          style={{ textDecoration: "none", color: "black" }}
          // onClick={searchID}
          to={`game/${game.id}`}>
          <img id={game.id}
            src={game.thumb_url}
          // alt={game.images.small} onClick={searchID} />
          />
          <div id={game.id} className='card-game-description' id='card-game-description'>
            <div id={game.id} className="card-information">
              <div id={game.id} className="card-header">
                {/* <div className='main-card-game-name'>{game.name}</div> */}
              </div>
            </div>
            <div id='main-card-publisher'>Publisher: {game.primary_publisher}</div>
            <div id='main-card-designer'>Designer: {game.designers.map((designer) =>
              <div id='main-card-designer'>{designer}</div>
            )}
            </div>
          </div>
          <div id={game.id} className='main-card-game-info'>
            <div id='main-card-info-box'>test1</div>
            <div id='main-card-info-box'>TestTWO</div>
          </div>
        </Link>
      </div>
    </div >
  )
}
