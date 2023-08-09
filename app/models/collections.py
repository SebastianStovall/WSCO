from .db import db, environment, SCHEMA, add_prefix_for_prod

collections = db.Table(
    'collections',
    db.Model.metadata,
    db.Column('userId', db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
    db.Column('postId', db.ForeignKey(add_prefix_for_prod('posts.id')), primary_key=True)
)
