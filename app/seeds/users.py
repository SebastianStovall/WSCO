from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demolition',
        email='demolition@gmail.com',
        password='password',
        profileImgUrl="https://www.shareicon.net/data/512x512/2016/09/15/829459_man_512x512.png",
        profileBio="Hello World",
        firstName="Demo",
        lastName="lition"
    )
    clara = User( username='ClaraKenn', email='clara@gmail.com', password='password' )
    john = User( username="JohnDee", email="john@gmail.com", password="password" )
    emily = User( username="EmilyPerk", email="emily@gmail.com", password='password' )
    sarah = User( username="SarahSlash", email="sarah@gmail.com", password='password' )
    amy = User( username='AmyScho', email='amy@gmail.com', password='password' )
    david = User( username="DavidLee", email="david@gmail.com", password="password" )
    james = User( username="JamesLang", email="james@gmail.com", password="password" )
    andrew = User( username="AndrewForest", email="andrew@gmail.com", password="password" )
    blake = User( username="BlakeGord", email="blakegord@gmail.com", password="password" )

    damian = User(username="DamianRoss", firstName="damian", lastName="ross", email="damianross@gmail.com", password="password")
    daniel = User(username="DanielSmith", firstName="Daniel", lastName="Smith", email="danielsmith@gmail.com", password="password")
    diana = User(username="DianaBrown", firstName="Diana", lastName="Brown", email="dianabrown@gmail.com", password="password")
    derek = User(username="DerekWilliams", firstName="Derek", lastName="Williams", email="derekwilliams@gmail.com", password="password")
    deborah = User(username="DeborahLee", firstName="Deborah", lastName="Lee", email="deborahlee@gmail.com", password="password")
    dennis = User(username="DennisMartin", firstName="Dennis", lastName="Martin", email="dennismartin@gmail.com", password="password")
    donald = User(username="DonaldWilson", firstName="Donald", lastName="Wilson", email="donaldwilson@gmail.com", password="password")
    dorothy = User(username="DorothyClark", firstName="Dorothy", lastName="Clark", email="dorothyclark@gmail.com", password="password")
    dylan = User(username="DylanAllen", firstName="Dylan", lastName="Allen", email="dylanallen@gmail.com", password="password")

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

    db.session.add(damian)
    db.session.add(daniel)
    db.session.add(diana)
    db.session.add(derek)
    db.session.add(deborah)
    db.session.add(dennis)
    db.session.add(donald)
    db.session.add(dorothy)
    db.session.add(dylan)

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
