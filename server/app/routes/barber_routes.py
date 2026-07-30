from flask import Blueprint

from app.controllers.barber_controller import (
    BarberController,
)

barber_bp = Blueprint(
    "barber",
    __name__,
    url_prefix="/api/barber",
)

barber_bp.route(
    "/dashboard",
    methods=["GET"],
)(
    BarberController.dashboard
)

barber_bp.route(
    "/bookings/<int:booking_id>/status",
    methods=["PATCH"],
)(
    BarberController.update_booking_status
)