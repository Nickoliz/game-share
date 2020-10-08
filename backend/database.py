from dotenv import load_dotenv
load_dotenv()

from app import app, db
from app.models import User, BoardGame

with app.app_context():
  db.drop_all()
  db.create_all()

  ian = User(username = 'Ian', email = 'ian@aa.io', password = 'password')
  javier = User(username = 'Javier', email = 'javier@aa.io', password = 'password')
  dean = User(username = 'Dean', email = 'dean@aa.io', password = 'password')
  angela = User(username = 'Angela', email = 'angela@aa.io', password = 'password')
  soonmi = User(username = 'Soon-Mi', email = 'soonmi@aa.io', password = 'password')
  alissa = User(username = 'Alissa', email = 'alissa@aa.io', password = 'password')
  demo = User(id = 555, username = 'Demo', email = 'demo@gameshare.com', password = 'password')

  db.session.add(ian)
  db.session.add(javier)
  db.session.add(dean)
  db.session.add(angela)
  db.session.add(soonmi)
  db.session.add(alissa)
  db.session.add(demo)


# # GAME CONDITION

# tapestry_condition = GameCondition(id=1, game_id=1, condition="Mint", previous_condition=None)
# windward_condition = GameCondition(id=2, game_id=2, condition="New", previous_condition="Mint")
# fort_condition = GameCondition(id=3, game_id=3, condition="Fair", previous_condition="New")

# db.session.add(tapestry_condition)
# db.session.add(windward_condition)
# db.session.add(fort_condition)

# GAMES

  tapestry = BoardGame(user_id=555, title="Tapestry", year_published=2020, thumb_url="https://d2k4q26owzy373.cloudfront.net/700x700/games/uploaded/1565194890891", msrp=60.00, rank=117, forsale = False, fortrade=False, forborrow=False, condition="New")
  windward = BoardGame(user_id=555, title="Windward", year_published=2020, thumb_url="https://d2k4q26owzy373.cloudfront.net/150x150/games/uploaded/1572347833267", msrp=40.00, rank=2085, forsale = True, fortrade=False, forborrow=False, condition="Great")
  fort = BoardGame(user_id=555, title="Fort", year_published=2020, thumb_url="https://d2k4q26owzy373.cloudfront.net/150x150/games/uploaded/1595027240762", msrp=35.00, rank=210, forsale = False, fortrade=False, forborrow=False, condition="Fair")

  db.session.add(tapestry)
  db.session.add(windward)
  db.session.add(fort)

  db.session.commit()
