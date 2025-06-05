from flask import (Blueprint, redirect, render_template, request, session, url_for)
from .db import add_data, get_worker
from .io import write_data, write_metadata, write_data_interval
from datetime import datetime, timedelta
import os, re

## Initialize blueprint.
bp = Blueprint('experiment', __name__)

@bp.route('/main')
def main():
    """Present game select screen to participant."""

    ## Error-catching: screen for missing session.
    if not 'workerId' in session:

        ## Redirect participant to error (missing workerId).
        return redirect(url_for('error.error', errornum=1000))

    ## Previous completion.
    elif 'complete' in session:

        ## Redirect participant to complete page.
        return redirect(url_for('complete.complete'))

    ## Query database for record of experiment completions.
    stage = get_worker(session['db_path'], session['workerId'])

    ## Case 1: context survey incomplete.
    if not stage: # or (('page' not in session) and (stage !=5 )): # no completion or previously completed battery

        ## Present game select page.
        return redirect(url_for('experiment.context'))

    ## Case 2: context survey complete.
    else:

        ##stage = (stage - 1) % 4
    
        ## Present game select page.
        return render_template('main.html', stage=(stage - 1), workerId=session['workerId'], assignmentId=session['assignmentId'], hitId=session['hitId'], code_success=session['code_success'], code_reject=session['code_reject'])

@bp.route('/experiments/context')
def context():
    """Present context survey to participant."""

    ## Error-catching: screen for missing session.
    if not 'workerId' in session:

        ## Redirect participant to error (missing workerId).
        return redirect(url_for('error.error', errornum=1000))

    else:

        ## Update participant metadata.
        session['context'] = 'start'
        write_metadata(session, ['context'], 'a')

        ## Present experiment.
        return render_template('experiments/context.html',  workerId=session['workerId'], assignmentId=session['assignmentId'], hitId=session['hitId'], code_success=session['code_success'], code_reject=session['code_reject'])

@bp.route('/experiments/acqext', methods = ['GET', 'POST'])
def acqext():
    #Allow writing data to file during experiment
    if request.method == 'POST':
        JSON = request.get_json()
        ## Save jsPsych data to disk.
        write_data_interval(session, 'acqext', JSON)
        return ('', 200)

    """Present acquistion & extinction task to participant."""

    ## Error-catching: screen for missing session.
    if not 'workerId' in session:

        ## Redirect participant to error (missing workerId).
        return redirect(url_for('error.error', errornum=1000))

    else:
        ## Parse log file.
        with open(os.path.join(session['metadata'], session['workerId']), 'r') as f:
            logs = f.read()

        #Check for last successful completion
        reaccess_gap = timedelta(days = 1000000)
        list_success = re.findall('(.*)\tacqext\tsuccess\n', logs)

        if len(list_success) > 0:
            success_time = datetime.strptime(list_success[-1], '%Y-%m-%d %H:%M:%S')

            #if time since last successful completion is too short
            if (datetime.now() - success_time) < reaccess_gap:
                session['acqext'] = 'attempted reaccess'
                write_metadata(session, ['acqext'], 'a')
                ## Redirect participant to error.
                return redirect(url_for('error.error', errornum=1007))
        
        ## Update participant metadata.
        session['acqext'] = 'start'
        write_metadata(session, ['acqext'], 'a')

        ## Present experiment.
        return render_template('experiments/acqext.html',  workerId=session['workerId'], assignmentId=session['assignmentId'], hitId=session['hitId'], code_success=session['code_success'], code_reject=session['code_reject'])

# @bp.route('/experiments/risk', methods = ['GET', 'POST'])
# def risk():
#     #Allow writing data to file during experiment
#     if request.method == 'POST':
#         JSON = request.get_json()
#         ## Save jsPsych data to disk.
#         write_data_interval(session, 'risk', JSON)
#         return ('', 200)

#     """Present risk sensitivity task to participant."""

#     ## Error-catching: screen for missing session.
#     if not 'workerId' in session:

#         ## Redirect participant to error (missing workerId).
#         return redirect(url_for('error.error', errornum=1000))

#     else:
#         ## Parse log file.
#         with open(os.path.join(session['metadata'], session['workerId']), 'r') as f:
#             logs = f.read()

#         #Check for last successful completion
#         reaccess_gap = timedelta(days = 1000000)
#         list_success = re.findall('(.*)\trisk\tsuccess\n', logs)

