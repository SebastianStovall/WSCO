from .db import db, environment, SCHEMA, add_prefix_for_prod

class Comment(db.Model):
    __tablename__ = "comments"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.String(255), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    postId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("posts.id")))
    createdAt = db.Column(db.DateTime, default=db.func.now())

    user_comments = db.relationship("User", back_populates="comments")

    def to_dict(self):
        return {
            'id': self.id,
            'comment': self.comment,
            'userId': self.userId,
            'postId': self.postId,
            'createdAt': self.createdAt
        }
