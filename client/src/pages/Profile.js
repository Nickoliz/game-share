import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBorrowedGames, getCollection } from '../store/games';
import { getCollectionOwner } from '../store/users';
import { useParams, useHistory } from 'react-router-dom';
import { getOffersByOwnerId } from '../store/offers';
import DBGameCards from '../components/DBGameCards';
import DBGameCardsProfile from '../components/DBGameCardsProfile';
import NavbarNotHome from '../components/NavbarNotHome';
import '../css/navbar.css';
import '../css/profile.css';


export default function Profile() {
  const dispatch = useDispatch();
  const collectionOwner = useSelector(state => state.users.owner);
  const userCollection = useSelector(state => state.games.collection);
  const userBorrowedGames = useSelector(state => state.games.borrowedGames);
  const ownerOffers = useSelector(state => state.offers.getOffers)
  const currentUserId = useSelector(state => state.auth.id);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getCollectionOwner(id));
    dispatch(getCollection(id));
    dispatch(getBorrowedGames(id))
    dispatch(getOffersByOwnerId(id));
  }, [dispatch, id])


  const userCollectionList = [];
  for (let game in userCollection) {
    userCollectionList.push(userCollection[game]);
  }

  let borrowedGames = [];
  let borrowed;
  let gamesForSale = 0;
  let gamesForTrade = 0;
  let gamesForBorrow = 0;
  userCollectionList.map((g) => {
    if (g.forsale === true) return gamesForSale++;
    if (g.fortrade === true) return gamesForTrade++;
    if (g.forborrow === true) return gamesForBorrow++;
    if (g.borrowed === true) {
      borrowedGames.push(g);
      return borrowed = true;
    }
    else return null;
  })

  const userBorrowedGamesList = [];
  for (let game in userBorrowedGames) {
    userBorrowedGamesList.push(userBorrowedGames[game]);
  }

  let borrowing = false;
  userBorrowedGamesList.map((g) => {
    if (g.borrower_id === currentUserId) {
      borrowing = true;
    }
  })


  const ownerOffersList = [];
  for (let offer in ownerOffers) {
    ownerOffersList.push(ownerOffers[offer]);
  }

  let pendingSale = 0;
  let pendingTrade = 0;
  let pendingBorrow = 0;
  ownerOffersList.map((offer) => {
    if (offer.offer_buy === true) return pendingSale++;
    if (offer.offer_trade === true) return pendingTrade++;
    if (offer.offer_borrow === true) return pendingBorrow++;
    else return null
  })


  if (!collectionOwner) return null

  return (
    <>
      <NavbarNotHome />
      {(currentUserId !== collectionOwner.id) ?
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
                  <div onClick={() => history.push(`/offers/${currentUserId}`)} style={{ textDecoration: 'none', cursor: 'pointer' }} id='user_banner-listing-label'>Listings</div>
                  <div id='user_banner-stats-item'>Pending Sales: <span style={{ color: 'white', fontWeight: 'bold', backgroundColor: '#37404A' }}>{pendingSale}</span></div>
                  <div id='user_banner-stats-item'>Pending Trades: <span style={{ color: 'white', fontWeight: 'bold', backgroundColor: '#37404A' }}>{pendingTrade}</span></div>
                  <div id='user_banner-stats-item'>Pending Borrow: <span style={{ color: 'white', fontWeight: 'bold', backgroundColor: '#37404A' }}>{pendingBorrow}</span></div>
                </div>
              </div>
            </div>
            <div className='card-container-wrapper-profile'>
              {userCollectionList.map((game) => <DBGameCards ownerOffersList={ownerOffersList} game={game} key={game.id} />)}
            </div>
          </div>
        </>
        :
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
                  <div style={{ textDecoration: 'none', cursor: 'pointer' }} id='user_banner-listing-label'>Listings</div>
                  <div id='user_banner-stats-item'>Pending Sales: <span style={{ color: 'white', fontWeight: 'bold', backgroundColor: '#37404A' }}>{pendingSale}</span></div>
                  <div id='user_banner-stats-item'>Pending Trades: <span style={{ color: 'white', fontWeight: 'bold', backgroundColor: '#37404A' }}>{pendingTrade}</span></div>
                  <div id='user_banner-stats-item'>Pending Borrow: <span style={{ color: 'white', fontWeight: 'bold', backgroundColor: '#37404A' }}>{pendingBorrow}</span></div>
                </div>
              </div>
            </div>
            <div className='profile-title-wrap'>
              <div className='profile-category-title'>My Collection</div>
            </div>
            <div className='card-container-wrapper-profile'>
              {userCollectionList.map((game) => <DBGameCardsProfile ownerOffersList={ownerOffersList} game={game} key={game.id} />)}
            </div>
            {(borrowed) ?
              <>
                <div className='profile-title-wrap'>
                  <div className='profile-category-title'>Games Being Borrowed</div>
                </div>
                <div className='card-container-wrapper-profile'>
                  {borrowedGames.map((game) => <DBGameCards game={game} key={game.id} borrowed={borrowed} />)}
                </div>
              </>
              :
              null
            }
            {(borrowing) ?
              <>
                <div className='profile-title-wrap'>
                  <div className='profile-category-title'>Games I'm Borrowing</div>
                </div>
                <div className='card-container-wrapper-profile'>
                  {userBorrowedGames.map((game) => <DBGameCards game={game} key={game.id} borrowing={borrowing} />)}
                </div>
              </>
              :
              null}
          </div>
        </>
      }
    </>
  )
}
