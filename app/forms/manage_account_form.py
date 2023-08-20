from flask_wtf import FlaskForm
from wtforms import StringField, EmailField
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User
from flask_login import current_user
from app.api.aws_helpers import ALLOWED_EXTENSIONS


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
    if user and user.id != current_user.id:
        raise ValidationError('Username is already in use.')

def username_length(form, field):
    username = field.data
    if len(username) < 3 or len(username) > 40:
        raise ValidationError('Username must be between 3 and 40 characters')

def email_ending(form, field):
    email = field.data
    valid_tlds = ['.com', '.net', '.org', '.edu', '.gov', '.io']
    if not any(email.endswith(tld) for tld in valid_tlds):
        raise ValidationError('Email must end with .com, .net, .org, .edu, .gov, or .io')

def email_contains_at_symbol(form, field):
    email = field.data
    if '@' not in email:
        raise ValidationError('Email must contain the @ symbol')

def password_length(form, field):
    password = field.data
    if len(password) < 8:
        raise ValidationError('Password must be at least 8 characters.')

def firstName_length(form, field):
    firstName = field.data
    if firstName != None:
        if len(firstName) > 30:
            raise ValidationError("First name cannot exceed 30 characters")

def lastName_length(form, field):
    lastName = field.data
    if lastName != None:
        if len(lastName) > 30:
            raise ValidationError("Last name cannot exceed 30 characters")

def bio_length(form, field):
    profileBio = field.data
    if profileBio != None:
        if len(profileBio) > 100:
            raise ValidationError("Bio cannot exceed 100 characters")


class ManageForm(FlaskForm):
    email = EmailField('email', validators=[DataRequired(), user_exists, email_ending, email_contains_at_symbol])
    firstName = StringField('firstName', validators=[firstName_length])
    lastName = StringField('lastName', validators=[lastName_length])
    username = StringField('username', validators=[DataRequired(), username_exists, username_length])
    profileImgUrl = FileField("Image File", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    profileBio = StringField("profileBio", validators=[bio_length])

class ManageFormPassword(FlaskForm):
    password = StringField('password', validators=[DataRequired(), password_length])
