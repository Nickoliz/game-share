const GET_GAME_REVIEWS = 'reviews/get_game_reviews';

const {
  atlas: { client_id },
} = require("../config/index");

export const getReviews = (reviews) => {
  return {
    type: GET_GAME_REVIEWS,
    reviews: reviews
  }
}

export const getGameReviews = id => {
  return async dispatch => {
    try {
      const res = await fetch(`https://api.boardgameatlas.com/api/reviews?description_required=true&game_id=${id}&client_id=${client_id}`)
      res.data = await res.json()
      if (res.ok) {
        return dispatch(getReviews(res.data.reviews))
      }
      return res
    } catch (err) {
      return console.warn("Error: ", err)
    }
  }
}

export default function reviewsReducer(state = {}, action) {
  switch (action.type) {
    case GET_GAME_REVIEWS:
      return { ...state, gameReviews: action.reviews }
    default:
      return state;
  }
}
