from flask import Blueprint, jsonify, session, request
from app.models import db, Journal, JournalPhoto
from app.forms import JournalPhotoForm, JournalForm
from flask_login import current_user, login_user, logout_user, login_required
from app.api.aws_helpers import upload_file_to_s3, get_unique_filename
import time

journal_routes = Blueprint('journals', __name__)

@journal_routes.route("/new", methods=["POST"])
@login_required
def create_journal():

    current_user_id = current_user.id

    # FOR JOURNAL TABLE
    title = request.form.get("title")
    description = request.form.get("description")

    # need this if form1 successfully validates. needed for journal photos
    new_journal_id = None

    form1 = JournalForm(title=title, description=description)
    form1["csrf_token"].data = request.cookies["csrf_token"]
    if form1.validate():
        new_journal = Journal(
            title=form1.data["title"],
            description=form1.data["description"],
            userId=current_user_id
        )
        db.session.add(new_journal)
        db.session.commit()
        new_created_journal = new_journal.to_dict()
        new_journal_id = new_created_journal["id"]
    else:
        return {"errors": form1.errors}


    # FOR JOURNALPHOTO TABLE
    journal_photos_list = request.files.getlist("photoUrl")

    for image in journal_photos_list:
        form2 = JournalPhotoForm(photoUrl=image, journalId=new_journal_id)
        form2["csrf_token"].data = request.cookies["csrf_token"]
        if form2.validate():

            # creates aws thing
            photo = form2.data["photoUrl"]
            # key in and assign file name
            photo.filename = get_unique_filename(photo.filename)
            upload = upload_file_to_s3(photo)

            print("THIS IS THE PHOTO WE ARE TRYING TO UPLOAD", photo, photo.filename)

            if "url" not in upload:
                # if the dictionary doesn't have a url key
                # it means that there was an error when you tried to upload
                # so you send back that error message (and you printed it above)

                # DELETE JOURNAL ENTRY IF ERRORS
                print("ERROR UPLOADING IMAGE")
                delete_journal_entry = Journal.query.get(new_journal_id)
                db.session.delete(delete_journal_entry)
                db.session.commit()
                
                return jsonify(upload), 400

            url = upload["url"]

            new_journal_photo_entry = JournalPhoto(
                journalId = new_journal_id,
                photoUrl = url,
                caption = ""
            )

            db.session.add(new_journal_photo_entry)
            db.session.commit()

        else:
            # DELETE JOURNAL ENTRY IF ERRORS
            delete_journal_entry = Journal.query.get(new_journal_id)
            db.session.delete(delete_journal_entry)
            db.session.commit()

            print("ERRORS", form2.errors)
            return {"errors": form2.errors}

    journal_with_photos = Journal.query.get(new_journal_id)
    print("THIS SHOULD HAVE ALL OF THE IMAGES WITH IT", journal_with_photos.to_dict())
    return {"SUCCESS": "successfully created journal with attached images"}
