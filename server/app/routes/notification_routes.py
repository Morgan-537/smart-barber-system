from flask import Blueprint

from app.controllers.notification_controller import (
    NotificationController,
)

notification_bp = Blueprint(
    "notifications",
    __name__,
    url_prefix="/api/notifications",
)


@notification_bp.route("", methods=["GET"])
def get_notifications():
    return NotificationController.get_all()


@notification_bp.route(
    "/<int:notification_id>/read",
    methods=["PATCH"],
)
def mark_notification(notification_id):
    return NotificationController.mark_as_read(
        notification_id
    )