#         if len(list_success) > 0:
#             success_time = datetime.strptime(list_success[-1], '%Y-%m-%d %H:%M:%S')

#             #if time since last successful completion is too short
#             if (datetime.now() - success_time) < reaccess_gap:
#                 session['risk'] = 'attempted reaccess'
#                 write_metadata(session, ['risk'], 'a')
#                 ## Redirect participant to error.
#                 return redirect(url_for('error.error', errornum=1007))
        
#         ## Update participant metadata.
#         session['risk'] = 'start'
#         write_metadata(session, ['risk'], 'a')

#         ## Present experiment.
#         return render_template('experiments/risk.html',  workerId=session['workerId'], assignmentId=session['assignmentId'], hitId=session['hitId'], code_success=session['code_success'], code_reject=session['code_reject'])


@bp.route('/experiments/stop', methods = ['GET', 'POST'])
def stop():
    #Allow writing data to file during experiment
    if request.method == 'POST':
        JSON = request.get_json()
        ## Save jsPsych data to disk.
        write_data_interval(session, 'stop', JSON)
        return ('', 200)

    """Present stop signal task to participant."""

    ## Error-catching: screen for missing session.
    if not 'workerId' in session:

        ## Redirect participant to error (missing workerId).
        return redirect(url_for('error.error', errornum=1000))

    else:
        ## Parse log file.
        with open(os.path.join(session['metadata'], session['workerId']), 'r') as f:
            logs = f.read()

        #Check for last successful completion
        reaccess_gap = timedelta(days = 1000000)
        list_success = re.findall('(.*)\stop\tsuccess\n', logs)

        if len(list_success) > 0:
            success_time = datetime.strptime(list_success[-1], '%Y-%m-%d %H:%M:%S')

            #if time since last successful completion is too short
            if (datetime.now() - success_time) < reaccess_gap:
                session['stop'] = 'attempted reaccess'
                write_metadata(session, ['stop'], 'a')
                ## Redirect participant to error.
                return redirect(url_for('error.error', errornum=1007))
        
        ## Update participant metadata.
        session['stop'] = 'start'
        write_metadata(session, ['stop'], 'a')

        ## Present experiment.
        return render_template('experiments/stop.html',  workerId=session['workerId'], assignmentId=session['assignmentId'], hitId=session['hitId'], code_success=session['code_success'], code_reject=session['code_reject'])



@bp.route('/experiments/recovery', methods = ['GET', 'POST'])
def recovery():
    #Allow writing data to file during experiment
    if request.method == 'POST':
        JSON = request.get_json()
        ## Save jsPsych data to disk.
        write_data_interval(session, 'recovery', JSON)
        return ('', 200)

    """Present recovery task to participant."""

    ## Error-catching: screen for missing session.
    if not 'workerId' in session:

        ## Redirect participant to error (missing workerId).
        return redirect(url_for('error.error', errornum=1000))

    else:
        ## Parse log file.
        with open(os.path.join(session['metadata'], session['workerId']), 'r') as f:
            logs = f.read()

        #Check for last successful completion
        reaccess_gap = timedelta(days = 1000000)
        list_success = re.findall('(.*)\trecovery\tsuccess\n', logs)
        
        # # Check for last completion of acquisition/extinction
        # list_success_acqext = re.findall('(.*)\tacqext\tsuccess\n', logs)

        # if len(list_success_acqext) > 0:
        #     success_time_acqext = datetime.strptime(list_success_acqext[-1], '%Y-%m-%d %H:%M:%S')

        #     # Check if 12 hours have passed since acqext completion
        #     if (datetime.now() - success_time_acqext) < timedelta(hours=12):
        #         session['recovery'] = 'attempted reaccess'
        #         write_metadata(session, ['recovery'], 'a')
        #         ## Redirect participant to error.
        #         return redirect(url_for('error.error', errornum=1010))

        if len(list_success) > 0:
            success_time = datetime.strptime(list_success[-1], '%Y-%m-%d %H:%M:%S')

            #if time since last successful completion is too short
            if (datetime.now() - success_time) < reaccess_gap:
                session['recovery'] = 'attempted reaccess'
                write_metadata(session, ['recovery'], 'a')
                ## Redirect participant to error.
                return redirect(url_for('error.error', errornum=1007))
        
        ## Update participant metadata.
        session['recovery'] = 'start'
        write_metadata(session, ['recovery'], 'a')

        ## Present experiment.
        return render_template('experiments/recovery.html',  workerId=session['workerId'], assignmentId=session['assignmentId'], hitId=session['hitId'], code_success=session['code_success'], code_reject=session['code_reject'])


