from flask.cli import AppGroup
from .users import seed_users, undo_users

from .posts import seed_posts, undo_posts
from .comments import seed_comments, undo_comments
from .journals import seed_journals, undo_journals
from .journalphotos import seed_journal_photos, undo_journal_photos
# from .collections import seed_collections, undo_collections

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_journal_photos()
        undo_comments()
        undo_posts()
        undo_journals()
        undo_users()
    seed_users()
    seed_journals()
    seed_posts()
    seed_comments()
    seed_journal_photos()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_journal_photos()
    undo_comments()
    undo_posts()
    undo_journals()
    undo_users()
    # Add other undo functions here
