from .db import db, environment, SCHEMA, add_prefix_for_prod

class JournalPhoto(db.Model):
    __tablename__ = "journalphotos"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    journalId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("journals.id")))
    photoUrl = db.Column(db.Text, nullable=False)
    caption = db.Column(db.String(150), nullable=True)

    single_journal_photos = db.relationship("Journal", back_populates="photos")

    def to_dict(self):
        return {
            'id': self.id,
            'journalId': self.journalId,
            'photoUrl': self.photoUrl,
            'caption': self.caption
        }
