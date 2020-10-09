const GET_COLLECTION = 'games/get_collection';
const GET_GAMES_FOR_BUY = 'games/get_games_for_buy';
const GET_GAMES_FOR_TRADE = 'games/get_games_for_trade';
const GET_GAMES_FOR_BORROW = 'games/get_games_for_borrow';

export const getUserCollection = (games) => {
  return {
    type: GET_COLLECTION,
    games: games
  };
};

export const getGamesForBuy = (games) => {
  return {
    type: GET_GAMES_FOR_BUY,
    games: games
  }
}

export const getGamesForTrade = (games) => {
  return {
    type: GET_GAMES_FOR_TRADE,
    games: games
  }
}

export const getGamesForBorrow = (games) => {
  return {
    type: GET_GAMES_FOR_BORROW,
    games: games
  }
}


export const getCollection = id => {
  return async dispatch => {
    const res = await fetch(`/api/games/collection?id=${id}`, {
      method: 'get',
    })
    res.data = await res.json()
    if (res.ok) {
      dispatch(getUserCollection(res.data.games));
    }
    return res;
  }
}

export const getForBuy = () => {
  return async dispatch => {
    const res = await fetch(`/api/games/forbuy`, {
      method: 'get',
    })
    res.data = await res.json()
    if (res.ok) {
      console.log(res.data.games)
      dispatch(getGamesForBuy(res.data.games))
    }
    return res
  }
}

export const getForTrade = () => {
  return async dispatch => {
    const res = await fetch(`/api/games/fortrade`, {
      method: 'get',
    })
    res.data = await res.json()
    if (res.ok) {
      dispatch(getGamesForTrade(res.data.games))
    }
    return res
  }
}

export const getForBorrow = () => {
  return async dispatch => {
    const res = await fetch(`/api/games/forborrow`, {
      method: 'get',
    })
    res.data = await res.json()
    if (res.ok) {
      dispatch(getGamesForBorrow(res.data.games))
    }
    return res
  }
}

export default function gamesReducer(state = {}, action) {
  // Object.freeze(state)
  switch (action.type) {
    case GET_COLLECTION:
      return { ...state, collection: action.games };
    case GET_GAMES_FOR_BUY:
      return {...state, gamesforbuy: action.games};
    case GET_GAMES_FOR_TRADE:
      return {...state, gamesfortrade: action.games};
    case GET_GAMES_FOR_BORROW:
      return {...state, gamesforborrow: action.games};
    default:
      return state;
  }
}
