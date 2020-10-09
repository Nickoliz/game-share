from flask import Blueprint, jsonify, redirect, url_for, session, request
from app.models import User, BoardGame, db

games_routes = Blueprint('games', __name__)

@games_routes.route('/collection')
def get_user_collection():
  user_id = request.json.get('id')
  games = BoardGame.query.filter(BoardGame.user_id == user_id)
  data = [game.to_dict() for game in games]
  return {"games": data}, 200

# @games_routes.route('/forbuy')
