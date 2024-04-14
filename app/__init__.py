"""
Configure the Flask app, register Blueprints (routes).

Last updated: K. Wheelan, April 2024
"""

from flask import Flask
from app.routes import routes_bp

# Configure Flask app
app = Flask(__name__)
app.static_folder = 'static'

# Registers the blueprint from routes.py to the app
app.register_blueprint(routes_bp)