const GET_COLLECTION = 'games/get_collection';
const GET_GAMES_FOR_BUY = 'games/get_games_for_buy';
const GET_GAMES_FOR_TRADE = 'games/get_games_for_trade';
const GET_GAMES_FOR_BORROW = 'games/get_games_for_borrow';
const GET_GAMES_BY_TITLE = 'games/get_games_by_title';
const GET_GAME_FOR_OFFER = 'games/get_game_for_offer';
const GET_BORROWED_GAMES = 'games/get_borrowed_games';
const CLEAR_GAMES = 'games/clear_games';


export const getOfferGame = (game) => {
  return {
    type: GET_GAME_FOR_OFFER,
    game: game
  }
}

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

export const getBorrowed = (games) => {
  return {
    type: GET_BORROWED_GAMES,
    games: games
  }
}

export const clear = () => {
  return {
    type: CLEAR_GAMES,
  }
}

export const clearGamesState = () => {
  return async dispatch => {
    return dispatch(clear());
  }
}

export const getOffer = id => {
  return async dispatch => {
    const res = await fetch(`/api/games/offer?id=${id}`, {
      method: 'get'
    });
    res.data = await res.json();
    if (res.ok) {
      dispatch(getOfferGame(res.data.game));
    }
    return res;
  }
}

export const getCollection = id => {
  return async dispatch => {
    const res = await fetch(`/api/games/collection?id=${id}`, {
      method: 'get',
    });
    res.data = await res.json()
    if (res.ok) {
      dispatch(getUserCollection(res.data.games));
    }
    return res;
  }
}

export const getBorrowedGames = id => {
  return async dispatch => {
    const res = await fetch(`/api/games/borrowedgames?id=${id}`)
    res.data = await res.json()
    if (res.ok) {
      dispatch(getBorrowed(res.data.games));
    }
    return res;
  }
}

export const getForBuy = () => {
  return async dispatch => {
    const res = await fetch(`/api/games/forbuy`, {
      method: 'get',
    })
    res.data = await res.json();
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
    return res;
  }
}

export const addGameToCollection = (user_id, game_id, username, title, year_published, thumb_url, msrp, listingPrice, rank, forsale, fortrade, forborrow, gameCondition, conditionDescription) => {
  return async dispatch => {
    try {
      const res = await fetch(`/api/games/add`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id, game_id, username, title, year_published, thumb_url, msrp, listingPrice, rank, forsale, fortrade, forborrow, gameCondition, conditionDescription })
      })
      res.data = await res.json();
      if (res.ok) {
        dispatch(getCollection(user_id));
      }
      return res;
    } catch (err) {
      return { "Message": "Could not add game. Please check your submission and try again." }
    }
  }
}

export const addGameToSell = (user_id, game_id) => {
  return async dispatch => {
    try {
      const res = await fetch(`/api/games/toggleforsale`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id, game_id })
      })
      res.data = await res.json();
      if (res.ok) {
        dispatch(getCollection(user_id))
      }
      return res;
    } catch (err) {
      return { "Message": "Could not patch game for sale." }
    }
  }
}

export const deleteGame = (user_id, game_id) => {
  return async dispatch => {
    try {
      const res = await fetch(`/api/games/remove?game_id=${game_id}`, {
        method: 'DELETE',
      })
      res.data = await res.json();
      if (res.ok) {
        dispatch(getCollection(user_id))
      }
      return res;
    } catch (err) {
      return { "Message": "Count not remove game." }
    }
  }
}

export const updateGame = (user_id, game_id, listingPrice, gameCondition, conditionDescription, forsale, fortrade, forborrow) => {
  return async dispatch => {
    try {
      const res = await fetch(`/api/games/update?game_id=${game_id}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ game_id, listingPrice, gameCondition, conditionDescription, forsale, fortrade, forborrow })
      })
      res.data = await res.json();
      if (res.ok) {
        dispatch(getCollection(user_id));
      }
      return res;
    } catch (err) {
      return { "Message": "Could not update game." }
    }
  }
}

export const changeOwner = (user_id, offeree_id, username, game_id) => {
  return async dispatch => {
    try {
      const res = await fetch(`/api/games/changeowner`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ offeree_id, username, game_id })
      });
      res.data = await res.json();
      if (res.ok) {
        dispatch(getCollection(user_id))
      }
      return res;
    } catch (err) {
      return { "Message": "Could not complete transaction." }
    }
  }
}

export const borrowed = (user_id, offeree_id, game_id) => {
  return async dispatch => {
    const res = await fetch(`/api/games/borrow?id=${game_id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ offeree_id })
    });
    res.data = await res.json();
    if (res.ok) {
      dispatch(getCollection(user_id));
    }
    return res;
  }
}

export const returned = (user_id, game_id) => {
  return async dispatch => {
    const res = await fetch(`/api/games/returned?id=${game_id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
    });
    res.data = await res.json()
    if (res.ok) {
      dispatch(getCollection(user_id))
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
  switch (action.type) {
    case GET_COLLECTION:
      return { ...state, collection: action.games };
    case GET_BORROWED_GAMES:
      return { ...state, borrowedGames: action.games };
    case GET_GAME_FOR_OFFER:
      return { ...state, game: action.game };
    case GET_GAMES_FOR_BUY:
      return { ...state, gamesforbuy: action.games };
    case GET_GAMES_FOR_TRADE:
      return { ...state, gamesfortrade: action.games };
    case GET_GAMES_FOR_BORROW:
      return { ...state, gamesforborrow: action.games };
    case GET_GAMES_BY_TITLE:
      return { ...state, gamesByTitle: action.games };
    case CLEAR_GAMES:
      return {}
    default:
      return state;
  }
}
