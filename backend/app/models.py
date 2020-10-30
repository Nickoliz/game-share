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


class BoardGame(db.Model):
  __tablename__ = 'boardgames'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  game_id = db.Column(db.String(20), nullable=True, unique=True)
  username = db.Column(db.String(100), nullable=False)
  title = db.Column(db.String(100), nullable=False)
  year_published = db.Column(db.Integer)
  thumb_url = db.Column(db.String(300))
  msrp = db.Column(db.Integer)
  sale_price = db.Column(db.Float, default=0.00)
  rank = db.Column(db.Integer)
  forsale = db.Column(db.Boolean, nullable=False, default=False)
  fortrade = db.Column(db.Boolean, nullable=False, default=False)
  forborrow = db.Column(db.Boolean, nullable=False, default=False)
  borrowed = db.Column(db.Boolean, nullable=False, default=False)
  borrower_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)
  pending_buy_offer = db.Column(db.Boolean, nullable=False, default=False)
  pending_trade_offer = db.Column(db.Boolean, nullable=False, default=False)
  pending_borrow_offer = db.Column(db.Boolean, nullable=False, default=False)
  condition = db.Column(db.String(10), default="Used")
  condition_description = db.Column(db.String(200))

  user = db.relationship("User", foreign_keys=[user_id])

  def to_dict(self):
    return {
      "id": self.id,
      "user_id": self.user_id,
      "game_id": self.game_id,
      "username": self.username,
      "title": self.title,
      "year_published": self.year_published,
      "thumb_url": self.thumb_url,
      "msrp": self.msrp,
      "sale_price": self.sale_price,
      "rank": self.rank,
      "forsale": self.forsale,
      "fortrade": self.fortrade,
      "forborrow": self.forborrow,
      "borrowed": self.borrowed,
      "pending_buy_offer": self.pending_buy_offer,
      "pending_trade_offer": self.pending_trade_offer,
      "pending_borrow_offer": self.pending_borrow_offer,
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


class Offer(db.Model):
  __tablename__ = 'offers'

  id = db.Column(db.Integer, primary_key=True)
  owner_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  offeree_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  game_id = db.Column(db.String(20), db.ForeignKey("boardgames.game_id"), nullable=False)
  new_offer = db.Column(db.Boolean, nullable=False, default=True)
  pending_offer = db.Column(db.Boolean, nullable=False, default=True)
  offer_buy = db.Column(db.Boolean, nullable=False, default=False)
  offer_trade = db.Column(db.Boolean, nullable=False, default=False)
  offer_borrow = db.Column(db.Boolean, nullable=False, default=False)
  created_at = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow)
  updated_at = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow)

  owner = db.relationship("User", foreign_keys=[owner_id])
  offeree = db.relationship("User", foreign_keys=[offeree_id])
  game = db.relationship("BoardGame", foreign_keys=[game_id])

  def to_dict(self):
    return {
      "id": self.id,
      "owner_id": self.owner_id,
      "offeree_id": self.offeree_id,
      "game_id": self.game_id, # From BoardGame model
      "new_offer": self.new_offer,
      "pending_offer": self.pending_offer,
      "offer_buy": self.offer_buy,
      "offer_trade": self.offer_trade,
      "offer_borrow": self.offer_borrow
    }
