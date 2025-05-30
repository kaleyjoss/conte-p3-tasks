from flask import (Blueprint, redirect, render_template, request, session, url_for)
from .io import write_metadata

## Initialize blueprint.
bp = Blueprint('intro', __name__)

@bp.route('/intro')
def intro():
    if not 'intro' in session:
        ## Present consent form.
        return render_template('intro.html')
    else:
        """Present intro page to participant."""
        return redirect(url_for('consent.consent'))

@bp.route('/intro', methods=['POST'])
def intro_post():
    """Process participant repsonse to intro page."""

    ## Retrieve participant response.
    subj_press = int(request.form['subj_press'])

    ## Check participant response.
    if subj_press:
        
        ## Update participant metadata.
        session['intro'] = True
        write_metadata(session, ['intro'], 'a')

        ## Redirect participant to consent page.
        return redirect(url_for('consent.consent'))
