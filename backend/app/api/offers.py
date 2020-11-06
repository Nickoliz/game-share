from flask import Blueprint, jsonify, request
from app.models import User, BoardGame, Offer, db

offers_routes = Blueprint('offers', __name__)

# Get offer by Game Owner ID (Offers to Game Owner)
@offers_routes.route('/owner')
def get_offer_by_owner_id():
  user_id = request.args.get('id')
  offers = Offer.query.filter(Offer.owner_id == user_id).order_by(Offer.created_at)
  data = [offer.to_dict() for offer in offers]
  return {"offers": data}, 200

@offers_routes.route('/offer')
def get_offer_by_id():
  offer_id = request.args.get('id')
  offer = Offer.query.filter(Offer.id == offer_id).first()
  return {"offer": offer.to_dict()}

# Get offer by User Offering ID (aka Outstanding Offers)
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
    game_id = request.json.get('gameId')
    offer_buy = bool(request.json.get('offerBuy'))
    offer_trade = bool(request.json.get('offerTrade'))
    offer_borrow = bool(request.json.get('offerBorrow'))
    offer = Offer(
      owner_id=owner_id,
      offeree_id=offeree_id,
      game_id=game_id,
      new_offer=True,
      pending_offer=True,
      offer_buy=offer_buy,
      offer_trade=offer_trade,
      offer_borrow=offer_borrow
    )
    db.session.add(offer)
    db.session.commit()
    return {"Message": "Offer successfully added."}, 200
  except:
    return {"Message": sqlalchemy.exc.DataError}, 500

# View offer by Offer ID
@offers_routes.route('/viewoffer', methods=['PATCH'])
def view_offer():
  try:
    offer_id = request.json.get('offerId')
    offer = Offer.query.filter(Offer.id == offer_id).first()
    if (offer.new_offer == True):
      offer.new_offer = False
    db.session.commit()
    return {"Message": "Offer successfully updated."}
  except:
    return {"Message": "Offer unsuccessfully udpated."}

@offers_routes.route('/delete', methods=['DELETE'])
def delete_offer():
  try:
    offer_id = request.args.get('offerId')
    remove = Offer.query.filter(Offer.id == offer_id).delete()
    db.session.commit()
    return {"Message": "Offer deleted successfully."}
  except:
    return {"Message": "Unable to delete offer."}
