from datetime import datetime

from flask_jwt_extended import get_jwt
from sqlalchemy.exc import SQLAlchemyError

from app.config.db import db
from app.models.booking import Booking
from app.models.service import Service
from app.models.user import User
from app.services.notification_service import NotificationService


class BookingService:
    """
    Handles booking business logic.
    """
    

    @staticmethod
    def create_booking(user_id, data):
        """
        Create a new booking.
        """
        try:
            booking = Booking(
                customer_id=user_id,
                barber_id=data["barber_id"],
                service_id=data["service_id"],
                booking_date=datetime.strptime(
                    data["booking_date"],
                    "%Y-%m-%d",
                ).date(),
                booking_time=datetime.strptime(
                    data["booking_time"],
                    "%H:%M",
                ).time(),
                notes=data.get("notes"),
            )

            db.session.add(booking)
            db.session.commit()

            print("Booking saved successfully.")

            try:
                print("Creating notification...")

                NotificationService.create_notification(
                    user_id=user_id,
                    title="Booking Created",
                    message=(
                        f"Your appointment for "
                        f"{booking.booking_date} at "
                        f"{booking.booking_time.strftime('%H:%M')} "
                        "has been received."
                    ),
                )

                print("Notification created successfully.")

            except Exception as notification_error:
                print("Notification creation failed:")
                print(notification_error)

            return {
                "success": True,
                "message": "Booking created successfully.",
                "booking": booking.to_dict(),
            }, 201

        except (ValueError, KeyError) as error:
            db.session.rollback()

            return {
                "success": False,
                "message": f"Invalid booking data: {str(error)}",
            }, 400

        except SQLAlchemyError as error:
            db.session.rollback()

            print(error)

            return {
                "success": False,
                "message": "Database error while creating booking.",
            }, 500

        except Exception as error:
            db.session.rollback()

            print(error)

            return {
                "success": False,
                "message": "An unexpected error occurred.",
            }, 500


    
    @staticmethod
    def get_bookings(user_id):
        """
        Retrieve bookings based on user role.
        """
        try:
            claims = get_jwt()

            if claims.get("role") == "admin":
                bookings = Booking.query.all()
            else:
                bookings = Booking.query.filter_by(
                    customer_id=user_id
                ).all()

            return {
                "success": True,
                "bookings": [
                    booking.to_dict()
                    for booking in bookings
                ],
            }, 200

        except SQLAlchemyError:
            return {
                "success": False,
                "message": "Unable to retrieve bookings.",
            }, 500

        except Exception:
            return {
                "success": False,
                "message": "An unexpected error occurred.",
            }, 500

    @staticmethod
    def get_booking_options():
        """
        Return active barbers and available services for booking forms.
        """
        try:
            barbers = (
                User.query
                .filter_by(role="barber", is_active=True)
                .order_by(User.full_name.asc())
                .all()
            )

            services = (
                Service.query
                .filter_by(is_available=True)
                .order_by(Service.name.asc())
                .all()
            )

            return {
                "success": True,
                "barbers": [
                    {
                        "id": barber.id,
                        "full_name": barber.full_name,
                    }
                    for barber in barbers
                ],
                "services": [
                    service.to_dict()
                    for service in services
                ],
            }, 200

        except SQLAlchemyError:
            return {
                "success": False,
                "message": "Unable to load booking options.",
            }, 500

        except Exception:
            return {
                "success": False,
                "message": "An unexpected error occurred.",
            }, 500