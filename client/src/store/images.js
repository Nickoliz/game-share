const GET_GAME_IMAGES = 'images/get_game_images';

const {
  atlas: { client_id },
} = require("../config/index");

export const getImages = (images) => {
  return {
    type: GET_GAME_IMAGES,
    images: images
  }
}

export const getGameImages = id => {
  return async dispatch => {
    try {
      const res = await fetch(`https://api.boardgameatlas.com/api/game/images?game_id=${id}&client_id=${client_id}`)
      res.data = await res.json()
      if (res.ok) {
        return dispatch(getImages(res.data.images))
      }
      return res
    } catch (err) {
      return console.warn("Error: ", err)
    }
  }
}

export default function imagesReducer(state = {}, action) {
  switch (action.type) {
    case GET_GAME_IMAGES:
      return { ...state, gameImages: action.images }
    default:
      return state;
  }
}
