from app.config.db import db
from app.models.base_model import BaseModel


class Payment(BaseModel):
    """
    Stores payment information for bookings.
    """

    __tablename__ = "payments"

    booking_id = db.Column(
        db.Integer,
        db.ForeignKey("bookings.id", ondelete="CASCADE"),
        nullable=False,
    )

    amount = db.Column(db.Numeric(10, 2), nullable=False)

    payment_method = db.Column(
        db.String(50),
        nullable=False,
    )

    payment_status = db.Column(
        db.String(20),
        default="Pending",
        nullable=False,
    )

    transaction_code = db.Column(
        db.String(100),
        unique=True,
        nullable=True,
    )

    booking = db.relationship(
        "Booking",
        backref="payments",
    )

    def to_dict(self):
        return {
            "id": self.id,
            "booking_id": self.booking_id,
            "amount": float(self.amount),
            "payment_method": self.payment_method,
            "payment_status": self.payment_status,
            "transaction_code": self.transaction_code,
        }

    def __repr__(self):
        return f"<Payment #{self.id}>"