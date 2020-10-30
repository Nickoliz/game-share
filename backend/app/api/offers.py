from flask import Blueprint, jsonify, request
from app.models import User, BoardGame, Offer db

offers_routes = Blueprint('offers', __name__)


@offers_routes.route('/owner/:id')
def get_offer_by_id():
  user_id = request.args.get('id')
  offers = Offer.query.filter(Offer.owner_id == user_id).one()
