from app.config.db import db
from app.models.base_model import BaseModel


class Notification(BaseModel):
    """
    Stores notifications sent to users.
    """

    __tablename__ = "notifications"

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
    )

    title = db.Column(
        db.String(150),
        nullable=False,
    )

    message = db.Column(
        db.Text,
        nullable=False,
    )

    is_read = db.Column(
        db.Boolean,
        default=False,
        nullable=False,
    )

    user = db.relationship(
        "User",
        backref="notifications",
    )

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "title": self.title,
            "message": self.message,
            "is_read": self.is_read,
        }

    def __repr__(self):
        return f"<Notification #{self.id}>"