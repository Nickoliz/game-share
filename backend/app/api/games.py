from flask import Blueprint, jsonify, request
from app.models import User, BoardGame, Offer, db
import datetime


games_routes = Blueprint('games', __name__)


@games_routes.route('/remove', methods=['DELETE'])
def remove_game():
  try:
    game_id = request.args.get('game_id')
    remove = BoardGame.query.filter(BoardGame.id == game_id).delete()
    db.session.commit()
    return {'Message': "Successfully removed."}
  except:
    return {"Message": "Could not delete game."}

@games_routes.route('/update', methods=['PATCH'])
def update_game():
  try:
    print("!!!!!!!WE HERE!!!!!!!!!!!!!!")
    game_id = request.args.get('game_id')
    list_price = float(request.json.get('listingPrice'))
    game_condition = request.json.get('gameCondition')
    game_description = request.json.get('conditionDescription')
    checked_sale = bool(request.json.get('forsale'))
    checked_trade = bool(request.json.get('fortrade'))
    checked_borrow = bool(request.json.get('forborrow'))

    # update = BoardGame.query.filter(BoardGame.id == game_id).update().values(
    # db.update(boardgames).where(boardgame.id == game_id).values(
    update = BoardGame.query.filter(BoardGame.id == game_id).first()
    update.sale_price = list_price,
    update.condition = game_condition,
    update.condition_description = game_description,
    update.forsale = checked_sale,
    update.fortrade = checked_trade,
    update.forborrow = checked_borrow
    # )
    db.session.commit()
    return {'Message': 'Successfully updated game'}
  except:
    return {'Message': 'Unable to update game.'}

@games_routes.route('/collection')
def get_user_collection():
  user_id = request.args.get('id')
  games = BoardGame.query.filter(BoardGame.user_id == user_id).order_by(BoardGame.title)
  user_info = User.query.filter(User.id == user_id).one()
  data = [game.to_dict() for game in games]
  return {"games": data, "gameOwner": user_info.to_dict()}, 200

@games_routes.route('/offer')
def get_offer_game():
  game_id = request.args.get('id')
  game = BoardGame.query.filter(BoardGame.id == game_id).one()
  return {"game": game.to_dict()}

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

@games_routes.route('/bytitle')
def get_games_by_title():
  # try:
  user_id = request.args.get('id')
  search_term = request.args.get('searchTerm')
  games = BoardGame.query.filter(BoardGame.user_id == user_id, BoardGame.title.startswith(search_term)).limit(4)
  data = [game.to_dict() for game in games]
  return {"games": data}, 200
  # except:
    # return make_response({"msg": "Error. Could not send response."})

@games_routes.route('/add', methods=['POST'])
def add_game_to_collection():
  try:
    userId = request.json.get('user_id')
    gameId = request.json.get('game_id')
    username = request.json.get('username')
    game_title = request.json.get('title')
    year_published = request.json.get('year_published')
    thumb_url = request.json.get('thumb_url')
    rank = request.json.get('rank')
    game_condition = request.json.get('gameCondition')
    game_description = request.json.get('conditionDescription')
    list_price = float(request.json.get('listingPrice'))
    game_msrp = float(request.json.get('msrp'))
    checked_sale = bool(request.json.get('forsale'))
    checked_trade = bool(request.json.get('fortrade'))
    checked_borrow = bool(request.json.get('forborrow'))
    game = BoardGame(
      user_id=userId,
      game_id=gameId,
      username=username,
      title=game_title,
      year_published=year_published,
      thumb_url=thumb_url,
      msrp=game_msrp,
      sale_price=list_price,
      rank=rank,
      forsale=checked_sale,
      fortrade=checked_trade,
      forborrow=checked_borrow,
      condition=game_condition,
      condition_description=game_description,
    )
    db.session.add(game)
    db.session.commit()
    return {"Message": "Games successfully added"}, 200
  except:
    return {"Message": sqlalchemy.exc.DataError}, 500

@games_routes.route('/toggleforsale', methods=['PATCH'])
def toggle_for_sale():
  user_id = request.json.get('user_id')
  game_tag = request.json.get('game_id')
  game = BoardGame.query.filter(BoardGame.user_id == user_id, BoardGame.game_id == game_tag).first()
  if (game.forsale == False):
    game.forsale = True
  db.session.commit()
  return {"Message": "Games successfully listed for sale."}
