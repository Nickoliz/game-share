const GET_OFFERS_BY_ID = 'offers/get_offers_by_id';

export const getOffers = (offers) => {
  return {
    type: GET_OFFERS_BY_ID,
    offers: offers
  }
}

export const getOffersByOwnerId = id => {
  return async dispatch => {
    try {
      const res = await fetch(`/api/offers/owner?id=${id}`)
      res.data = await res.json()
      if (res.ok) {
        return dispatch(getOffers(res.data.offers));
      }
      return res
    } catch (err) {
      return console.warn("Error: ", err)
    }
  }
}

export const getOffersByOffereeId = id => {
  return async dispatch => {
    try {
      const res = await fetch(`/api/offers/offeree?id=${id}`)
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

export const buildOffer = (ownerId, offereeId, gameId, offerBuy, offerTrade, offerBorrow) => {
  return async dispatch => {
    try {
      console.log(gameId);
      const res = await fetch(`/api/offers/newoffer`, {
        method: 'post',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ownerId, offereeId, gameId, offerBuy, offerTrade, offerBorrow })
      })
      res.data = await res.json();
      if (res.ok) {
        dispatch(getOffersByOffereeId(offereeId));
      }
      return res;
    } catch (err) {
      return { "Message": "Coult not generate offer." }
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
