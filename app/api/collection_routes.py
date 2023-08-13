from flask import Blueprint, jsonify, session, request
from app.models import db, collections_association
from flask_login import current_user, login_user, logout_user, login_required
from sqlalchemy import insert

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
