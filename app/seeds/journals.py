from app.models import db, Journal, environment, SCHEMA
from sqlalchemy.sql import text
from .journal_data import journals


def seed_journals():
    for journal in journals:
        new_journal = Journal(
            title=journal["title"],
            description=journal["description"],
            userId=journal["userId"]
        )

        db.session.add(new_journal)
    db.session.commit()


def undo_journals():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.journals RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM journals"))

    db.session.commit()
