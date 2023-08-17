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
    clara = User( username='ClaraKenn', email='clara@gmail.com', password='password', profileBio=" Exploring life's hues through my WSCO lens.", profileImgUrl="https://im.vsco.co/aws-us-west-2/b455d2/115560607/5cbe1c08c98022453337347c/vsco5cbe1c1076363.jpg?w=1117&dpr=2" )
    john = User( username="JohnDee", email="john@gmail.com", password="password", profileBio="Saltwater soul, barefoot and beach-bound. Seeking serenity in every ripple", profileImgUrl="https://im.vsco.co/1/5314c7660cf3e414390/5314ddbd7167086d0f000110/vsco_030314.jpg?w=1117&dpr=2")
    emily = User( username="EmilyPerk", email="emily@gmail.com", password='password', profileBio="Artist at heart, fueled by caffeine and creativity.", profileImgUrl="https://im.vsco.co/aws-us-west-2/210d2a/101178299/62efff3551235c7a2b7fbc1b/vsco_080722.jpg?w=1117&dpr=2" )
    sarah = User( username="SarahSlash", email="sarah@gmail.com", password='password', profileBio="Getting lost in pages and pixels. Fiction fanatic, storytelling enthusiast", profileImgUrl="https://im.vsco.co/aws-us-west-2/962509/116394344/62f7a20060f4eb345c000001/21356cdd-b96f-47cd-bcb1-0f1878d0e9489113091658598585311.jpg?w=1117&dpr=2" )
    amy = User( username='AmyScho', email='amy@gmail.com', password='password', profileBio="Freezing fractions of time with a click. Embracing the magic in the mundane.", profileImgUrl="https://im.vsco.co/aws-us-west-2/8e7392/1020320/645636e38ba42d5836b0924e/vsco_050623.jpg?w=1117&dpr=2" )
    james = User( username="JamesLang", email="james@gmail.com", password="password", profileBio="Savoring life, one slice at a time. Foodie adventures, culinary explorer", profileImgUrl="https://im.vsco.co/aws-us-west-2/b1b8a1/162370467/63666b1f34f302590f421516/vsco_110522.jpg?w=1117&dpr=2" )
    andrew = User( username="AndrewForest", email="andrew@gmail.com", password="password", profileBio="Heart dances to melodies, and soul echoes with tunes. Music is my compass", profileImgUrl="https://im.vsco.co/aws-us-west-2/a919a1/9097272/62be0dc528337a2b5f6fd0ee/vsco_063022.jpg?w=1117&dpr=2" )
    blake = User( username="BlakeGord", email="blakegord@gmail.com", password="password", profileBio="Roaming through nature's gallery. Trees are my companions", profileImgUrl="https://im.vsco.co/aws-us-west-2/4b7689/5541138/61e6f0114e1e9b005ca86d2c/vsco61e6f022e7b42.jpg?w=1117&dpr=2" )
    felix = User( username="FelixSavor", email="felixsavor@gmail.com", password="password", profileBio="Pedaling through the journey, two wheels and an open road. Seeking thrills", profileImgUrl="https://im.vsco.co/aws-us-west-2/f09ce1/253231865/6339c07490328a64622caa07/vsco_100222.jpg?w=1117&dpr=2")
    gabriel = User(username="GabrielRoth", email="gabrielroth@gmail.com", password="password", profileBio="Chasing sunsets, painting skies with dreams. Embracing beauty", profileImgUrl="https://im.vsco.co/aws-us-west-2/fb0997/94581211/62e6af0a40eced16011f6f59/vsco_073122.jpg?w=1117&dpr=2")
    holden = User(username="HoldenBlank", email="holdenblank@gmail.com", password="password", profileBio="Fuelled by wanderlust, powered by my feet", profileImgUrl="https://im.vsco.co/aws-us-west-2/e0c9eb/18697562/62e953ca88ef954161000001/1d3f0b76-929b-4f57-b220-66290cfdb2713524995584323318212.jpg?w=960&dpr=2")
    ian = User(username="IanCarver", email="iancarver@gmail.com", password="password", profileBio="Living life in full spectrum. Finding beauty in every shade", profileImgUrl="https://im.vsco.co/aws-us-west-2/520bd6/161736817/63025f36804be85101000001/7e68b1f5-16db-4eeb-b2cf-f0fbf3b553ad6244928494935259166.jpg?w=1117&dpr=2")
    kyle = User(username="KyleGee", email="kylegee@gmail.com", password="password", profileBio=" Behind the lens, sipping lattes. My camera tells stories, coffee fuels the storyteller", profileImgUrl="https://im.vsco.co/aws-us-west-2/ca855f/234629899/62ed49568f194b4888104028/vsco_080522.jpg?w=1117&dpr=2")
    lucas = User(username="LucasWebb", email="lucaswebb@gmail.com", password="password", profileBio="Climber of mountains, wanderer of valleys. Seeking adventure in peaks", profileImgUrl="https://im.vsco.co/aws-us-west-2/05da8b/152314462/629643ec9a95c076113d0e7f/vsco_053122.jpg?w=1117&dpr=2")
    mando = User(username="MandoGreen", email="mandogreen@gmail.com", password="password", profileBio="Stargazer with feet on the ground. Finding constellations in city lights", profileImgUrl="https://im.vsco.co/aws-us-west-2/c756e9/196968799/6254c2e08f32c62a06ec2a22/vsco_041222.jpg?w=1117&dpr=2")
    nic = User(username="NicRaynor", email="nicraynor@gmail.com", password="password", profileBio="Gamer's paradise, virtual realms are my playground. Leveling up in life", profileImgUrl="https://im.vsco.co/aws-us-west-2/6d3192/14589198/62375632fe1efc1e02634d4f/vsco62375634b22e9.jpg?w=956.93359375&dpr=2")
    olivia = User(username="OliviaOtto", email="oliviaotto@gmail.com", password="password", profileBio="Nature's dweller, harmony seeker. Breathing with leaves", profileImgUrl="https://im.vsco.co/aws-us-west-2/79e906/17684194/626b1255569803134c00000f/a0fa43aa-e6f1-4aef-ab2f-caba9a0681a98316334574540284231.jpg?w=1117&dpr=2")
    patrick = User(username="PatrickStar", email="patrickstar@gmail.com", password="password", profileBio="Passport stamped, heart open to explore. Jetsetter, wanderer, collecting memories", profileImgUrl="https://im.vsco.co/aws-us-west-2/8fbb0c/233662189/623756fba47af61e230c4499/vsco623756fdce3d3.jpg?w=1593.3333333333333&dpr=2")
    quinn = User(username="QuinnWorman", email="quinnworman@gmail.com", password="password", profileBio="Every moment is a scene, every day a reel. Cinematic soul, living life frame by frame", profileImgUrl="https://im.vsco.co/aws-us-west-2/ea7388/220154128/6234b483ff7bf271e2f9786e/vsco6234b48502e47.jpg?w=671.8515742128935&dpr=2")
    richard = User(username="RichardPozar", email="richardpozar@gmail.com", password="password", profileBio=" Melting for ice cream, good vibes. Chasing flavors and sunshine", profileImgUrl="https://im.vsco.co/aws-us-west-2/d22a61/62740619/6241dfe716e9d2522da6d417/vsco6241dff01bfb7.jpg?w=896.25&dpr=2")
    taylor = User(username="TaylorLoft", email="taylorloft@gmail.com", password="password", profileBio="Rowing through currents of life. Navigating waters, collecting stories", profileImgUrl="https://im.vsco.co/aws-us-west-2/64fc7c/256788558/622e1d9575a7815691000003/vsco622e1d03340e1.jpg?w=896.25&dpr=2")
    victoria = User(username="VictoriaVlad", email="victoriavlad@gmail.com", password="password", profileBio="Urban dreamer, finding beauty amidst city lights. Wild heart", profileImgUrl="https://im.vsco.co/aws-us-west-2/b2fbca/9750044/59b9f1e9f638a83e5d5178d7/vsco59b9f1eb90ef4.jpg?w=895.8125915080527&dpr=2")
    walter = User(username="WalterWhite", email="walterwhite@gmail.com", password="password", profileBio="Riding waves of existence, carving path on life's ocean", profileImgUrl="https://im.vsco.co/aws-us-west-2/f027d5/45587993/5d1fb3b79d6c474c13d2aeb8/vsco5d1fb3b978026.jpg?w=895.8125915080527&dpr=2")

    db.session.add(demo) #1
    db.session.add(clara) #2
    db.session.add(john) #3
    db.session.add(emily) #4
    db.session.add(sarah) #5
    db.session.add(amy) #6

    db.session.add(james) #7
    db.session.add(andrew) #8
    db.session.add(blake) #9
    db.session.add(felix) #10
    db.session.add(gabriel) #11
    db.session.add(holden) #12
    db.session.add(ian) #13
    db.session.add(kyle) #14
    db.session.add(lucas) #15
    db.session.add(mando) #16
    db.session.add(nic) #17
    db.session.add(olivia) #18
    db.session.add(patrick) #19
    db.session.add(quinn) #20
    db.session.add(richard) #21
    db.session.add(taylor) #22
    db.session.add(victoria) #23
    db.session.add(walter) #24

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
