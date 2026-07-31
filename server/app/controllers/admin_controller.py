from flask import jsonify, request
from flask_jwt_extended import jwt_required

from app.middleware.role_required import role_required
from app.services.admin_service import AdminService


class AdminController:
    """
    Handles all administrator operations.
    """

    # ==========================================================
    # Dashboard
    # ==========================================================

    @staticmethod
    @jwt_required()
    @role_required("admin")
    def dashboard():
        """
        Return dashboard statistics.
        """
        data = AdminService.get_dashboard_summary()

        return jsonify(data), 200

    # ==========================================================
    # Users
    # ==========================================================

    @staticmethod
    @jwt_required()
    @role_required("admin")
    def users():
        """
        Return all users.
        """
        users = AdminService.get_all_users()

        return jsonify({
            "success": True,
            "users": [
                {
                    "id": user.id,
                    "full_name": user.full_name,
                    "email": user.email,
                    "phone": user.phone,
                    "role": user.role,
                    "is_active": user.is_active,
                }
                for user in users
            ],
        }), 200

    # ==========================================================
    # Bookings
    # ==========================================================

    @staticmethod
    @jwt_required()
    @role_required("admin")
    def bookings():
        """
        Return every booking in the system.
        """
        bookings = AdminService.get_all_bookings()

        return jsonify({
            "success": True,
            "bookings": [
                {
                    "id": booking.id,
                    "customer": (
                        booking.customer.full_name
                        if booking.customer
                        else "N/A"
                    ),
                    "barber": (
                        booking.barber.full_name
                        if booking.barber
                        else "N/A"
                    ),
                    "service": (
                        booking.service.name
                        if booking.service
                        else "N/A"
                    ),
                    "booking_date": booking.booking_date.isoformat(),
                    "booking_time": booking.booking_time.strftime("%H:%M"),
                    "status": booking.status,
                    "notes": booking.notes,
                }
                for booking in bookings
            ],
        }), 200

    @staticmethod
    @jwt_required()
    @role_required("admin")
    def update_booking_status(booking_id):
        """
        Update booking status.
        """

        data = request.get_json()

        if not data:
            return jsonify({
                "success": False,
                "message": "Request body is required.",
            }), 400

        if "status" not in data:
            return jsonify({
                "success": False,
                "message": "Booking status is required.",
            }), 400

        response, status_code = AdminService.update_booking_status(
            booking_id,
            data["status"],
        )

        return jsonify(response), status_code

    # ==========================================================
    # Services
    # ==========================================================

    @staticmethod
    @jwt_required()
    @role_required("admin")
    def services():
        """
        Return all services.
        """
        services = AdminService.get_all_services()

        return jsonify({
            "success": True,
            "services": [
                service.to_dict()
                for service in services
            ],
        }), 200

    @staticmethod
    @jwt_required()
    @role_required("admin")
    def create_service():
        """
        Create a new service.
        """

        data = request.get_json()

        if not data:
            return jsonify({
                "success": False,
                "message": "Request body is required.",
            }), 400

        response, status_code = AdminService.create_service(data)

        return jsonify(response), status_code

    @staticmethod
    @jwt_required()
    @role_required("admin")
    def update_service(service_id):
        """
        Update an existing service.
        """

        data = request.get_json()

        if not data:
            return jsonify({
                "success": False,
                "message": "Request body is required.",
            }), 400

        response, status_code = AdminService.update_service(
            service_id,
            data,
        )

        return jsonify(response), status_code

    @staticmethod
    @jwt_required()
    @role_required("admin")
    def delete_service(service_id):
        """
        Delete a service.
        """

        response, status_code = AdminService.delete_service(service_id)

        return jsonify(response), status_code

    # ==========================================================
    # Payments
    # ==========================================================

    @staticmethod
    @jwt_required()
    @role_required("admin")
    def payments():
        """
        Return every payment made in the system.
        """
        payments = AdminService.get_all_payments()

        return jsonify({
            "success": True,
            "payments": [
                payment.to_dict()
                for payment in payments
            ],
        }), 200