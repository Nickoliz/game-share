import React , { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCollection } from '../store/games'
import DBGameCardsProfile from '../components/DBGameCardsProfile';
import NavbarNotHome from '../components/NavbarNotHome';
import '../css/navbar.css';


export default function UserProfile() {
  const dispatch = useDispatch();
  const currentUserId = useSelector(state => state.auth.id)
  const userCollection = useSelector(state => state.games.collection);

  useEffect(() => {
    dispatch(getCollection(currentUserId))
  }, [dispatch, currentUserId])

  const userCollectionList = [];
  for (let game in userCollection) {
    userCollectionList.push(userCollection[game]);
  }

  // if (currentUserId !== userProfile)

  return (
    <>
    <NavbarNotHome />
      <div className='profile_main_container'>
      </div>
      <div className='card-container-wrapper'>
        {userCollectionList.map((game) => <DBGameCardsProfile game={game} key={game.id} />)}
      </div>
    </>
  )
}
