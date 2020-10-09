const GET_COLLECTION = 'games/GET_COLLECTION';

export const getUserCollection = (collection) => {
  return {
    type: GET_COLLECTION,
    collection
  };
};


export const getCollection = id => {
  return async dispatch => {
    const res = await fetch(`/api/games/collection?id=${id}`, {
      method: 'get',
    })
    if (res.ok) {
      dispatch(getUserCollection(res.data.games));
    }
    return res;
  }
}

// export const getForBuy = () => {
//   return async dispatch => {
//     const res = await fetch(`/api/games/forbuy`)
//   }
// }

export default function gamesReducer(state = {}, action) {
  // Object.freeze(state)
  switch (action.type) {
    case GET_COLLECTION:
      return { ...state, games: action.games };
    default:
      return state;
  }
}
