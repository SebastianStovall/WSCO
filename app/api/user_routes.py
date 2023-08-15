from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, db
from app.forms import ManageForm, ManageFormPassword

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return [user.to_dict() for user in users]

@user_routes.route("/account", methods=["PUT"])
@login_required
def manage_account():
    """
    Logged in Users can manage their account on a separate my profile page.
    User can edit their information here besides password.
    """

    curr_user_id = current_user.id
    user = User.query.get(curr_user_id)

    form = ManageForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        # YOU NEED TO USE DOT NOTATION, OTHERWISE YOU GET A TYPE ERROR: "USER" OBJECT NOT SUBSCRIPTABLE
        user.email = form.data["email"]
        user.firstName = form.data["firstName"]
        user.lastName = form.data["lastName"]
        user.username = form.data["username"]
        user.profileBio = form.data["profileBio"]
        user.profileImgUrl = form.data["profileImgUrl"]

        db.session.commit()
        return user.to_dict()

    else:
        return { "errors": form.errors }


@user_routes.route("/account/password", methods=["PUT"])
@login_required
def manage_account_password():
    """
    Logged in Users can manage their account on a separate my profile page.
    User can edit their information for their password.
    """

    curr_user_id = current_user.id
    user = User.query.get(curr_user_id)

    form = ManageFormPassword()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        # YOU NEED TO USE DOT NOTATION, OTHERWISE YOU GET A TYPE ERROR: "USER" OBJECT NOT SUBSCRIPTABLE
        user.password = form.data["password"]

        db.session.commit()
        return user.to_dict()

    else:
        return { "errors": form.errors }


@user_routes.route("/delete", methods=["DELETE"])
@login_required
def delete_user():
    """
    From separate my profile page for User account management.
    Button opens a modal for confirmation of delete of User account.
    """
    curr_user_id = current_user.id
    user = User.query.get(curr_user_id)

    db.session.delete(user)
    db.session.commit()
    return "successfully deleted"


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()
