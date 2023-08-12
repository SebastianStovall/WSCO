from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Post
from app.api.aws_helpers import ALLOWED_EXTENSIONS


def caption_len(form, field):
    # Checking if caption less than or equal to 150 characters
    caption = field.data
    if len(caption) > 150 or len(caption) == 0:
        raise ValidationError('Caption must be between 1 and 150 characters.')


class PostForm(FlaskForm):
    # photoUrl = StringField('photoUrl', validators=[DataRequired()])
    photoUrl = FileField("Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    caption = StringField('caption', validators=[caption_len])
