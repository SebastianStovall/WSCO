from .db import db, environment, SCHEMA, add_prefix_for_prod

collections_association = db.Table(
    'collections_association',
    db.Model.metadata,
    db.Column('userId', db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
    db.Column('postId', db.ForeignKey(add_prefix_for_prod('posts.id')), primary_key=True)
)

if environment == "production":
    collections_association.schema = SCHEMA
