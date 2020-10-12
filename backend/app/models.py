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
  username = db.Column(db.String(30), nullable=False)
  email = db.Column(db.String(30), nullable=False, unique=True)
  hashed_password = db.Column(db.String(100), nullable=False)
  firstname = db.Column(db.String(60))
  lastname = db.Column(db.String(100))
  address = db.Column(db.String(80))
  city = db.Column(db.String(100))
  state = db.Column(db.String(50))
  zipcode = db.Column(db.Integer)
  phonenumber = db.Column(db.String(12))
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
  title = db.Column(db.String(100), nullable=False)
  year_published = db.Column(db.Integer)
  thumb_url = db.Column(db.String(300))
  msrp = db.Column(db.Integer)
  sale_price = db.Column(db.Integer, default=0)
  rank = db.Column(db.Integer)
  forsale = db.Column(db.Boolean, nullable=False, default=False)
  fortrade = db.Column(db.Boolean, nullable=False, default=False)
  forborrow = db.Column(db.Boolean, nullable=False, default=False)
  condition = db.Column(db.String(10))
  condition_description = db.Column(db.String(200))

  user = db.relationship("User", foreign_keys=[user_id])

  def to_dict(self):
    return {
      "id": self.id,
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

  def change_for_sale(self):
    if (self.forsale == False):
      return self.forsale == True
    else:
      self.forsale == False

  def change_for_trade(self):
    if (self.fortrade == False):
      return self.fortrade == True
    else:
      self.fortrade == False

  def change_for_borrow(self):
    if (self.forborrow == False):
      return self.forborrow == True
    else:
      self.forborrow == False


# class UserCollection(db.Model):
#   __tablename__ =  'usercollection'

#   id = db.Column(db.Integer, primary_key=True)
#   user_id = db.Column(db.Integer, ForeignKey("users.id"), nullable=False)
#   game_id = db.Column(db.Integer, ForeignKey("boardgames.id"), nullable=False)

#   user = db.relationship("Users", foreign_keys=[user_id])
#   games = db.relationship("BoardGame", foreign_keys=[game_id])
