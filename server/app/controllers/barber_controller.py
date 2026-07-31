from flask import jsonify, request

from flask_jwt_extended import (
    get_jwt_identity,
    jwt_required,
)

from app.middleware.role_required import role_required

from app.services.barber_service import BarberService


class BarberController:
    """
    Handles barber requests.
    """

    @staticmethod
    @jwt_required()
    @role_required("barber")
    def dashboard():
        """
        Returns dashboard statistics for the logged-in barber.
        """

        barber_id = get_jwt_identity()

        data = BarberService.get_dashboard(barber_id)

        return jsonify(data), 200

    @staticmethod
    @jwt_required()
    @role_required("barber")
    def update_booking_status(booking_id):
        """
        Update appointment status.
        """

        barber_id = get_jwt_identity()

        data = request.get_json()

        if not data or "status" not in data:
            return jsonify({
                "success": False,
                "message": "Status is required.",
            }), 400

        response, status_code = (
            BarberService.update_booking_status(
                barber_id,
                booking_id,
                data["status"],
            )
        )

        return jsonify(response), status_code