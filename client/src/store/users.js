const GET_COLLECTION_OWNER = '/users/collectionowner';
const GET_USER_INFO = '/users/userinfo';

export const collectionOwner = (owner) => {
  return {
    type: GET_COLLECTION_OWNER,
    owner: owner
  }
}

export const returnUser = (user) => {
  return {
    type: GET_USER_INFO,
    user: user
  }
}

export const getCollectionOwner = id => {
  return async dispatch => {
    const res = await fetch(`/api/users/collectionowner?id=${id}`, {
      method: 'get',
    });
    res.data = await res.json()
    if (res.ok) {
      dispatch(collectionOwner(res.data.user));
    }
    return res;
  }
}

export const getUser = id => {
  return async dispatch => {
    const res = await fetch(`/api/users/userinfo?id=${id}`)
    res.data = await res.json()
    if (res.ok) {
      dispatch(returnUser(res.data.user))
    }
    return res;
  }
}

export default function userReducer(state = {}, action) {
  Object.freeze();
  switch (action.type) {
    case GET_COLLECTION_OWNER:
      return {...state, owner: action.owner };
    case GET_USER_INFO:
      return {...state, user: action.user};
    default:
      return state
  }
}
