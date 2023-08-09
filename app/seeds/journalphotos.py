from app.models import db, JournalPhoto, environment, SCHEMA
from sqlalchemy.sql import text
from .journal_photos_data import journal_photos

def seed_journal_photos():
    for journal_photo in journal_photos:
        new_journal_photo = JournalPhoto(
            journalId=journal_photo["journalId"],
            photoUrl=journal_photo["photoUrl"],
            caption=journal_photo["caption"]
        )

        db.session.add(new_journal_photo)
    db.session.commit()


def undo_journal_photos():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.journalphotos RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM journalphotos"))

    db.session.commit()
