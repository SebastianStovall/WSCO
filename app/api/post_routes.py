from flask import Blueprint, jsonify, session, request
from app.models import db, Post
from app.forms import PostForm, PostFormEdit
from app.forms import SignUpForm
from app.api.aws_helpers import upload_file_to_s3, get_unique_filename
from flask_login import current_user, login_user, logout_user, login_required

post_routes = Blueprint('posts', __name__)

@post_routes.route("/new", methods=["POST"])
@login_required
def create_post():

    form = PostForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():

        # creates aws thing
        photo = form.data["photoUrl"]
        # key in and assign file name
        photo.filename = get_unique_filename(photo.filename)
        upload = upload_file_to_s3(photo)

        if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when you tried to upload
        # so you send back that error message (and you printed it above)
            return jsonify(upload), 400

        url = upload["url"]

        new_post = Post(
            userId=current_user.id,
            photoUrl=url, # url from aws
            caption=form.data["caption"]
        )

        db.session.add(new_post)
        db.session.commit()
        return new_post.to_dict()
    else:
        return { "errors": form.errors }


@post_routes.route("/<int:postId>", methods=["PUT"])
@login_required
def edit_post(postId):

    form = PostFormEdit()
    postToEdit = Post.query.get(postId)

    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():

        photo = form.data["photoUrl"]
        if photo is not None:
            photo.filename = get_unique_filename(photo.filename)
            upload = upload_file_to_s3(photo)

            if "url" not in upload:
                return jsonify(upload), 400

            url = upload["url"]

            postToEdit.photoUrl = url
            postToEdit.caption = form.data["caption"]

            db.session.commit()
            return postToEdit.to_dict()

        else:
            postToEdit.caption = form.data["caption"]
            db.session.commit()
            return postToEdit.to_dict()

    else:
        return {"errors": form.errors}


@post_routes.route("/<int:postId>", methods=["DELETE"])
@login_required
def delete_post(postId):

    postToDelete = Post.query.get(postId)

    db.session.delete(postToDelete)
    db.session.commit()

    return "successfully deleted", 200
