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

    post_2 = Post.query.get(2)    # owned by user 1
    post_3 = Post.query.get(3)    # owned by user 1
    post_4 = Post.query.get(4)    # owned by user 1

    post_12 = Post.query.get(12)  # owned by user 2
    post_13 = Post.query.get(13)  # owned by user 2
    post_14 = Post.query.get(14)  # owned by user 2

    post_22 = Post.query.get(22)  # owned by user 3
    post_23 = Post.query.get(23)  # owned by user 3
    post_24 = Post.query.get(24)  # owned by user 3

    post_15 = Post.query.get(15)
    post_16 = Post.query.get(16)
    post_17 = Post.query.get(17)
    post_18 = Post.query.get(18)

    post_25 = Post.query.get(25)
    post_26 = Post.query.get(26)
    post_27 = Post.query.get(27)
    post_28 = Post.query.get(28)
    post_29 = Post.query.get(29)


    demo_user.user_collections.append(post_12)      # user 1 TO user 2's POST
    demo_user.user_collections.append(post_22)      # user 1 TO user 3's POST
    demo_user.user_collections.append(post_23)      # user 1 TO user 3's POST

    demo_user.user_collections.append(post_15)
    demo_user.user_collections.append(post_16)
    demo_user.user_collections.append(post_17)
    demo_user.user_collections.append(post_18)

    demo_user.user_collections.append(post_25)
    demo_user.user_collections.append(post_26)
    demo_user.user_collections.append(post_27)
    demo_user.user_collections.append(post_28)
    demo_user.user_collections.append(post_29)

    clara_user.user_collections.append(post_2)      # user 2 TO user 1's POST
    clara_user.user_collections.append(post_4)      # user 2 TO user 1's POST
    clara_user.user_collections.append(post_24)     # user 2 TO user 3's POST

    john_user.user_collections.append(post_3)       # user 3 TO user 1's POST
    john_user.user_collections.append(post_13)      # user 3 TO user 2's POST
    john_user.user_collections.append(post_14)      # user 3 TO user 2's POST


def undo_posts():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM posts"))

    db.session.commit()
