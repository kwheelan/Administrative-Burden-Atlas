"""
Configure the Flask app, register Blueprints (routes).

Last updated: K. Wheelan, April 2024
"""

from flask import Flask
from app.routes import routes_bp
from app.utils.csv_to_json import csv2json

# Configure Flask app
app = Flask(__name__)
app.static_folder = 'static'

# Registers the blueprint from routes.py to the app
app.register_blueprint(routes_bp)

# converts CSV to JSON for javascript rendering
csv2json("app/static/data/admin_burden_data.csv", "app/static/json/admin_data.json")
csv2json("app/static/data/sources.csv", "app/static/json/sources.json")