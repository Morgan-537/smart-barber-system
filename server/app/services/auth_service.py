from flask_jwt_extended import create_access_token

from app.config.db import db
from app.models.user import User


class AuthService:
    """
    Handles authentication business logic.
    """

    @staticmethod
    def register_user(data):
        """
        Register a new customer account.
        """

        # Check if email already exists
        existing_user = User.query.filter_by(
            email=data["email"]
        ).first()

        if existing_user:
            return {
                "success": False,
                "message": "Email is already registered."
            }, 409

        # Check if phone already exists
        existing_phone = User.query.filter_by(
            phone=data["phone"]
        ).first()

        if existing_phone:
            return {
                "success": False,
                "message": "Phone number is already registered."
            }, 409

        # Create user
        user = User(
            full_name=data["full_name"],
            email=data["email"],
            phone=data["phone"],
            role=data.get("role", "customer")
        )

        user.set_password(data["password"])

        db.session.add(user)
        db.session.commit()

        return {
            "success": True,
            "message": "User registered successfully.",
            "user": user.to_dict()
        }, 201

    @staticmethod
    def login_user(data):
        """
        Authenticate a user and return a JWT access token.
        """

        user = User.query.filter_by(
            email=data["email"]
        ).first()

        if not user:
            return {
                "success": False,
                "message": "Invalid email or password."
            }, 401

        if not user.check_password(data["password"]):
            return {
                "success": False,
                "message": "Invalid email or password."
            }, 401

        access_token = create_access_token(
            identity=str(user.id),
            additional_claims={
                "role": user.role
            }
        )

        return {
            "success": True,
            "message": "Login successful.",
            "access_token": access_token,
            "user": user.to_dict()
        }, 200

    @staticmethod
    def get_current_user(user_id):
        """
        Retrieve the currently authenticated user.
        """

        user = User.query.get(user_id)

        if not user:
            return {
                "success": False,
                "message": "User not found."
            }, 404

        return {
            "success": True,
            "user": user.to_dict()
        }, 200