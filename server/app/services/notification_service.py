from app.config.db import db
from app.models.notification import Notification


class NotificationService:
    """
    Handles notification business logic.
    """

    @staticmethod
    def get_notifications(user_id):
        """
        Retrieve all notifications for a user.
        """

        notifications = (
            Notification.query
            .filter_by(user_id=user_id)
            .order_by(Notification.created_at.desc())
            .all()
        )

        return {
            "success": True,
            "notifications": [
                notification.to_dict()
                for notification in notifications
            ]
        }, 200

    @staticmethod
    def mark_as_read(notification_id, user_id):
        """
        Mark a notification as read.
        """

        notification = Notification.query.filter_by(
            id=notification_id,
            user_id=user_id
        ).first()

        if not notification:
            return {
                "success": False,
                "message": "Notification not found."
            }, 404

        notification.is_read = True
        db.session.commit()

        return {
            "success": True,
            "message": "Notification marked as read.",
            "notification": notification.to_dict()
        }, 200

    @staticmethod
    def create_notification(user_id, title, message):
        """
        Create a notification for a user.
        """

        print("Creating notification record...")

        notification = Notification(
            user_id=user_id,
            title=title,
            message=message,
        )

        db.session.add(notification)
        db.session.commit()

        print(f"Notification #{notification.id} created successfully.")

        return notification