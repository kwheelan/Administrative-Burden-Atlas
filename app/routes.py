"""
Route definitions and endpoints for the Flask application.
"""

# flask dependencies
from flask import Blueprint, render_template, jsonify

# =============================================================
# Set up routes
# =============================================================

# A blueprint for all routes
routes_bp = Blueprint('routes_bp', __name__)

@routes_bp.route('/')
def home():
    return render_template('index.html', loading=True)

@routes_bp.route('/atlas')
def map():
    return render_template('atlas.html', loading=True) #, state_info = state_info)
