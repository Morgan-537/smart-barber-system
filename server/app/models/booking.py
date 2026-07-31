from app.config.db import db
from app.models.base_model import BaseModel


class Booking(BaseModel):
    """
    Represents a customer's appointment booking.
    """

    __tablename__ = "bookings"

    # If the customer is deleted, all their bookings are

    customer_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
    )

    barber_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
    )

    service_id = db.Column(
        db.Integer,
        db.ForeignKey("services.id", ondelete="CASCADE"),
        nullable=False,
    )

    booking_date = db.Column(db.Date, nullable=False)
    booking_time = db.Column(db.Time, nullable=False)

    status = db.Column(
        db.String(20),
        default="Pending",
        nullable=False,
    )

    notes = db.Column(db.Text)

    customer = db.relationship(
        "User",
        foreign_keys=[customer_id],
        backref="customer_bookings",
    )

    barber = db.relationship(
        "User",
        foreign_keys=[barber_id],
        backref="barber_bookings",
    )

    service = db.relationship(
        "Service",
        backref="bookings",
    )

    def to_dict(self):
        return {
            "id": self.id,
            "customer_id": self.customer_id,
            "barber_id": self.barber_id,
            "service_id": self.service_id,
            "booking_date": self.booking_date.isoformat(),
            "booking_time": self.booking_time.isoformat(),
            "status": self.status,
            "notes": self.notes,
        }

    def __repr__(self):
        return f"<Booking #{self.id}>"