from flask import Blueprint, jsonify, session, request
from app.models import db, Comment
# from app.forms import PostForm
# from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

comment_routes = Blueprint('comments', __name__)

@comment_routes.route("/new", methods=["POST"])
@login_required
def create_comment():

    data = request.get_json()
    comment_text = data.get('comment')
    post_id = data.get('postId')
    user_id = data.get('userId')

    new_comment = Comment(
        comment=comment_text,
        userId=user_id,
        postId=post_id
    )

    db.session.add(new_comment)
    db.session.commit()

    print("THIS SHOULD BE THE NEW COMMENT", new_comment.to_dict())
    return new_comment.to_dict()
