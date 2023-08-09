from flask_wtf import FlaskForm
from wtforms import StringField, EmailField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User
from flask_login import current_user


def user_exists(form, field):
    # Checking if email exists
    email = field.data

    all_other_users = User.query.filter(User.id != str(current_user.id)).all()

    for user in all_other_users:
        if email == user.email:
            raise ValidationError('Email is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


def username_length(form, field):
    username = field.data
    if len(username) < 3 or len(username) > 40:
        raise ValidationError('Username must be between 3 and 40 characters')


def email_ending(form, field):
    email = field.data
    if not email.lower().endswith('.com'):
        raise ValidationError('Email must end with .com')


class ManageForm(FlaskForm):
    email = EmailField('email', validators=[DataRequired(), user_exists, email_ending])
    first_name = StringField('first_name', validators=[DataRequired()])
    last_name = StringField('last_name', validators=[DataRequired()])
    username = StringField('username', validators=[DataRequired(), username_exists, username_length])


class ManageFormPassword(FlaskForm):
    password = StringField('password', validators=[DataRequired()])
