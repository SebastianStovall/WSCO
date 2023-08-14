from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Journal


def title_len(form, field):
    # Checking if user exists
    title = field.data
    if len(title) > 50 or len(title) == 0:
        raise ValidationError('Title cannot exceed 50 characters.')

def title_null(form, field):
    title = field.data
    if len(title) == 0:
        raise ValidationError('Title is required.')


def description_len(form, field):
    # Checking if user exists
    description = field.data
    if len(description) > 150:
        raise ValidationError('Description cannot exceed 150 characters.')



class JournalForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(), title_len, title_null])
    description = StringField('description', validators=[description_len])
