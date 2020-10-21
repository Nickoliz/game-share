from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
import datetime

db = SQLAlchemy()

user_collection = db.Table('user_collection',
  db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
  db.Column('game_id', db.Integer, db.ForeignKey('boardgames.id'), primary_key=True)
)

class User(db.Model, UserMixin):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String(30), nullable=False, unique=True)
  email = db.Column(db.String(30), nullable=False, unique=True)
  hashed_password = db.Column(db.String(100), nullable=False)
  firstname = db.Column(db.String(60), nullable=True)
  lastname = db.Column(db.String(100), nullable=True)
  address = db.Column(db.String(80), nullable=True)
  city = db.Column(db.String(100), nullable=True)
  state = db.Column(db.String(50), nullable=True)
  zipcode = db.Column(db.Integer, nullable=True)
  phonenumber = db.Column(db.String(12), nullable=True)
  created_at = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow)
  updated_at = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow)

  user_collection = db.relationship("BoardGame", secondary=user_collection, lazy='subquery',
                                    backref=db.backref('users', lazy=True))

  @property
  def password(self):
    return self.hashed_password

  @password.setter
  def password(self, password):
    self.hashed_password = generate_password_hash(password)

  def check_password(self, password):
    return check_password_hash(self.password, password)

  def to_dict(self):
    return {
      "id": self.id,
      "username": self.username,
      "email": self.email,
      "created_at": self.created_at.strftime("%B %Y")
    }

# class GameCondition(db.Model):
#   __tablename__ = 'gamecondition'

#   id = db.Column(db.Integer, primary_key=True)
#   game_id = db.Column(db.Integer, db.ForeignKey("boardgames.id"), nullable=False)
#   condition = db.Column(db.String(20), nullable=False)
#   previous_condition = db.Column(db.String(20))

#   game = db.relationship("BoardGame", foreign_keys=[game_id])

#   @property
#   def get_condition(self):
#     return self.condition

#   def change_condition(self, condition):
#     self.condition = self.previous_condition
#     self.condition = condition

#   def to_dict():
#     return {
#       "id": self.id,
#       "game_id": self.game_id,
#       "condition": self.condition,
#       "previous_condition": self.previous_condition
#     }


class BoardGame(db.Model):
  __tablename__ = 'boardgames'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  game_id = db.Column(db.String(20), nullable=True)
  title = db.Column(db.String(100), nullable=False)
  year_published = db.Column(db.Integer)
  thumb_url = db.Column(db.String(300))
  msrp = db.Column(db.Integer)
  sale_price = db.Column(db.Float, default=0.00)
  rank = db.Column(db.Integer)
  forsale = db.Column(db.Boolean, nullable=False, default=False)
  fortrade = db.Column(db.Boolean, nullable=False, default=False)
  forborrow = db.Column(db.Boolean, nullable=False, default=False)
  condition = db.Column(db.String(10), default="Used")
  condition_description = db.Column(db.String(200))

  user = db.relationship("User", foreign_keys=[user_id])

  def to_dict(self):
    return {
      "id": self.id,
      "user_id": self.user_id,
      "game_id": self.game_id,
      "title": self.title,
      "year_published": self.year_published,
      "thumb_url": self.thumb_url,
      "msrp": self.msrp,
      "sale_price": self.sale_price,
      "rank": self.rank,
      "forsale": self.forsale,
      "fortrade": self.fortrade,
      "forborrow": self.forborrow,
      "condition": self.condition,
      "condition_description": self.condition_description
    }

  @property
  def get_condition(self):
    return self.condition

  @property
  def get_forsale(self):
    return self.forsale

  @property
  def get_fortrade(self):
    return self.fortrade

  @property
  def get_forborrow(self):
    return self.forborrow

# class UserCollection(db.Model):
#   __tablename__ =  'usercollection'

#   id = db.Column(db.Integer, primary_key=True)
#   user_id = db.Column(db.Integer, ForeignKey("users.id"), nullable=False)
#   game_id = db.Column(db.Integer, ForeignKey("boardgames.id"), nullable=False)

#   user = db.relationship("Users", foreign_keys=[user_id])
#   games = db.relationship("BoardGame", foreign_keys=[game_id])
