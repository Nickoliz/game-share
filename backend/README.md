# Running Flask in Development

1. `CD` into this directory
2. Install dependencies (`pipenv install --python 3.8 $(cat requirements.txt)`)
3. Create your DB user and DB
4. Run migrations, if you have any.
5. To seed the database, run:
  * `pipenv run python database.py`
6. To run the backend:
   * `pipenv run flask run`

### Navigation
* [Back to root README](../README.md)

### Create Your Database
1. psql -c "CREATE USER new_user WITH PASSWORD 'password' CREATEDB"
2. psql -c "CREATE DATABASE new_database WITH USER new_user"

### Flask Migrate
1. `pip install Flask-Migrate`
2. CD into backend directory
3. Add `import datetime` to models.py file
4. Run command `pipenv run flask db init`
5. Run command `pipenv run flask db migrate -m 'Initial migration'`
6. Run command `pipenv run flask db upgrade`
7. Run command `pipenv run python database.py`
