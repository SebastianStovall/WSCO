from app.models import db, Post, User, environment, SCHEMA
from sqlalchemy.sql import text
from .post_data import posts


def seed_posts():
    for post in posts:
        new_post = Post(
            userId=post['userId'],
            photoUrl=post['photoUrl'],
            caption=post['caption']
        )

        db.session.add(new_post)
    db.session.commit()


    # QUERY FOR THE USER INSTANCES
    demo_user = User.query.get(1)
    clara_user = User.query.get(2)
    john_user = User.query.get(3)


    # QUERY FOR THE POST INSTANCES

    post_1 = Post.query.get(1)    # owned by user 1
    post_2 = Post.query.get(2)    # owned by user 1
    post_3 = Post.query.get(3)    # owned by user 1

    post_11 = Post.query.get(11)  # owned by user 2
    post_12 = Post.query.get(12)  # owned by user 2
    post_13 = Post.query.get(13)  # owned by user 2

    post_21 = Post.query.get(21)  # owned by user 3
    post_22 = Post.query.get(22)  # owned by user 3
    post_23 = Post.query.get(23)  # owned by user 3


    demo_user.user_collections.append(post_11)      # user 1 TO user 2's POST
    clara_user.user_collections.append(post_1)      # user 2 TO user 1's POST
    john_user.user_collections.append(post_2)       # user 3 TO user 1's POST
    demo_user.user_collections.append(post_21)      # user 1 TO user 3's POST
    clara_user.user_collections.append(post_3)      # user 2 TO user 1's POST
    john_user.user_collections.append(post_12)      # user 3 TO user 2's POST
    demo_user.user_collections.append(post_22)      # user 1 TO user 3's POST
    clara_user.user_collections.append(post_23)     # user 2 TO user 3's POST
    john_user.user_collections.append(post_13)      # user 3 TO user 2's POST


def undo_posts():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM posts"))

    db.session.commit()
