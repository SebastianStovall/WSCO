from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Post
from app.api.aws_helpers import ALLOWED_EXTENSIONS


def caption_len(form, field):
    # Checking if caption less than or equal to 150 characters
    caption = field.data
    if caption is not None:
        if len(caption) > 150:
            raise ValidationError('Caption must not exceed 150 characters.')


class PostForm(FlaskForm):
    photoUrl = FileField("Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    caption = StringField('caption', validators=[caption_len])

class PostFormEdit(FlaskForm):
    photoUrl = FileField("Image File", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    caption = StringField('caption', validators=[caption_len])
