from app.config.db import db
from app.models.base_model import BaseModel


class Service(BaseModel):
    """
    Services offered by the barbershop.
    """

    __tablename__ = "services"

    # Must be unique to prevent duplicate service entries.

    name = db.Column(
        db.String(100),
        unique=True,
        nullable=False,
    )

    description = db.Column(
        db.Text,
        nullable=True,
    )

    duration = db.Column(
        db.Integer,
        nullable=False,
    )  # Duration in minutes

    price = db.Column(
        db.Numeric(10, 2),
        nullable=False,
    )

    is_available = db.Column(
        db.Boolean,
        default=True,
        nullable=False,
    )

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "duration": self.duration,
            "price": float(self.price),
            "is_available": self.is_available,
        }

    def __repr__(self):
        return f"<Service {self.name}>"