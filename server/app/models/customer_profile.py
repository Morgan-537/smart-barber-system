from app.config.db import db
from app.models.base_model import BaseModel


class CustomerProfile(BaseModel):
    """
    Stores additional information for customers.
    Each customer has one profile.
    """

    __tablename__ = "customer_profiles"

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        unique=True,
    )

    address = db.Column(db.String(255))
    emergency_contact = db.Column(db.String(100))
    emergency_phone = db.Column(db.String(20))
    preferences = db.Column(db.Text)

    user = db.relationship(
        "User",
        backref=db.backref(
            "customer_profile",
            uselist=False,
            cascade="all, delete-orphan",
        ),
    )

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "address": self.address,
            "emergency_contact": self.emergency_contact,
            "emergency_phone": self.emergency_phone,
            "preferences": self.preferences,
        }

    def __repr__(self):
        return f"<CustomerProfile User:{self.user_id}>"