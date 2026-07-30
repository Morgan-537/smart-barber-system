from flask import Blueprint

from app.controllers.payment_controller import PaymentController

payment_bp = Blueprint(
    "payments",
    __name__,
    url_prefix="/api/payments",
)

payment_bp.route(
    "",
    methods=["GET"],
)(PaymentController.history)

payment_bp.route(
    "/pay",
    methods=["POST"],
)(PaymentController.pay)