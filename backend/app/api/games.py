from flask import Blueprint, jsonify, redirect, url_for, session, request
from app.models import User, BoardGames db

games_routes = Blueprint('games', __name__)

@games_routes.route('')
def ():
  if(request.method=='POST'):
    email = request.json.get('email', None)
    password = request.json.get('password', None)

    user = User.query.filter(User.email==email).first()
    user_data = user.to_dict()
    if(user and user.check_password(password)):
      session['user']= user.to_dict()
      return {"user": session['user']}, 200
    else:
      return jsonify({"msg": "Incorrect email or password."}), 400
  elif(request.method=='DELETE'):
    session.pop('user', None)
    return {'msg': 'successfully logged out'}

@games_routes.route('/usercollection')
def get_user_collection():
  user_id = request.json.get('id')
  user = User.query.filter(User.user_id=user_id)
