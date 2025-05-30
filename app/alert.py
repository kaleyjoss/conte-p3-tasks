from flask import (Blueprint, redirect, render_template, request, session, url_for)
from .io import write_metadata
from datetime import datetime, timedelta
import os, re

## Initialize blueprint.
bp = Blueprint('alert', __name__)

@bp.route('/alert')
def alert():
    """Present alert page to participant."""

    ## Error-catching: screen for missing session.
    if not 'workerId' in session:

        ## Redirect participant to error (missing workerId).
        return redirect(url_for('error.error', errornum=1000))

    else:
        ## Update participant metadata.
        session['alert'] = 'start'
        write_metadata(session, ['alert'], 'a')

        ## block reattempt if participant closed tab successfully mid-task within the past 10 minutes
        ## Parse log file.
        with open(os.path.join(session['metadata'], session['workerId']), 'r') as f:
            logs = f.read()

        #Check for last successful completion
        pageclose_gap = timedelta(minutes = 10)
        list_pageclose = re.findall('(.*)\t.*\tattempted page close\n', logs)

        if len(list_pageclose) > 0:
            pageclose_time = datetime.strptime(list_pageclose[-1], '%Y-%m-%d %H:%M:%S')

            #if time since last successful completion is too short
            if (datetime.now() - pageclose_time) < pageclose_gap:
                session['alert'] = 'attempted reaccess'
                write_metadata(session, ['alert'], 'a')
                ## Redirect participant to error.
                return redirect(url_for('error.error', errornum=1009))
        

        ## Present experiment.
        return render_template('/alert.html',  workerId=session['workerId'], assignmentId=session['assignmentId'], hitId=session['hitId'], code_success=session['code_success'], code_reject=session['code_reject'])


@bp.route('/alert', methods=['POST'])
def alert_post():
    """Process participant repsonse to alert page."""

    ## Update participant metadata.
    session['alert'] = 'success'
    write_metadata(session, ['alert'], 'a')

    ## Redirect participant to context page, via main.
    return redirect(url_for('experiment.main'))
