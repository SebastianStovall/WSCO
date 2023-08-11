from flask import Blueprint, jsonify, session, request
from app.models import db, Post
from app.forms import PostForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

post_routes = Blueprint('posts', __name__)

@post_routes.route("/new", methods=["POST"])
@login_required
def create_post():

    form = PostForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        new_post = Post(
            userId=current_user.id,
            photoUrl=form.data["photoUrl"],
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

    form = PostForm()
    postToEdit = Post.query.get(postId)

    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():

        postToEdit.photoUrl = form.data["photoUrl"]
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
