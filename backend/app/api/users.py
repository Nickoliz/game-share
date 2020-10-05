from flask import Blueprint, jsonify
from app.models import User

users = Blueprint('users', __name__)

@users.route('/')
def index():
  response = User.query.all()
  return { "users": [user.to_dict() for user in response]}


@users.route('/signup', methods=['POST'])
def signup_user():
  try:
    user = User(
      username=request.json.get('username', None),
      email=request.json.get('email', None),
      password=request.json.get('password', None)
    )
    db.session.add(user)
    db.session.commit()
    email= user.email
    session["user"]= user.to_dict()
    return {"user": user.to_dict()}, 200
  except:
    return jsonify({"msg": "Bad data for signup."}), 400
