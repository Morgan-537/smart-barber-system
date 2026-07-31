from app.config.db import db

from app.models.booking import Booking

from app.services.notification_service import NotificationService


class BarberService:
    """
    Business logic for barber operations.
    """

    @staticmethod
    def get_dashboard(barber_id):
        """
        Returns barber dashboard statistics.
        """

        total = Booking.query.filter_by(
            barber_id=barber_id
        ).count()

        pending = Booking.query.filter_by(
            barber_id=barber_id,
            status="Pending",
        ).count()

        approved = Booking.query.filter_by(
            barber_id=barber_id,
            status="Approved",
        ).count()

        completed = Booking.query.filter_by(
            barber_id=barber_id,
            status="Completed",
        ).count()

        recent_bookings = (
            Booking.query
            .filter_by(barber_id=barber_id)
            .order_by(Booking.booking_date.desc())
            .all()
        )

        return {
            "statistics": {
                "total_bookings": total,
                "pending": pending,
                "approved": approved,
                "completed": completed,
            },
            "bookings": [
                {
                    "id": booking.id,
                    "customer": booking.customer.full_name,
                    "service": booking.service.name,
                    "booking_date": booking.booking_date.isoformat(),
                    "booking_time": booking.booking_time.strftime("%H:%M"),
                    "status": booking.status,
                    "notes": booking.notes,
                }
                for booking in recent_bookings
            ],
        }

    @staticmethod
    def update_booking_status(
        barber_id,
        booking_id,
        status,
    ):
        """
        Barber updates booking status.
        """

        booking = Booking.query.filter_by(
            id=booking_id,
            barber_id=barber_id,
        ).first()

        if not booking:
            return {
                "success": False,
                "message": "Booking not found.",
            }, 404

        booking.status = status

        db.session.commit()

        NotificationService.create_notification(
            user_id=booking.customer_id,
            title=f"Booking {status}",
            message=(
                f"Your appointment on "
                f"{booking.booking_date} at "
                f"{booking.booking_time.strftime('%H:%M')} "
                f"has been {status.lower()}."
            ),
        )

        return {
            "success": True,
            "message": "Booking updated successfully.",
            "booking": {
                "id": booking.id,
                "status": booking.status,
            },
        }, 200