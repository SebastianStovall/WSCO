from flask import Blueprint, jsonify, session, request
from app.models import db, collections_association
from flask_login import current_user, login_user, logout_user, login_required
from sqlalchemy import insert, delete

collection_routes = Blueprint('collections', __name__)

@collection_routes.route("/add", methods=["POST"])
@login_required
def add_to_user_collection():

    data = request.get_json()

    postId = data.get("postId")
    userId = current_user.id

    if postId is None:
        return {"error": "Missing postId"}, 400

    new_entry = insert(collections_association).values(userId=userId, postId=postId)
    db.session.execute(new_entry)
    db.session.commit()

    return {"message": "Added to collection successfully"}, 200


@collection_routes.route("/<int:postId>", methods=["DELETE"])
@login_required
def remove_from_user_collection(postId):

    userId = current_user.id

    if postId is None:
        return {"error": "Missing postId"}, 400

    entry_to_delete = delete(collections_association).where(
        (collections_association.c.userId == userId) &
        (collections_association.c.postId == postId)
    )

    db.session.execute(entry_to_delete)
    db.session.commit()

    return {"message": "Removed from collection successfully"}, 200
