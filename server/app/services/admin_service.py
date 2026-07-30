from decimal import Decimal, InvalidOperation

from sqlalchemy.exc import SQLAlchemyError

from app.config.db import db
from app.models.user import User
from app.models.booking import Booking
from app.models.service import Service
from app.models.payment import Payment
from app.models.inventory import Inventory
from app.services.notification_service import NotificationService


class AdminService:
    """
    Business logic for the admin dashboard.
    """

    @staticmethod
    def get_dashboard_summary():
        stats = {
            "total_users": User.query.count(),
            "total_barbers": User.query.filter_by(role="barber").count(),
            "total_bookings": Booking.query.count(),
            "total_services": Service.query.count(),
            "total_payments": Payment.query.count(),
            "total_inventory_items": Inventory.query.count(),
        }

        recent_bookings = (
            Booking.query
            .order_by(Booking.created_at.desc())
            .limit(5)
            .all()
        )

        bookings = [
            {
                "id": booking.id,
                "customer": booking.customer.full_name if booking.customer else None,
                "barber": booking.barber.full_name if booking.barber else None,
                "service": booking.service.name if booking.service else None,
                "booking_date": booking.booking_date.isoformat(),
                "booking_time": booking.booking_time.strftime("%H:%M"),
                "status": booking.status,
            }
            for booking in recent_bookings
        ]

        return {
            "statistics": stats,
            "recent_bookings": bookings,
        }

    @staticmethod
    def get_all_users():
        return (
            User.query
            .order_by(User.created_at.desc())
            .all()
        )

    @staticmethod
    def get_all_bookings():
        return (
            Booking.query
            .order_by(Booking.created_at.desc())
            .all()
        )

    @staticmethod
    def get_all_services():
        return (
            Service.query
            .order_by(Service.created_at.desc())
            .all()
        )

    @staticmethod
    def get_all_payments():
        return (
            Payment.query
            .order_by(Payment.created_at.desc())
            .all()
        )

    @staticmethod
    def update_booking_status(booking_id, status):
        """
        Update booking status and notify the customer.
        """
        booking = Booking.query.get(booking_id)

        if not booking:
            return {
                "success": False,
                "message": "Booking not found.",
            }, 404

        allowed_statuses = {
            "Pending",
            "Approved",
            "Rejected",
            "Completed",
            "Cancelled",
        }

        if status not in allowed_statuses:
            return {
                "success": False,
                "message": "Invalid booking status.",
            }, 400

        booking.status = status
        db.session.commit()

        notification_title_map = {
            "Approved": "Booking Approved",
            "Rejected": "Booking Rejected",
            "Completed": "Booking Completed",
            "Cancelled": "Booking Cancelled",
            "Pending": "Booking Updated",
        }

        NotificationService.create_notification(
            user_id=booking.customer_id,
            title=notification_title_map.get(status, "Booking Updated"),
            message=(
                f"Your booking scheduled for "
                f"{booking.booking_date} at "
                f"{booking.booking_time.strftime('%H:%M')} "
                f"has been {status.lower()}."
            ),
        )

        return {
            "success": True,
            "message": "Booking updated successfully.",
            "booking": {
                "id": booking.id,
                "status": booking.status,
            },
        }, 200

    @staticmethod
    def create_service(data):
        """
        Create a new service.
        """
        try:
            name = (data.get("name") or "").strip()
            description = data.get("description")
            duration = int(data.get("duration"))
            price = Decimal(str(data.get("price")))
            is_available = data.get("is_available", True)

            if not name:
                return {
                    "success": False,
                    "message": "Service name is required.",
                }, 400

            if duration <= 0:
                return {
                    "success": False,
                    "message": "Service duration must be greater than 0.",
                }, 400

            if price < 0:
                return {
                    "success": False,
                    "message": "Service price cannot be negative.",
                }, 400

            existing_service = Service.query.filter_by(name=name).first()
            if existing_service:
                return {
                    "success": False,
                    "message": "A service with that name already exists.",
                }, 409

            service = Service(
                name=name,
                description=description,
                duration=duration,
                price=price,
                is_available=is_available,
            )

            db.session.add(service)
            db.session.commit()

            return {
                "success": True,
                "message": "Service created successfully.",
                "service": service.to_dict(),
            }, 201

        except (ValueError, KeyError, InvalidOperation):
            db.session.rollback()
            return {
                "success": False,
                "message": "Invalid service data.",
            }, 400

        except SQLAlchemyError:
            db.session.rollback()
            return {
                "success": False,
                "message": "Database error while creating service.",
            }, 500

        except Exception:
            db.session.rollback()
            return {
                "success": False,
                "message": "An unexpected error occurred.",
            }, 500

    @staticmethod
    def update_service(service_id, data):
        """
        Update an existing service.
        """
        try:
            service = Service.query.get(service_id)

            if not service:
                return {
                    "success": False,
                    "message": "Service not found.",
                }, 404

            name = data.get("name")
            description = data.get("description")
            duration = data.get("duration")
            price = data.get("price")
            is_available = data.get("is_available")

            if name is not None:
                name = name.strip()
                if not name:
                    return {
                        "success": False,
                        "message": "Service name cannot be empty.",
                    }, 400

                existing_service = Service.query.filter(
                    Service.name == name,
                    Service.id != service.id,
                ).first()

                if existing_service:
                    return {
                        "success": False,
                        "message": "A service with that name already exists.",
                    }, 409

                service.name = name

            if description is not None:
                service.description = description

            if duration is not None:
                duration = int(duration)
                if duration <= 0:
                    return {
                        "success": False,
                        "message": "Service duration must be greater than 0.",
                    }, 400
                service.duration = duration

            if price is not None:
                price = Decimal(str(price))
                if price < 0:
                    return {
                        "success": False,
                        "message": "Service price cannot be negative.",
                    }, 400
                service.price = price

            if is_available is not None:
                service.is_available = bool(is_available)

            db.session.commit()

            return {
                "success": True,
                "message": "Service updated successfully.",
                "service": service.to_dict(),
            }, 200

        except (ValueError, InvalidOperation):
            db.session.rollback()
            return {
                "success": False,
                "message": "Invalid service data.",
            }, 400

        except SQLAlchemyError:
            db.session.rollback()
            return {
                "success": False,
                "message": "Database error while updating service.",
            }, 500

        except Exception:
            db.session.rollback()
            return {
                "success": False,
                "message": "An unexpected error occurred.",
            }, 500

    @staticmethod
    def delete_service(service_id):
        """
        Soft delete a service by marking it unavailable.
        """
        try:
            service = Service.query.get(service_id)

            if not service:
                return {
                    "success": False,
                    "message": "Service not found.",
                }, 404

            service.is_available = False
            db.session.commit()

            return {
                "success": True,
                "message": "Service deleted successfully.",
            }, 200

        except SQLAlchemyError:
            db.session.rollback()
            return {
                "success": False,
                "message": "Database error while deleting service.",
            }, 500

        except Exception:
            db.session.rollback()
            return {
                "success": False,
                "message": "An unexpected error occurred.",
            }, 500