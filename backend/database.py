from dotenv import load_dotenv
load_dotenv()

from app import app, db
from app.models import User, BoardGame

with app.app_context():
  db.drop_all()
  db.create_all()

  ian = User(id = 1, username = 'Ian', email = 'ian@aa.io', password = 'password')
  javier = User(id = 2, username = 'Javier', email = 'javier@aa.io', password = 'password')
  dean = User(id = 3, username = 'Dean', email = 'dean@aa.io', password = 'password')
  angela = User(id = 4, username = 'Angela', email = 'angela@aa.io', password = 'password')
  soonmi = User(id = 5, username = 'Soon-Mi', email = 'soonmi@aa.io', password = 'password')
  alissa = User(id = 6, username = 'Alissa', email = 'alissa@aa.io', password = 'password')
  demo = User(id = 555, username = 'Demo', email = 'demo@gameshare.com', password = 'password')
  demo2 = User(id = 777, username = 'Demo-2', email = 'demo2@gameshare.com', password = 'password')

  db.session.add(ian)
  db.session.add(javier)
  db.session.add(dean)
  db.session.add(angela)
  db.session.add(soonmi)
  db.session.add(alissa)
  db.session.add(demo)
  db.session.add(demo2)


# # GAME CONDITION

# tapestry_condition = GameCondition(id=1, game_id=1, condition="Mint", previous_condition=None)
# windward_condition = GameCondition(id=2, game_id=2, condition="New", previous_condition="Mint")
# fort_condition = GameCondition(id=3, game_id=3, condition="Fair", previous_condition="New")

# db.session.add(tapestry_condition)
# db.session.add(windward_condition)
# db.session.add(fort_condition)

# GAMES

  tapestry = BoardGame(user_id=555, username='Demo', game_id='fAFWwA5CwK', title="Tapestry", year_published=2020, thumb_url="https://d2k4q26owzy373.cloudfront.net/700x700/games/uploaded/1565194890891", msrp=60.00, sale_price=32.98, rank=117, forsale = True, fortrade=False, forborrow=False, condition="New", condition_description='New in box, and seal.')
  windward = BoardGame(user_id=555, username='Demo', game_id='QGRTApF1mi', title="Windward", year_published=2020, thumb_url="https://d2k4q26owzy373.cloudfront.net/150x150/games/uploaded/1572347833267", msrp=40.00, sale_price=40.00, rank=2085, forsale = True, fortrade=False, forborrow=True, condition="Great", condition_description='Used. Good condition.')
  fort = BoardGame(user_id=555, username='Demo', game_id='ezX2Sjg3B0', title="Fort", year_published=2020, thumb_url="https://d2k4q26owzy373.cloudfront.net/150x150/games/uploaded/1595027240762", msrp=35.00, sale_price=0, rank=210, forsale = False, fortrade=True, forborrow=False, condition="Fair", condition_description='Poor. Willing to steep price.')

  db.session.add(tapestry)
  db.session.add(windward)
  db.session.add(fort)

  db.session.commit()
