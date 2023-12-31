from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def email_ending(form, field):
    email = field.data
    valid_tlds = ['.com', '.net', '.org', '.edu', '.gov', '.io']
    if not any(email.endswith(tld) for tld in valid_tlds):
        raise ValidationError('Email must end with .com, .net, .org, .edu, .gov, or .io')

def email_contains_at_symbol(form, field):
    email = field.data
    if '@' not in email:
        raise ValidationError('Email must contain the @ symbol')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def password_length(form, field):
    password = field.data
    if len(password) < 8:
        raise ValidationError('Password must be at least 8 characters.')

def username_length(form, field):
    username = field.data
    if len(username) < 3 or len(username) > 40:
        raise ValidationError('Username must be between 3 and 40 characters')


class SignUpForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(), username_exists, username_length])
    email = StringField('email', validators=[DataRequired(), user_exists, email_ending, email_contains_at_symbol])
    password = StringField('password', validators=[DataRequired(), password_length])
