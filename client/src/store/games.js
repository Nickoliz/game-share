const SET_COLLECTION = 'games/SET_COLLECTION';

export const getCollection = (user) => {
  return {
    type: SET_COLLECTION,
    collection
  };
};


export const getCollection = id => {
  return async dispatch => {
    const res = await fetch(`/api/games/collection?id=${id}`, {
      method: 'get',
    })
    if (res.ok) {
      dispatch(getCollection(res.data.games))
    }
    return res;
  }
}

export default function gamesReducer(state = {}, action) {
  // Object.freeze(state)
  switch (action.type) {
    case SET_COLLECTION:
      return { ...state, games: action.games };
    case LOGOUT_USER:
      return {};
    default:
      return state;
  }
}
