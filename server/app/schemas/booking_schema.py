from datetime import datetime


class BookingSchema:
    """
    Validates booking requests.
    """

    @staticmethod
    def validate_booking(data):
        required_fields = [
            "barber_id",
            "service_id",
            "booking_date",
            "booking_time",
        ]

        for field in required_fields:
            if not data.get(field):
                return False, f"{field} is required."

        try:
            datetime.strptime(data["booking_date"], "%Y-%m-%d")
        except ValueError:
            return False, "booking_date must be YYYY-MM-DD."

        try:
            datetime.strptime(data["booking_time"], "%H:%M")
        except ValueError:
            return False, "booking_time must be HH:MM."

        return True, None