from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Post


def caption_len(form, field):
    # Checking if caption less than or equal to 150 characters
    caption = field.data
    if len(caption) > 150:
        raise ValidationError('Caption cannot exceed 150 characters.')


class PostForm(FlaskForm):
    photoUrl = StringField('photoUrl', validators=[DataRequired()])
    caption = StringField('caption', validators=[caption_len])
