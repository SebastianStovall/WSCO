from .db import db, environment, SCHEMA, add_prefix_for_prod

class Journal(db.Model):
    __tablename__ = "journals"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(150), nullable=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))

    # One-To-Many between Journal and User tables
    user_journals = db.relationship("User", back_populates="journals")

    # One-To-Many between Journal and JournalPhoto tables
    photos = db.relationship("JournalPhoto", back_populates="single_journal_photos", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'userId': self.userId,
            'photos': [photo.to_dict() for photo in self.photos]
        }
