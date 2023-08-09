# from app.models import db, Post, User, environment, SCHEMA
# from app.models.collections import collections_association
# from sqlalchemy.sql import text

# def seed_collections():
#     collectionsArr = [
#         {"userId": 1, "postId": 12},
#         {"userId": 1, "postId": 22},
#         {"userId": 1, "postId": 23},
#         {"userId": 2, "postId": 2},
#         {"userId": 2, "postId": 4},
#         {"userId": 2, "postId": 24},
#         {"userId": 1, "postId": 3},
#         {"userId": 2, "postId": 13},
#         {"userId": 3, "postId": 14}
#     ]

#     with db.engine.connect() as connection:
#         for collection in collectionsArr:
#             each_collection = collections_association.insert().values(**collection)
#             connection.execute(each_collection)
#         return collectionsArr


# def undo_collections():
#     if environment == "production":
#         db.session.execute(
#             f"TRUNCATE table {SCHEMA}.collections_association RESTART IDENTITY CASCADE;"
#         )
#     else:
#         db.session.execute(text("DELETE FROM collections_association"))

#     db.session.commit()
