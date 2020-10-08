from flask import Blueprint, jsonify, redirect, session, request, current_app, make_message
import os

atlas_routes = Blueprint('atlas', __name__)

client_id = current_app.config['CLIENT_ID']

print("HERE")

@atlas_routes.route('/trending')
def get_trending_games():
  print("HERE MAYBE")
  search_url = 'https://api.boardgameatlas.com/api/search?trending=true&pretty=true&limit=5&client_id=${client_id}'
  print(search_url)
  print("HERE?")
  res = requests.get(search_url)
  data = res.json()
  return {"games": data.games}
