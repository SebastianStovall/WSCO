from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .collections import collections


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    posts = db.relationship("Post", back_populates="user_posts", cascade="all, delete-orphan")
    comments = db.relationship("Comment", back_populates="user_comments", cascade="all, delete-orphan")
    journals = db.relationship("Journal", back_populates="user_journals", cascade="all, delete-orphan")

    # Many-To-Many association with 'collections' Table Constructor (linking User and Post tables)
    user_collections = db.relationship('Post', secondary=collections, back_populates="post_collections")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'posts': [post.to_dict() for post in self.posts],
            'comments': [comment.to_dict() for comment in self.comments],
            'journals': [journal.to_dict() for journal in self.journals],
            'collection': [collection.to_dict() for collection in self.user_collections]
        }
