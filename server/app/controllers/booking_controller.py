from flask import jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required

from app.schemas.booking_schema import BookingSchema
from app.services.booking_service import BookingService


class BookingController:
    """
    Handles all booking-related requests.
    """

    @staticmethod
    @jwt_required()
    def create():
        """
        Create a new booking for the authenticated customer.
        """
        data = request.get_json()

        if not data:
            return jsonify({
                "success": False,
                "message": "Request body is required."
            }), 400

        is_valid, error = BookingSchema.validate_booking(data)

        if not is_valid:
            return jsonify({
                "success": False,
                "message": error
            }), 400

        user_id = int(get_jwt_identity())

        response, status = BookingService.create_booking(
            user_id=user_id,
            data=data,
        )

        return jsonify(response), status

    @staticmethod
    @jwt_required()
    def get_all():
        """
        Return all bookings for the authenticated user.

        - Customers receive only their bookings.
        - Admins receive all bookings.
        """
        user_id = int(get_jwt_identity())

        response, status = BookingService.get_bookings(
            user_id=user_id
        )

        return jsonify(response), status

    @staticmethod
    @jwt_required()
    def get_options():
        """
        Return booking form options:
        - active barbers
        - available services
        """
        response, status = BookingService.get_booking_options()
        return jsonify(response), status