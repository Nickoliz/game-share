const GET_COLLECTION_OWNER = '/users/collectionowner'

export const collectionOwner = (owner) => {
  return {
    type: GET_COLLECTION_OWNER,
    owner: owner
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

export default function userReducer(state = {}, action) {
  Object.freeze();
  switch (action.type) {
    case GET_COLLECTION_OWNER:
      return {...state, owner: action.owner };
    default:
      return state
  }
}
