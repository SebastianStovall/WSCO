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

    journalForm = JournalForm(title=title, description=description)
    journalForm["csrf_token"].data = request.cookies["csrf_token"]

    if journalForm.validate():
        new_journal = Journal(
            title=journalForm.data["title"],
            description=journalForm.data["description"],
            userId=current_user_id
        )

        db.session.add(new_journal)
        db.session.commit()

        new_created_journal = new_journal.to_dict()
        new_journal_id = new_created_journal["id"]
    else:
        return {"errors": journalForm.errors}


    # FOR JOURNALPHOTO TABLE
    journal_photos_list = request.files.getlist("photoUrl")
    photosForm = JournalPhotoForm()
    photosForm["csrf_token"].data = request.cookies["csrf_token"]

    # Clear the existing entries to avoid empty entries. kept getting random None values?
    photosForm.photoUrl.entries = []

    for image in journal_photos_list:
        photosForm.photoUrl.append_entry(image)

    # for image in photosForm.photoUrl.entries:
    #         print("THIS IS THE IMAGE ENTRY DATA ------------------------------------------------", image.data)

    if photosForm.validate():

        for image in photosForm.photoUrl.entries:
            print("THIS IS THE IMAGE ENTRY DATA", image.data)
            image = image.data
            photo = image

            # key in and assign file name
            photo.filename = get_unique_filename(photo.filename)
            upload = upload_file_to_s3(photo)

            if "url" not in upload:

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
        print("THIS DID NOT VALIDATEEEEEEEEEEEEEEEEEEEEEEEEEEEE")
        # DELETE JOURNAL ENTRY IF ERRORS
        delete_journal_entry = Journal.query.get(new_journal_id)
        db.session.delete(delete_journal_entry)
        db.session.commit()

        # print("ERRORS", photosForm.errors)
        return {"errors": photosForm.errors}

    journal_with_photos = Journal.query.get(new_journal_id)
    print("THIS SHOULD HAVE ALL OF THE IMAGES WITH IT", journal_with_photos.to_dict())
    return {"SUCCESS": "successfully created journal with images"}
