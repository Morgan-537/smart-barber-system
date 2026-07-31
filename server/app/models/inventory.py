from app.config.db import db
from app.models.base_model import BaseModel


class Inventory(BaseModel):
    """
    Stores inventory items used in the barbershop.
    """

    __tablename__ = "inventory"

    product_name = db.Column(
        db.String(100),
        nullable=False,
        unique=True,
    )

    quantity = db.Column(
        db.Integer,
        nullable=False,
        default=0,
    )

    unit_price = db.Column(
        db.Numeric(10, 2),
        nullable=False,
    )

    reorder_level = db.Column(
        db.Integer,
        nullable=False,
        default=5,
    )

    updated_by = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False,
    )

    updated_by_user = db.relationship(
        "User",
        backref="inventory_updates",
    )

    def to_dict(self):
        return {
            "id": self.id,
            "product_name": self.product_name,
            "quantity": self.quantity,
            "unit_price": float(self.unit_price),
            "reorder_level": self.reorder_level,
            "updated_by": self.updated_by,
        }

    def __repr__(self):
        return f"<Inventory {self.product_name}>"


            /* this is a comment */