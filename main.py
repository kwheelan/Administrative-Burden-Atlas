"""
Initialize the Flask application and run the server.

Last updated: K. Wheelan, April 2024
"""

import os

from flask import Flask
from routes import routes_bp
from utils.csv_to_json import csv2json

# Configure Flask app
app = Flask(__name__)
app.static_folder = 'static'

# Registers the blueprint from routes.py to the app
app.register_blueprint(routes_bp)

# converts CSV to JSON for javascript rendering
csv2json("static/data/admin_burden_data.csv", "static/json/admin_data.json")
csv2json("static/data/sources.csv", "static/json/sources.json")

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 8080)))