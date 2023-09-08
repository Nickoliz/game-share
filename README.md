<p align='center' style='font-weight: 20px'>
  Unfortunately, the API I used for this project is no longer free and the site is not functional due to this.<br>
  I've since decided to stop hosting the site.
</p>
<p align='center'>
  <img align='center' src='./client/public/game-share-logo.png' alt='game-share-logo' />
  <br />
</p>

<br />

<p align='center'>Learn more about the developer <a style='font-weight: bold' href='https://www.nicholaslitz.com'>here</a>.</p>

<hr />
<br />

### Table of Contents
- [Game Share Overview](#game-share-overview)
- [Technologies Overview](#technologies-overview)
- [Front End](./client/)
- [Back End](./backend/)

Game Share Overview
====
Game Share is a web app that was spurred from the idea that board games are expensive and there are only a few ways to play before you pay. Why not have a small e-commerce site that allows users to share their board games with others.

Game Share uses [Board Game Atlas's API] to retrieve information for board games, expansions, and more. This allows Game Share to limit its database to user owned instances of board games reducing the size and complexity of the database.

### Deployed With:
<img align="left" alt="Docker" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/docker/docker.png" />

<br />
<br />

### Front-End:
<img align="left" style='margin-right: 20px' alt="JavaScript" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/javascript/javascript.png" />
<img align="left" style='margin-right: 20px' alt="React" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/react/react.png" />
<img align="left"  style='margin-right: 20px' alt="Redux" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/redux/redux.png" />
<img align="left"  style='margin-right: 20px' alt="Node.js" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/nodejs/nodejs.png" />
<img align="left"  style='margin-right: 20px' alt="HTML5" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/html/html.png" />
<img align="left"  style='margin-right: 20px' alt="CSS3" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/css/css.png" />

<br />
<br />

### Back-End:
<img align="left"  style='margin-right: 20px' alt="python" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/python/python.png" />
<img align="left"  style='margin-right: 20px' alt="flask" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/flask/flask.png" />
<img align="left"  style='margin-right: 20px' alt="postgreSQL" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/postgresql/postgresql.png" />

<br />
<br />
<hr />
<br />
<p align='center'>
  <img src='./client/public/game-share-splash.png' alt='game-share-splash' />
</p>
<br />

Users can expolore board games, sign up, then buy, sell, trade, or borrow board games. The transaction experience is simple in order to maintain an elegant experience through the demo.

## Technologies Overview
### Front-End Technologies
<br />
### React
The front-end is maintained by the React library for it's simplicity and modularity with components. Another major benefit from React is the HTML architecture with JSX. Using JSX interpolation allows for dynamic code and reusability within the app. Here is an example of the game information cards I use on multiple pages.
#### Game Card:

  ```javascript
  return (
    <div className="card-wrapper" onClick={e => handleClick(game.id)}>
      <div className='main-card-game-name'>{game.name.substr(0, 34)}
        <div className='rank-and-more'>Rank: {(game.rank > 500) ? "Not Ranked" : game.rank}</div>
      </div>
      <div className="card">
        <Link className="card-link" style={{ textDecoration: "none", color: "black" }} to={`gamepage/${game.id}`}>
          <img src={game.thumb_url} alt='game-image' style={{ width: '150px', height: '150px' }} />
          <div className='card-game-description' id='card-game-description'>
            <div className="card-information">
              <div className="card-header">
              </div>
            </div>
          </div>
          <div className='main-card-game-info'>
            <div id='main-card-info-box'>Player: {game.min_players} - {game.max_players}</div>
            <div id='main-card-info-box'>Playtime: {game.max_playtime}</div>
            <div style={{ backgroundColor: '#37404A', marginTop: '5px' }}>Rating
            <div>
              {Math.trunc(game.average_user_rating * 2 * 10)} {/*Takes 1-5 scale to 1-100*/}
            </div>
            </div>
          </div>
        </Link>
      </div>
    </div >
  )
  ```
<br />

### Redux
Using Redux, React-Redux, and Redux-Thunk allows for predictable application state management. With Redux-Thunk as a middleware we can easily send and receive responses through the use of dispatching our reducers which are purely functions with fetch calls to the Flask API. The payloads are then sent through the actions onto the Redux store.

When each component or page loads the specific information to the component will be stored in the Redux store. This makes sharing data across components more fluid and reliable. We can better isolate component specific data to the components and share data by using the Redux store.

<br />

### Back-End Technologies
<br />
### Flask
Python and Flask were used to engineer the backend server for the seamless and easy use. With Flask we can easily create a user session which we can call on each page load to confirm a user is logged in and provide any authorization required, for example revising their listing for board games for sale, trade, or borrow.

### PostgreSQL, Alembic, and Alchemy
PostgreSQL relational database was used with Alembic for simple management and migration efforts. Alchemy was used to create and query the database for information. Integrating all of these technologies on the backend made the database predictable, reliable, and manageable.

[Board Game Atlas's API]: https://www.boardgameatlas.com/api/docs/
