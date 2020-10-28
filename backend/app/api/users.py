from flask import Blueprint, jsonify, redirect, url_for, session, request
from app.models import User, db
from flask_jwt_extended import create_access_token, jwt_required

users_routes = Blueprint('users', __name__)


@users_routes.route('/signup', methods=['POST'])
def signup_user():
  try:
    user = User(
        username=request.json.get('username'),
        email=request.json.get('email'),
        password=request.json.get('password')
    )
    db.session.add(user)
    db.session.commit()
    email = user.email
    session["user"]= user.to_dict()
    return {"user": user.to_dict()}, 200
  except:
    return jsonify({"msg": "Bad data for signup."}), 400

@users_routes.route('/update', methods=["PUT"])
def update_user():
  try:
    if 'user' in session:
      user = session['user']
      db.update(users).where(users.id==user.id).values(
        firstname=request.json.get('firstname', None),
        address=request.json.get('address', None),
        city=request.json.get('city', None),
        state=request.json.get('state', None),
        zipcode=request.json.get('zipcode', None),
        phonenumber=request.json.get('phonenumber', None)
      )
      db.session.commit()
  except:
    return jsonfify({"message": "Bad request. Cannot update user."})

@users_routes.route('/collectionowner', methods=['GET'])
def get_collection_owner():
  try:
    user_id = request.args.get('id')
    user = User.query.filter(User.id == user_id).one()
    return {"user": user.to_dict()}
  except:
    return {"Message": "Unable to get collection owner."}

# @users_routes.route('/profile')
# def profile_user_id():
#   try:
