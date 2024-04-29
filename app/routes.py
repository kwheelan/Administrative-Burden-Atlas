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

    # Load the template and render with vars
    rendered_html = render_template('index.html', loading=True)  # Render the template
    with open('index.html', 'w', encoding='utf-8') as file:  # Open a file to write
        file.write(rendered_html)  # Write the rendered HTML to the file
    return rendered_html  # Return the rendered HTML to the client as usua