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


def email_ending(form, field):
    email = field.data
    if not email.lower().endswith('.com'):
        raise ValidationError('Email must end with .com')


class ManageForm(FlaskForm):
    email = EmailField('email', validators=[DataRequired(), user_exists, email_ending])
    first_name = StringField('first_name', validators=[DataRequired()])
    last_name = StringField('last_name', validators=[DataRequired()])
    password = StringField('password', validators=[DataRequired()])


class ManageFormPassword(FlaskForm):
    password = StringField('password', validators=[DataRequired()])
