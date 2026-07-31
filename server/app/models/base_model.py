from datetime import datetime
from app.config.db import db


class BaseModel(db.Model):
    """
    Abstract base model inherited by all database models.
    Provides common fields shared across the application.
    """

    __abstract__ = True

    id = db.Column(db.Integer, primary_key=True)

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        nullable=False
    )

    updated_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False
    )

    def save(self):
        """Save the current object."""
        db.session.add(self)
        db.session.commit()

    def delete(self):
        """Delete the current object."""
        db.session.delete(self)
        db.session.commit()