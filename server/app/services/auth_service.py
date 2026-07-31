from flask_jwt_extended import create_access_token
from sqlalchemy.exc import SQLAlchemyError

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

        existing_user = User.query.filter_by(
            email=data["email"]
        ).first()

        if existing_user:
            return {
                "success": False,
                "message": "Email is already registered."
            }, 409

        existing_phone = User.query.filter_by(
            phone=data["phone"]
        ).first()

        if existing_phone:
            return {
                "success": False,
                "message": "Phone number is already registered."
            }, 409

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

    @staticmethod
    def update_current_user(user_id, data):
        """
        Update the currently authenticated user's profile.
        """
        try:
            user = User.query.get(user_id)

            if not user:
                return {
                    "success": False,
                    "message": "User not found."
                }, 404

            full_name = data.get("full_name")
            email = data.get("email")
            phone = data.get("phone")
            password = data.get("password")

            if full_name is None and email is None and phone is None and not password:
                return {
                    "success": False,
                    "message": "No update data provided."
                }, 400

            if full_name is not None:
                full_name = full_name.strip()
                if not full_name:
                    return {
                        "success": False,
                        "message": "Full name cannot be empty."
                    }, 400
                user.full_name = full_name

            if email is not None:
                email = email.strip().lower()
                if not email:
                    return {
                        "success": False,
                        "message": "Email cannot be empty."
                    }, 400

                existing_email = User.query.filter(
                    User.email == email,
                    User.id != user.id
                ).first()

                if existing_email:
                    return {
                        "success": False,
                        "message": "Email is already registered."
                    }, 409

                user.email = email

            if phone is not None:
                phone = phone.strip()
                if not phone:
                    return {
                        "success": False,
                        "message": "Phone number cannot be empty."
                    }, 400

                existing_phone = User.query.filter(
                    User.phone == phone,
                    User.id != user.id
                ).first()

                if existing_phone:
                    return {
                        "success": False,
                        "message": "Phone number is already registered."
                    }, 409

                user.phone = phone

            if password:
                if len(password) < 6:
                    return {
                        "success": False,
                        "message": "Password must be at least 6 characters long."
                    }, 400

                user.set_password(password)

            db.session.commit()

            return {
                "success": True,
                "message": "Profile updated successfully.",
                "user": user.to_dict()
            }, 200

        except SQLAlchemyError:
            db.session.rollback()
            return {
                "success": False,
                "message": "Database error while updating profile."
            }, 500

        except Exception:
            db.session.rollback()
            return {
                "success": False,
                "message": "An unexpected error occurred."
            }, 500