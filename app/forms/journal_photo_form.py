from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import FieldList, StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import JournalPhoto
from app.api.aws_helpers import ALLOWED_EXTENSIONS

class JournalPhotoForm(FlaskForm):
    photoUrl = FieldList(FileField("Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))]), min_entries=3)
