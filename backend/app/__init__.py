import os
from flask import Flask, render_template, request, session
from flask_cors import CORS
from flask_wtf.csrf import CSRFProtect, generate_csrf
from .models import db, User
from .api.users import users_routes
from .api.session import session_routes
from .api.games import games_routes
from .api.offers import offers_routes
from .config import Config
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager

app = Flask(__name__)

app.config.from_object(Config)
app.register_blueprint(users_routes, url_prefix='/api/users')
app.register_blueprint(session_routes, url_prefix='/api/session' )
app.register_blueprint(games_routes, url_prefix='/api/games' )
app.register_blueprint(offers_routes, url_prefix='/api/offers')
db.init_app(app)
migrate = Migrate(app, db)



## Application Security
CORS(app)
@app.after_request
def inject_csrf_token(response):
  response.set_cookie('csrf_token',
      generate_csrf(),
      secure=True if os.environ.get('FLASK_ENV') else False,
      samesite='Strict' if os.environ.get('FLASK_ENV') else None,
      httponly=True)
  return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
  print("path", path)
  if path == 'favicon.ico':
    return app.send_static_file('favicon.ico')
  return app.send_static_file('index.html')
