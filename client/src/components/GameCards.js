import React from 'react';
import { Link } from 'react-router-dom';
import '../css/dbgamecards.css';


export default function GameCard({ game }) {

  if (!game) return null

  return (
    <div id={game.id} className="card-wrapper">
      <div id={game.id} className='main-card-game-name'>{game.name.substr(0,34)}
        <div className='rank-and-more'>Rank: {(game.rank > 500) ? "Not Ranked" : game.rank}</div>
      </div>
      <div id={game.id} className="card">
        <Link id={game.id}
          className="card-link"
          style={{ textDecoration: "none", color: "black" }}
          // onClick={searchID}
          to={`game/${game.id}`}>
          <img id={game.id}
            src={game.thumb_url}
            alt={game.images.small}
          // alt={game.images.small} onClick={searchID} />
          />
          <div className='card-game-description' id='card-game-description'>
            <div className="card-information">
              <div id={game.id} className="card-header">
                {/* <div className='main-card-game-name'>{game.name}</div> */}
              </div>
            </div>
            <div id='main-card-publisher'>Publisher: {game.primary_publisher}</div>
            <div id='main-card-designer'>Designer: {game.designers.map((designer, index) =>
              <div id='main-card-designer' key={index}>{designer}</div>
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
