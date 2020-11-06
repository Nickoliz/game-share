const GET_OFFERS_BY_OWNER_ID = 'offers/get_offers_by_owner_id';
const GET_OFFERS_BY_ID = 'offers/get_offers_by_id';

export const getOffers = (offers) => {
  return {
    type: GET_OFFERS_BY_OWNER_ID,
    offers: offers
  }
}

export const getOffer = (offer) => {
  return {
    type: GET_OFFERS_BY_ID,
    offer: offer
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

export const getOfferById = id => {
  return async dispatch => {
    try {
      const res = await fetch(`/api/offers/offer?id=${id}`)
      res.data = await res.json()
      if (res.ok) {
        console.log(res.data.offer);
        return dispatch(getOffers(res.data.offer));
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


export const viewOffer = (userId, offerId) => {
  return async dispatch => {
    try {
      const res = await fetch(`/api/offers/viewoffer`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ offerId })
      })
      res.data = await res.json()
      if (res.ok) {
        dispatch(getOffersByOwnerId(userId))
      }
      return res;
    } catch (err) {
      return { "Message": "Could not update offer." }
    }
  }
}

export const deleteOffer = (userId, offerId) => {
  return async dispatch => {
    try {
      const res = await fetch(`/api/offers/delete?offerId=${offerId}`, {
        method: "DELETE",
      })
      res.data = await res.json();
      if (res.ok) {
        dispatch(getOffersByOwnerId(userId))
      }
      return res;
    } catch (err) {
      return { "Message": "Unable to delete offer." }
    }
  }
}

export default function offerReducer(state = {}, action) {
  switch (action.type) {
    case GET_OFFERS_BY_OWNER_ID:
      return { ...state, getOffers: action.offers }
    case GET_OFFERS_BY_ID:
      return {...state, offer: action.offer }
    default:
      return state;
  }
}
