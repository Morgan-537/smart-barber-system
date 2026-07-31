from flask import Flask, jsonify
from flask_cors import CORS

from app.config.settings import Config
from app.config.db import db, migrate, jwt
from app.routes.auth_routes import auth_bp
from app.routes.booking_routes import booking_bp
from app.routes.admin_routes import admin_bp
from app.routes.notification_routes import notification_bp
from app.routes.barber_routes import barber_bp
from app.routes.payment_routes import payment_bp

def create_app():
    app = Flask(__name__)

    # Load configuration
    app.config.from_object(Config)

    # Allow the Vite frontend to talk to Flask
    CORS(
        app,
        resources={
            r"/api/*": {
                "origins": [
                    "http://localhost:5173",
                    "http://127.0.0.1:5173",
                ]
            }
        },
    )

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    # Register blueprints
    app.register_blueprint(auth_bp)
    app.register_blueprint(booking_bp)
    app.register_blueprint(admin_bp)
    app.register_blueprint(notification_bp)
    app.register_blueprint(barber_bp)
    app.register_blueprint(payment_bp)


    @app.get("/")
    def home():
        return jsonify({"message": "Smart Barber API is running!"}), 200

    @app.get("/health")
    def health():
        return jsonify({"status": "ok"}), 200

    return app