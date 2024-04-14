"""
Route definitions and endpoints for the Flask application.
"""

# flask dependencies
from flask import Blueprint, render_template

# =============================================================
# Set up routes
# =============================================================

# A blueprint for all routes
routes_bp = Blueprint('routes_bp', __name__)

@routes_bp.route('/')
def home():
    return render_template('index.html', loading=True)

@routes_bp.route('/map')
def map():
    return render_template('map.html', loading=True)