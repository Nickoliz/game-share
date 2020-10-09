from flask import Blueprint, jsonify, redirect, url_for, session, request
from app.models import User, BoardGame, db

games_routes = Blueprint('games', __name__)

@games_routes.route('/collection')
def get_user_collection():
  user_id = request.args.get('id')
  print(user_id)
  games = BoardGame.query.filter(BoardGame.user_id == user_id)
  data = [game.to_dict() for game in games]
  return {"games": data}, 200

@games_routes.route('/collection/sale')
def get_user_buy():
  user_id = request.json.get('id')
  games = BoardGame.query.filter(BoardGame.user_id == user_id).with_entities(
    BoardGame.forsale == True).all()
  data = [game.to_dict() for game in games]
  return {"games": data}, 200

@games_routes.route('/collection/trade')
def get_user_trade():
  user_id = request.json.get('id')
  games = BoardGame.query.filter(BoardGame.user_id == user_id).with_entities(
    BoardGame.fortrade == True).all()
  data = [game.to_dict() for game in games]
  return {"games": data}, 200

@games_routes.route('/collection/borrow')
def get_user_borrow():
  user_id = request.json.get('id')
  games = BoardGame.query.filter(BoardGame.user_id == user_id).with_entities(
    BoardGame.forborrow == True).all()
  data = [game.to_dict() for game in games]
  return {"games": data}, 200

@games_routes.route('/forbuy')
def get_games_for_buy():
  games = BoardGame.query.filter(BoardGame.forsale == True).all()
  data = [game.to_dict() for game in games]
  return {"games": data}, 200

@games_routes.route('/fortrade')
def get_games_for_trade():
  games = BoardGame.query.filter(BoardGame.fortrade == True).all()
  data = [game.to_dict() for game in games]
  return {"games": data}, 200

@games_routes.route('/forborrow')
def get_games_for_borrow():
  games = BoardGame.query.filter(BoardGame.forborrow == True).all()
  data = [game.to_dict() for game in games]
  return {"games": data}, 200
