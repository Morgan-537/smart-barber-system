from flask import jsonify
from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity,
)

from app.services.notification_service import NotificationService


class NotificationController:
    """
    Handles notification requests.
    """

    @staticmethod
    @jwt_required()
    def get_all():
        user_id = int(get_jwt_identity())

        response, status = (
            NotificationService.get_notifications(user_id)
        )

        return jsonify(response), status

    @staticmethod
    @jwt_required()
    def mark_as_read(notification_id):
        user_id = int(get_jwt_identity())

        response, status = (
            NotificationService.mark_as_read(
                notification_id,
                user_id,
            )
        )

        return jsonify(response), status