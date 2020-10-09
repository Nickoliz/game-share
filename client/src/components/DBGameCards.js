import React from 'react';
import { Link } from 'react-router-dom';
import '../css/gamecard.css';


export default function GameCard({ game }) {

  console.log("GETTEING TO CARD")
  if (!game) return null

  return (
    <div id={game.id} className="card-wrapper">
      <div id={game.id} className='main-card-game-name'>{game.title}
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
            alt={game.msrp}
          />
        </Link>
      </div>
    </div >
  )
}
