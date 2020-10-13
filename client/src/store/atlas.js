const GET_ORDERBY_GAMES = 'atlas/get_order_by';
const GET_POPULAR_GAMES = 'atlas/get_popular_games'
const GET_REDDIT_GAMES = 'atlas/get_reddit_games'

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


export const loadOrderByGames = category => {
  return async dispatch => {
    try {
      const res = await fetch(`https://api.boardgameatlas.com/api/search?order_by=${category}&limit=30&client_id=${client_id}`)
      res.data = await res.json();
      if (res.ok) {
        return dispatch(getOrderByGames(res.data.games));
      }
      return res;
    } catch (err) {
      console.warn(err)
    }
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
    default:
      return state;
  }
}
