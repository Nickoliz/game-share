const GET_COLLECTION_OWNER = '/users/collectionowner'

export const collectionOwner = (owner) => {
  return {
    type: GET_COLLECTION_OWNER,
    owner: owner
  }
}

export const getCollectionOwner = id => {
  return async dispatch => {
    try {
    const res = await fetch(`/api/users/collectionowner?id=${id}`)
    res.data = await res.json();
    if (res.ok) {
      console.log(res.data)
      dispatch(collectionOwner(res.data.owner))
    }
    return res;
  } catch (err) {
    console.warn("Error:", err);
  }
  }
}

export default function userReducer(state = {}, action) {
  switch (action.type) {
    case GET_COLLECTION_OWNER:
      return { owner: action.owner };
    default:
      return state
  }
}
