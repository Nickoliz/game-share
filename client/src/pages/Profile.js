import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCollection } from '../store/games';
import { getCollectionOwner } from '../store/users';
import { useParams } from 'react-router-dom';
import DBGameCardsProfile from '../components/DBGameCardsProfile';
import NavbarNotHome from '../components/NavbarNotHome';
import '../css/navbar.css';
import '../css/profile.css';


export default function Profile() {
  const dispatch = useDispatch();
  // const currentUser = useSelector(state => state.auth)
  const collectionOwner = useSelector(state => state.users.owner);
  const userCollection = useSelector(state => state.games.collection);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getCollectionOwner(id));
    dispatch(getCollection(id));
    // dispatch(getCollection(profileUser));
  }, [dispatch, id])



  const userCollectionList = [];
  for (let game in userCollection) {
    userCollectionList.push(userCollection[game]);
  }

  let gamesForSale = 0;
  let gamesForTrade = 0;
  let gamesForBorrow = 0;
  userCollectionList.map((g) => {
    if (g.forsale === true) return gamesForSale += 1;
    if (g.fortrade === true) return gamesForTrade += 1;
    if (g.forborrow === true) return gamesForBorrow += 1;
    else return null;
  })

  if (!collectionOwner) return null

  return (
    <>
      <NavbarNotHome />
      {/* {(currentUserId !== collectionOwner.id) ?
        <>
          <div className='profile_main_container'>
          </div>
          <div className='card-container-wrapper'>
            {userCollectionList.map((game) => <DBGameCards game={game} key={game.id} />)}
          </div>
        </>
        : */}
      <>
        <div className='profile_main_container'>
          <div className='user_banner_container'>
            <div id='user_banner-picture'>
              <div className='user_banner-username'>{collectionOwner.username}</div>
              <img className='user_banner-picture-image' src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.iconsdb.com%2Ficons%2Fpreview%2Fcaribbean-blue%2Fdice-xxl.png&f=1&nofb=1' alt='dice' />
            </div>
            <div className='user_banner-stats'>
              <div>
                <div id='user_banner-stats-label'>Games</div>
                <div id='user_banner-stats-item'>Total: <span style={{ color: 'white', fontWeight: 'bold', backgroundColor: '#37404A' }}>{userCollectionList.length}</span></div>
                <div id='user_banner-stats-item'>For Sale: <span style={{ color: 'white', fontWeight: 'bold', backgroundColor: '#37404A' }}>{gamesForSale}</span></div>
                <div id='user_banner-stats-item'>For Trade: <span style={{ color: 'white', fontWeight: 'bold', backgroundColor: '#37404A' }}>{gamesForTrade}</span></div>
                <div id='user_banner-stats-item'>For Borrow: <span style={{ color: 'white', fontWeight: 'bold', backgroundColor: '#37404A' }}>{gamesForBorrow}</span></div>
              </div>
            </div>
            <div className='user_banner-listing-offers'>
              <div>
                <div id='user_banner-listing-label'>Listings</div>
                <div id='user_banner-stats-item'>Pending Sales: <span style={{ color: 'white', fontWeight: 'bold', backgroundColor: '#37404A' }}>0</span></div>
                <div id='user_banner-stats-item'>Pending Trades: <span style={{ color: 'white', fontWeight: 'bold', backgroundColor: '#37404A' }}>0</span></div>
                <div id='user_banner-stats-item'>Pending Borrow: <span style={{ color: 'white', fontWeight: 'bold', backgroundColor: '#37404A' }}>0</span></div>
              </div>
            </div>
          </div>
          <div className='card-container-wrapper-profile'>
            {userCollectionList.map((game) => <DBGameCardsProfile game={game} key={game.id} />)}
          </div>
        </div>
      </>
      {/* } */}
    </>
  )
}
