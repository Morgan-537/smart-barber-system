from flask import Blueprint

from app.controllers.booking_controller import BookingController

booking_bp = Blueprint(
    "bookings",
    __name__,
    url_prefix="/api/bookings",
)


@booking_bp.route("", methods=["POST"])
def create_booking():
    return BookingController.create()


@booking_bp.route("", methods=["GET"])
def get_bookings():
    return BookingController.get_all()