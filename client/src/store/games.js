const GET_COLLECTION = 'games/get_collection';
const GET_GAMES_FOR_BUY = 'games/get_games_for_buy';
const GET_GAMES_FOR_TRADE = 'games/get_games_for_trade';
const GET_GAMES_FOR_BORROW = 'games/get_games_for_borrow';
const GET_GAMES_BY_TITLE = 'games/get_games_by_title';

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

export const getGamesByTitle = (games) => {
  return {
    type: GET_GAMES_BY_TITLE,
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
    res.data = await res.json();
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
    res.data = await res.json();
    if (res.ok) {
      dispatch(getGamesForBorrow(res.data.games))
    }
    return res
  }
}

export const getGamesByTitleToList = (id, searchTerm) => {
  return async dispatch => {
    const res = await fetch(`/api/games/bytitle?id=${id}&searchTerm=${searchTerm}`, {
      method: 'get',
    })
    res.data = await res.json();
    if (res.ok) {
      dispatch(getGamesByTitle(res.data.games))
    }
    return res
  }
}

export const addGameToCollection = (user_id, game_id, title, year_published, thumb_url, msrp, listingPrice, rank, forsale, fortrade, forborrow, gameCondition, conditionDescription) => {
  return async dispatch => {
    debugger;
    console.log(user_id, game_id, title, year_published, thumb_url, msrp, listingPrice, rank, forsale, fortrade, forborrow, gameCondition, conditionDescription)
    try {
      debugger;
      const res = await fetch(`/api/games/add`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id, game_id, title, year_published, thumb_url, msrp, listingPrice, rank, forsale, fortrade, forborrow, gameCondition, conditionDescription })
      })
      res.data = await res.json();
      if (res.ok) {
        debugger;
        console.log(res.data)
        dispatch(getCollection(user_id));
      }
    } catch (err) {
      return { "Message": "Could not add game. Please check your submission and try again." }
    }
  }
}

// export const getCollection = id => {
//   return async dispatch => {
//     const res = await fetch(`/api/games/collection?id=${id}`, {
//       method: 'get',
//     })
//     res.data = await res.json()
//     if (res.ok) {
//       dispatch(getUserCollection(res.data.games));
//     }
//     return res;
//   }
// }

export default function gamesReducer(state = {}, action) {
  // Object.freeze(state)
  switch (action.type) {
    case GET_COLLECTION:
      return { ...state, collection: action.games };
    case GET_GAMES_FOR_BUY:
      return { ...state, gamesforbuy: action.games };
    case GET_GAMES_FOR_TRADE:
      return { ...state, gamesfortrade: action.games };
    case GET_GAMES_FOR_BORROW:
      return { ...state, gamesforborrow: action.games };
    case GET_GAMES_BY_TITLE:
      return { ...state, gamesByTitle: action.games };
    default:
      return state;
  }
}
