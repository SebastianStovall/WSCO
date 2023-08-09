from .db import db, environment, SCHEMA, add_prefix_for_prod

class Post(db.Model):
    __tablename__ = "posts"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    photoUrl = db.Column(db.Text, nullable=False)
    caption = db.Column(db.String(150), nullable=True)

    user_posts = db.relationship("User", back_populates="posts")

    # Many-To-Many association with 'collections' Table Constructor (linking User and Post tables)
    post_collections = db.relationship('User', secondary="collections", back_populates="user_collections")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'photoUrl': self.photoUrl,
            'caption': self.caption
        }
