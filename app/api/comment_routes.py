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

    return new_comment.to_dict()


@comment_routes.route("/<int:commentId>", methods=["PUT"])
@login_required
def edit_comment(commentId):

    data = request.get_json()
    request_comment = data.get('comment')
    comment_to_edit = Comment.query.get(commentId)

    comment_to_edit.comment = request_comment
    db.session.commit()

    return comment_to_edit.to_dict()


@comment_routes.route("/<int:commentId>", methods=["DELETE"])
@login_required
def delete_comment(commentId):

    print("ASDASDASDASDASDASD", commentId)
    comment_to_delete = Comment.query.get(commentId)

    db.session.delete(comment_to_delete)
    db.session.commit()

    return "successfully deleted", 200