@bp.route('/experiment', methods=['POST'])
def pass_message():
    """Write jsPsych message to metadata."""

    ## Retrieve experiment.
    page = request.args.get('experiment')

    if request.is_json:

        ## Retrieve jsPsych data.
        msg = request.get_json()

        ## Update participant metadata.
        session[page] = msg
        write_metadata(session, [page], 'a')

    ## DEV NOTE:
    ## This function returns the HTTP response status code: 200
    ## Code 200 signifies the POST request has succeeded.
    ## For a full list of status codes, see:
    ## https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
    return ('', 200)

# commented out for KALEY TEST
# @bp.route('/on_success', methods = ['POST'])
# def on_success():
#     """Save complete jsPsych dataset to disk & redirect back to Home page."""

#     ## Retrieve experiment.
#     page = request.args.get('experiment')
#     print(f"/on_success backend page: {page}")

#     if request.is_json:
#         print(f"/on_success is_json: TRUE")

#         ## Retrieve jsPsych data.
#         JSON = request.get_json()

#         ## Save jsPsych data to disk.
#         session['page'] = page
#         write_data(session, JSON, method='success')
#         print(f'write_data success')

#         ## Save jsPsych data to database.
#         add_data(session['db_path'], (session['workerId'], session['subId'], session['page'], JSON))
#         print(f'add_data success')
#     ## Update participant metadata.
#     session[page] = 'success'
#     write_metadata(session, [page], 'a')
#     print(f'add_metadata success')

#     ## DEV NOTE:
#     ## This function returns the HTTP response status code: 200
#     ## Code 200 signifies the POST request has succeeded.
#     ## The corresponding jsPsych function handles the redirect.
#     ## For a full list of status codes, see:
#     ## https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
#     return ('', 200)

# KALEY TESTING:
@bp.route("/on_success", methods=["POST"])
def on_success():
    if request.is_json:
        payload = request.get_json()
        # print('received payload')
        experiment = payload.get("experiment")
        print(f'experiment: {experiment}')
        jspsych_data = payload.get("data")
        # print(f'data: {jspsych_data}')
        # print(f"Received experiment: {experiment}")
        # print(f"First 100 chars of data: {str(jspsych_data)[:100]}")

        session['page'] = experiment
        write_data(session, jspsych_data, method='success')
        add_data(session['db_path'], (session['workerId'], session['subId'], experiment, jspsych_data))
        session[experiment] = 'success'
        write_metadata(session, [experiment], 'a')
        return ('', 200)
    return ('Expected JSON data', 400)



@bp.route('/redirect_success')
def redirect_success():
    """Save complete jsPsych dataset to disk."""

    ## Flag experiment as complete.
    session['complete'] = 'success'
    write_metadata(session, ['complete','code_success'], 'a')

    return redirect(url_for('complete.complete'))

@bp.route('/redirect_reject', methods = ['POST'])
def redirect_reject():
    """Save rejected jsPsych dataset to disk."""

    ## Retrieve experiment.
    session['page'] = request.args.get('experiment')

    if request.is_json:

        ## Retrieve jsPsych data.
        JSON = request.get_json()

        ## Save jsPsych data to disk.
        write_data(session, JSON, method='reject')

    ## Flag experiment as complete.
    session['complete'] = 'reject'
    write_metadata(session, ['complete'], 'a')

    ## DEV NOTE:
    ## This function returns the HTTP response status code: 200
    ## Code 200 signifies the POST request has succeeded.
    ## The corresponding jsPsych function handles the redirect.
    ## For a full list of status codes, see:
    ## https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
    return ('', 200)

@bp.route('/redirect_error', methods = ['POST'])
def redirect_error():
    """Save rejected jsPsych dataset to disk."""

    if request.is_json:

        ## Retrieve jsPsych data.
        JSON = request.get_json()

        ## Save jsPsch data to disk.
        write_data(session, JSON, method='reject')

    ## Flag experiment as complete.
    session['complete'] = 'error'
    write_metadata(session, ['complete'], 'a')

    ## DEV NOTE:
    ## This function returns the HTTP response status code: 200
    ## Code 200 signifies the POST request has succeeded.
    ## The corresponding jsPsych function handles the redirect.
    ## For a full list of status codes, see:
    ## https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
    return ('', 200)