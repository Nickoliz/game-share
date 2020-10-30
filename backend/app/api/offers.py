from flask import Blueprint, jsonify, request
from app.models import User, BoardGame, Offer, db

offers_routes = Blueprint('offers', __name__)


@offers_routes.route('/owner/:id')
def get_offer_by_id():
  user_id = request.args.get('id')
  offers = Offer.query.filter(Offer.owner_id == user_id).order_by(Offer.created_at)
  data = [offer.to_dict() for offer in offers]
  return {"offers": data}, 200

@offers_routes.route('/offeree/:id')
def get_offer_by_offeree():
  user_id = request.args.get('id')
  offers = Offer.query.filter(Offer.offeree_id == user_id).order_by(Offer.updated_at)
  data = [offer.to_dict() for offer in offers]
  return {"offers": data}, 200

@offers_routes.route('/newoffer', methods=['POST'])
def build_offer():
  try:
    owner_id = request.json.get('ownerId')
    offeree_id = request.json.get('offereeId')
    game_id = request.json.get('game_id')
    offer_buy = bool(request.json.get('offerBuy'))
    offer_trade = bool(request.json.get('offerTrade'))
    offer_borrow = bool(request.json.get('offerBorrow'))
    offer = Offer(
      owner_id=owner_id,
      offeree_id=offeree_id,
      game_id=game_id,
      offer_buy=offer_buy,
      offer_trade=offer_trade,
      offer_borrow=offer_borrow
    )
    db.session.add(offer)
    db.session.commit()
    return {"Message": "Offer successfully added."}, 200
  except:
    return {"Message": sqlalchemy.exc.DataError}, 500
