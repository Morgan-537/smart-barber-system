from datetime import datetime

from flask_jwt_extended import get_jwt

from app.config.db import db
from app.models.booking import Booking


class BookingService:
    """
    Handles booking business logic.
    """

    @staticmethod
    def create_booking(user_id, data):
        booking = Booking(
            customer_id=user_id,
            barber_id=data["barber_id"],
            service_id=data["service_id"],
            booking_date=datetime.strptime(
                data["booking_date"], "%Y-%m-%d"
            ).date(),
            booking_time=datetime.strptime(
                data["booking_time"], "%H:%M"
            ).time(),
            notes=data.get("notes"),
        )

        db.session.add(booking)
        db.session.commit()

        return {
            "success": True,
            "message": "Booking created successfully.",
            "booking": booking.to_dict(),
        }, 201

    @staticmethod
    def get_bookings(user_id):
        claims = get_jwt()

        if claims["role"] == "admin":
            bookings = Booking.query.all()
        else:
            bookings = Booking.query.filter_by(
                customer_id=user_id
            ).all()

        return {
            "success": True,
            "bookings": [
                booking.to_dict() for booking in bookings
            ],
        }, 200