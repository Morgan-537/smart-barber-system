from flask import jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required

from app.schemas.auth_schema import AuthSchema
from app.services.auth_service import AuthService


class AuthController:
    """
    Handles authentication requests.
    """

    @staticmethod
    def register():
        data = request.get_json()

        if not data:
            return jsonify({
                "success": False,
                "message": "Request body is required."
            }), 400

        is_valid, error = AuthSchema.validate_registration(data)

        if not is_valid:
            return jsonify({
                "success": False,
                "message": error
            }), 400

        response, status = AuthService.register_user(data)

        return jsonify(response), status

    @staticmethod
    def login():
        data = request.get_json()

        if not data:
            return jsonify({
                "success": False,
                "message": "Request body is required."
            }), 400

        is_valid, error = AuthSchema.validate_login(data)

        if not is_valid:
            return jsonify({
                "success": False,
                "message": error
            }), 400

        response, status = AuthService.login_user(data)

        return jsonify(response), status

    @staticmethod
    @jwt_required()
    def me():
        """
        Return the currently authenticated user.
        """
        
        user_id = get_jwt_identity()

        response, status = AuthService.get_current_user(user_id)

        return jsonify(response), status