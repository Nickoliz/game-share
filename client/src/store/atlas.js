const GET_ORDERBY_GAMES = 'atlas/get_order_by';
const GET_POPULAR_GAMES = 'atlas/get_popular_games';
const GET_REDDIT_GAMES = 'atlas/get_reddit_games';
const GET_GAMES_FOR_ADD_SEARCH = 'atlas/get_games_for_add_search';
const GET_GAME = 'atlas/get_game';
const CLEAR_GAMES = 'atlas/clear_games';

const {
  atlas: { client_id },
} = require("../config/index");


export const getOrderByGames = (games) => {
  return {
    type: GET_ORDERBY_GAMES,
    games: games
  };
};

export const getPopularGames = (games) => {
  return {
    type: GET_POPULAR_GAMES,
    games: games
  };
};

export const getRedditGames = (games) => {
  return {
    type: GET_REDDIT_GAMES,
    games: games
  };
};

export const loadNavSearch = (games) => {
  return {
    type: GET_GAMES_FOR_ADD_SEARCH,
    games: games
  }
}

export const getGame = (game) => {
  return {
    type: GET_GAME,
    game: game
  }
}


export const clear = () => {
  return {
    type: CLEAR_GAMES,
  }
}

// -----------GET GAMES-----------

export const loadOrderByGames = category => {
  return async dispatch => {
    try {
      const res = await fetch(`https://api.boardgameatlas.com/api/search?order_by=${category}&limit=32&client_id=${client_id}`)
      res.data = await res.json();
      if (res.ok) {
        return dispatch(getOrderByGames(res.data.games));
      }
      return res;
    } catch (err) {
      return console.warn("Error: ", err)
    }
  }
}

// -----------SEARCH FOR GAME-----------

export const loadGamesForSearch = searchTerm => {
  return async dispatch => {
    try {
      const res = await fetch(`https://api.boardgameatlas.com/api/search?name=${searchTerm}&limit=8&client_id=${client_id}`)
      res.data = await res.json()
      if (res.ok) {
        return dispatch(getOrderByGames(res.data.games))
      }
      return res;
    } catch (err) {
      return console.warn("Error: ", err)
    }
  }
}

export const loadGamesForNavSearch = searchTerm => {
  return async dispatch => {
    try {
      const res = await fetch(`https://api.boardgameatlas.com/api/search?name=${searchTerm}&limit=8&client_id=${client_id}`)
      res.data = await res.json()
      if (res.ok) {
        return dispatch(loadNavSearch(res.data.games))
      }
      return res;
    } catch (err) {
      return console.warn("Error: ", err)
    }
  }
}


// -----------GET GAME BY ID-----------

export const getGameById = id => {
  return async dispatch => {
    try {
      const res = await fetch(`https://api.boardgameatlas.com/api/search?ids=${id}&client_id=${client_id}`)
      res.data = await res.json()
      if (res.ok) {
        return dispatch(getGame(res.data.games))
      }
      return res
    } catch (err) {
      return console.warn("Error: ", err)
    }
  }

}

// -----------CLEAR REDUX STATE-----------

export const clearAtlasState = () => {
  return async dispatch => {
    return dispatch(clear());
  }
}

// FOR FLASK REQUESTS
// export const loadTrendingGames = () => {
//   return async dispatch => {
//     const res = await fetch('/api/atlas/trending', {
//       method: 'GET',
//     });
//     res.data = await res.json();
//     if (res.ok) {
//       return dispatch(getTrendingGames(res.data.games))
//     }
//     return res
//   }
// }

export default function atlasReducer(state = {}, action) {
  // Object.freeze(state)
  switch (action.type) {
    case GET_ORDERBY_GAMES:
      return { ...state, orderByGames: action.games };
    case GET_GAME:
      return { game: action.game }
    case GET_GAMES_FOR_ADD_SEARCH:
      return { ...state, loadNavSearch: action.games }
    case CLEAR_GAMES:
      return {}
    default:
      return state;
  }
}
