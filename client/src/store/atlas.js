const GET_TRENDING_GAMES = 'atlas/GET_TRENDING_GAMES';

const {
  atlas: { client_id },
} = require("../config/index");


export const getTrendingGames = (games) => {
  return {
    type: GET_TRENDING_GAMES,
    trendingGames: games
  };
};


export const trendingGames = async () => {
  return async dispatch => {
    try {
      const res = await fetch(`https://api.boardgameatlas.com/api/search?trending=true&pretty=true&limit=30&client_id=${client_id}`)
      const data = await data.json();
      if (res.ok) {
        return dispatch(getTrendingGames(res.data.games));
      }
      return res;
    } catch (err) {
      console.warn(err)
    }
  }
}

export default function gamesReducer(state = {}, action) {
  // Object.freeze(state)
  switch (action.type) {
    case GET_TRENDING_GAMES:
      return { ...state, trendingGames: action.games };
    default:
      return state;
  }
}
