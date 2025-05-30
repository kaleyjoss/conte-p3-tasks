import os
from datetime import datetime

def write_metadata(session, keys, mode='w'):
    """Write metadata to disk.

    Parameters
    ----------
    session : flask session
        Current user session.
    keys : list
        Session keys to write to file.
    mode : r | w | a
        Open file mode.
    """

    ## Define timestamp.
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    ## Write metadata to disk.
    fout = os.path.join(session['metadata'], session['workerId'])
    with open(fout, mode) as f:
        for k in keys:
            f.write(f'{timestamp}\t{k}\t{session[k]}\n')

def write_data(session, json, method='success'):
    """Write jsPsych output to disk.

    Parameters
    ----------
    session : flask session
        Current user session.
    json : object
        Data object returned by jsPsych.
    method : success | reject
        Designates target folder for data.
    """

    ## Write data to disk.
    if method == 'success':
        fout = os.path.join(session['data'],'%s_%s_%s.json' %(session['subId'], session['page'], datetime.now().strftime("%Y%m%d%H%M")))
    elif method == 'reject':
        fout = os.path.join(session['reject'],'%s_%s_%s.json' %(session['subId'], session['page'], datetime.now().strftime("%Y%m%d%H%M")))

    with open(fout, 'w') as f: f.write(json)

def write_data_interval(session, task, json, mode='w'):
    """Write jsPsych output to disk. Used for saving at set time intervals for preserving patient data.
        Adapted from write_metadata and write_data.

    Parameters
    ----------
    session : flask session
        Current user session.
    json : object
        Data object returned by jsPsych.
    mode : r | w | a
        Open file mode.
    """

    ## Write data to disk.  
    fout = os.path.join(session['data'],'%s_%s_%s_%s.json' %(session['subId'], task, 'interval', datetime.now().strftime("%Y%m%d")))
        
    with open(fout, mode) as f: f.write(json)
