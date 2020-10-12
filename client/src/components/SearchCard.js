import React from 'react';
// import { getgame } from '../store/games';
// import { useDispatch } from 'react-redux';
// import { Link, useHistory } from 'react-router-dom';
import '../css/gamecardsmall.css';

export default function gameSmall(props) {
  // const history = useHistory();
  // const dispatch = useDispatch();

  return (
    <div className="listing-size" >
      <div className="listing">
        <img src={props.game.pic} f alt={props.game.description} />
        <div className="listing-information">
          <div className="listing-information-header">
            <h3  >{props.game.title}</h3>
            <h2  >{props.game.name}</h2>
          </div>
          <div className="spacer-div"></div>
        </div>
      </div>
    </div>
  )
}
