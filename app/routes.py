"""
Route definitions and endpoints for the Flask application.
"""

# flask dependencies
from flask import Blueprint, render_template, jsonify

states_info = {
    'AL': 'Alabama information...',
    'AK': 'Alaska information...',
    # Include information for all states
}

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

@routes_bp.route('/info/<state_code>')
def state_info(state_id):
    # Retrieve state information for the AJAX call
    state_info = states_info.get(state_id.upper(), "No information available.")
    return jsonify(name=state_id.upper(), info=state_info)