from flask import Blueprint

from app.controllers.admin_controller import AdminController

admin_bp = Blueprint(
    "admin",
    __name__,
    url_prefix="/api/admin",
)

# Dashboard
admin_bp.route(
    "/dashboard",
    methods=["GET"],
)(AdminController.dashboard)

# Users
admin_bp.route(
    "/users",
    methods=["GET"],
)(AdminController.users)

# Bookings
admin_bp.route(
    "/bookings",
    methods=["GET"],
)(AdminController.bookings)

admin_bp.route(
    "/bookings/<int:booking_id>/status",
    methods=["PATCH"],
)(AdminController.update_booking_status)

# Services
admin_bp.route(
    "/services",
    methods=["GET"],
)(AdminController.services)

admin_bp.route(
    "/services",
    methods=["POST"],
)(AdminController.create_service)

admin_bp.route(
    "/services/<int:service_id>",
    methods=["PATCH"],
)(AdminController.update_service)

admin_bp.route(
    "/services/<int:service_id>",
    methods=["DELETE"],
)(AdminController.delete_service)

# Payments
admin_bp.route(
    "/payments",
    methods=["GET"],
)(AdminController.payments)