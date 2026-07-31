from flask import jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required

from app.services.payment_service import PaymentService


class PaymentController:
    """
    Handles customer payments.
    """

    @staticmethod
    @jwt_required()
    def history():
        """
        Return payment history for the authenticated customer.
        """
        user_id = int(get_jwt_identity())
        response, status = PaymentService.get_customer_payments(user_id)
        return jsonify(response), status

    @staticmethod
    @jwt_required()
    def pay():
        """
        Process a booking payment.
        """
        data = request.get_json()

        if not data:
            return jsonify({
                "success": False,
                "message": "Request body is required."
            }), 400

        booking_id = data.get("booking_id")

        if not booking_id:
            return jsonify({
                "success": False,
                "message": "booking_id is required."
            }), 400

        response, status = PaymentService.pay_for_booking(
            booking_id=booking_id,
            payment_method="KCB Buni",
        )

        return jsonify(response), status