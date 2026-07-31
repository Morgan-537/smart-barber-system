from werkzeug.security import generate_password_hash, check_password_hash

from app.config.db import db
from app.models.base_model import BaseModel
from app.utils.constants import USER_ROLES, CUSTOMER


class User(BaseModel):
    """
    Represents every authenticated user in the Smart Barber System.

    Roles:
        - customer
        - barber
        - admin
    """

    __tablename__ = "users"

    full_name = db.Column(db.String(100), nullable=False)

    email = db.Column(
        db.String(120),
        unique=True,
        nullable=False,
        index=True
    )

    phone = db.Column(
        db.String(20),
        unique=True,
        nullable=False
    )

    password_hash = db.Column(
        db.String(255),
        nullable=False
    )

    role = db.Column(
        db.String(20),
        nullable=False,
        default=CUSTOMER
    )

    profile_image = db.Column(
        db.String(255),
        nullable=True
    )

    is_active = db.Column(
        db.Boolean,
        default=True,
        nullable=False
    )

    # -------------------------
    # Password Helpers
    # -------------------------

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    # -------------------------
    # Validation
    # -------------------------

    def is_valid_role(self):
        return self.role in USER_ROLES

    # -------------------------
    # Serialization
    # -------------------------

    def to_dict(self):
        return {
            "id": self.id,
            "full_name": self.full_name,
            "email": self.email,
            "phone": self.phone,
            "role": self.role,
            "profile_image": self.profile_image,
            "is_active": self.is_active,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat()
        }

    # -------------------------
    # Representation
    # -------------------------

    def __repr__(self):
        return f"<User {self.email}>"