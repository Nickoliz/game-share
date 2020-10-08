import React from 'react';
// import { getProject } from '../store/project';
import { Link, useHistory } from 'react-router-dom';
import '../css/gamecard.css';


export default function GameCard({ game }) {

  // const history = useHistory();

  // function searchID(e) {
  //   e.preventDefault()
  //   let id = e.target.id.trim()
  //   dispatch(getProject(id))
  //   history.push(`/atlas/${id}`)
  // }

  // console.log(game.designers.map(designer => designer))

  if (!game) return null


  return (
    <div id={game.id} className="card-wrapper">
      <div className="card">
        <Link id={game.id}
          className="card-link"
          style={{ textDecoration: "none", color: "black" }}
          // onClick={searchID}
          to={`game/${game.id}`}>
          <img id={game.id}
            src={game.thumb_url}
          // alt={game.images.small} onClick={searchID} />
          />
          <h2>Rank: {game.rank}
            <div className="card-information">
              <div className="card-header">
                <h3>{game.name}</h3>
                <h2>Publisher: {game.primary_publisher}</h2>
                <h3>Designer: {game.designers}</h3>
              </div>
            </div>
          </h2>
        </Link>
      </div>
    </div>
  )
}
