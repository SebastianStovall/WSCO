from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text
from .comment_data import comments

def seed_comments():
    for comment in comments:
        new_comment = Comment(
            comment=comment["comment"],
            userId=comment["userId"],
            postId=comment["postId"]
        )

        db.session.add(new_comment)
    db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
