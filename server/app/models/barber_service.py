from app.config.db import db
from app.models.base_model import BaseModel


class BarberService(BaseModel):
    """
    Maps barbers to the services they offer.
    """

    __tablename__ = "barber_services"

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

    barber = db.relationship("User", backref="barber_services")
    service = db.relationship("Service", backref="assigned_barbers")

    def __repr__(self):
        return f"<BarberService Barber:{self.barber_id} Service:{self.service_id}>"