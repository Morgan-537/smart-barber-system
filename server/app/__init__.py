from flask import Flask
from flask_cors import CORS

from app.config.settings import Config
from app.config.db import db, migrate

from app.models import (
    User,
    CustomerProfile,
    Service,
    BarberService,
    Booking,
    Payment,
    Review,
    Inventory,
    Notification,
)

def create_app():
    app = Flask(__name__)

    # Load configuration
    app.config.from_object(Config)

    # Enable CORS
    CORS(app)

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)

    @app.route("/")
    def home():
        return {
            "message": "Smart Barber API is running!"
        }

    return app