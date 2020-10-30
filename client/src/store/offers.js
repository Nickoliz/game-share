const GET_OFFERS_BY_ID = 'offers/get_offers_by_id';

export const getOffers = (offers) => {
  return {
    type: GET_OFFERS_BY_ID,
    offers: offers
  }
}

export const getOffersById = id => {
  return async dispatch => {
    try {
      const res = await fetch(`/api/owner?id=${id}`)
      res.data = await res.json()
      if (res.ok) {
        return dispatch(getOffers(res.data.offers))
      }
      return res
    } catch (err) {
      return console.warn("Error: ", err)
    }
  }
}

export default function offerReducer(state = {}, action) {
  switch (action.type) {
    case GET_OFFERS_BY_ID:
      return { ...state, getOffers: action.offers }
    default:
      return state;
  }
}
