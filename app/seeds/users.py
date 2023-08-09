from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User( username='Demolition', email='demolition@gmail.com', password='password' )
    clara = User( username='ClaraKenn', email='clara@gmail.com', password='password' )
    john = User( username="JohnDee", email="john@gmail.com", password="password" )
    emily = User( username="EmilyPerk", email="emily@gmail.com", password='password' )
    sarah = User( username="SarahSlash", email="sarah@gmail.com", password='password' )
    amy = User( username='AmyScho', email='amy@gmail.com', password='password' )
    david = User( username="DavidLee", email="david@gmail.com", password="password" )
    james = User( username="JamesLang", email="james@gmail.com", password="password" )
    andrew = User( username="AndrewForest", email="andrew@gmail.com", password="password" )
    blake = User( username="Blake", email="blake@gmail.com", password="password" )

    db.session.add(demo)
    db.session.add(clara)
    db.session.add(john)
    db.session.add(emily)
    db.session.add(sarah)
    db.session.add(amy)
    db.session.add(david)
    db.session.add(james)
    db.session.add(andrew)
    db.session.add(blake)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
