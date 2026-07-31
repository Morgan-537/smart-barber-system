from datetime import datetime
import random
import string

from app.config.db import db

from app.models.booking import Booking
from app.models.payment import Payment
from app.services.notification_service import NotificationService


class PaymentService:
    """
    Handles customer payments.
    Simulates a KCB Buni payment gateway.
    """

    @staticmethod
    def generate_reference():
        """
        Example:
        BUNI-20260730-8F2QXK
        """

        today = datetime.now().strftime("%Y%m%d")

        random_code = "".join(
            random.choices(
                string.ascii_uppercase + string.digits,
                k=6,
            )
        )

        return f"BUNI-{today}-{random_code}"

    @staticmethod
    def pay_for_booking(
        booking_id,
        payment_method="KCB Buni",
    ):
        """
        Process a payment for a booking.
        """

        booking = Booking.query.get(booking_id)

        if booking is None:
            return {
                "success": False,
                "message": "Booking not found.",
            }, 404

        if booking.service is None:
            return {
                "success": False,
                "message": "Booking has no service attached.",
            }, 400

        existing_payment = Payment.query.filter_by(
            booking_id=booking.id,
            payment_status="Paid",
        ).first()

        if existing_payment:
            return {
                "success": False,
                "message": "This booking has already been paid.",
            }, 400

        payment = Payment(
            booking_id=booking.id,
            amount=booking.service.price,
            payment_method=payment_method,
            payment_status="Paid",
            transaction_code=PaymentService.generate_reference(),
        )

        db.session.add(payment)

        booking.status = "Approved"

        db.session.commit()

        NotificationService.create_notification(
            user_id=booking.customer_id,
            title="Payment Successful",
            message=(
                f"Your payment for "
                f"{booking.service.name} "
                f"has been received.\n"
                f"Reference: {payment.transaction_code}"
            ),
        )

        return {
            "success": True,
            "message": "Payment processed successfully through KCB Buni.",
            "payment": payment.to_dict(),
        }, 200

    @staticmethod
    def get_customer_payments(user_id):
        """
        Return all payments belonging to the authenticated customer.
        """

        payments = (
            Payment.query
            .join(Booking)
            .filter(Booking.customer_id == user_id)
            .order_by(Payment.created_at.desc())
            .all()
        )

        return {
            "success": True,
            "payments": [
                {
                    **payment.to_dict(),
                    "service": payment.booking.service.name,
                    "booking_date": payment.booking.booking_date.isoformat(),
                    "booking_time": payment.booking.booking_time.strftime("%H:%M"),
                }
                for payment in payments
            ]
        }, 200