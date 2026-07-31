from app.config.db import db
from app.models.base_model import BaseModel


class Review(BaseModel):
    """
    Stores customer reviews after completed bookings.
    """

    __tablename__ = "reviews"

    booking_id = db.Column(
        db.Integer,
        db.ForeignKey("bookings.id", ondelete="CASCADE"),
        nullable=False,
        unique=True,
    )

    rating = db.Column(
        db.Integer,
        nullable=False,
    )

    comment = db.Column(
        db.Text,
        nullable=True,
    )

    booking = db.relationship(
        "Booking",
        backref=db.backref(
            "review",
            uselist=False,
            cascade="all, delete-orphan",
        ),
    )

    def to_dict(self):
        return {
            "id": self.id,
            "booking_id": self.booking_id,
            "rating": self.rating,
            "comment": self.comment,
        }

    def __repr__(self):
        return f"<Review #{self.id}>"