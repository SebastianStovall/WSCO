from flask import Blueprint, jsonify, session, request
from app.models import User, db, Post
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

post_routes = Blueprint('posts', __name__)

@post_routes.route("/<int:postId>", methods=["DELETE"])
@login_required
def delete_post(postId):

    print("POSTIDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD", postId)
    postToDelete = Post.query.get(postId)

    db.session.delete(postToDelete)
    db.session.commit()
    return "successfully deleted"
