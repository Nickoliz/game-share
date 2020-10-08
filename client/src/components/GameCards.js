import React from 'react';
// import { getProject } from '../store/project';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import '../css/gamecard.css';

export default function GameCard(props) {

  // const history = useHistory();

  // function searchID(e) {
  //   e.preventDefault()
  //   let id = e.target.id.trim()
  //   dispatch(getProject(id))
  //   history.push(`/project/${id}`)
  // }

  if (!props.games) return null


  return (
    <div id={props.project.id} className="card-wrapper">
      <div className="card">
        {/* <Link id={props.project.id}
          className="card-link"
          style={{ textDecoration: "none", color: "black" }}
          // onClick={searchID}
          to={`project/${props.project.id}`}>
          <img id={props.project.id}
            src={props.project.pic}
            alt='Project' onClick={searchID} />
        </Link> */}
        <div className="card-information">
          <div className="card-header">
            <h3>{props.project.title}</h3>
            <h2>{props.project.description}</h2>
            <h3>By {props.project.organization}</h3>
          </div>
          <div className="card-footer">
            <div id='projectpage-detail-progress'>
              <div id='progress-container'>
                <div id='progress-container-fill' />
              </div>
            </div>
            <h4 id='pledged'>${props.project.total_funding} pledged</h4>
            <h4>{props.project.days_remaining} days to go</h4>
          </div>
        </div>
      </div>

    </div>
  )
}
