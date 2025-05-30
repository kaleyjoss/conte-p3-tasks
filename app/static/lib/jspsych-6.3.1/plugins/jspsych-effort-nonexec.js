/**
 * jspsych-effort
 * Quentin Huys
 *
 * based on jspsych-reconstruction by Josh de Leeuw
 *
 *
 */
// modified for non-executable trials
jsPsych.plugins['effort-nonexec'] = (function() {

	var plugin = {};

	plugin.info = {
		name: 'effort-nonexec',
		parameters: {
			npl:  	{
        type: jsPsych.plugins.parameterType.FLOAT,
        pretty_name: 'effort left' ,
        default: 0,
        description: 'number of key press required on left',
      },
			npr:  	{
        type: jsPsych.plugins.parameterType.FLOAT,
        pretty_name: 'effort right',
        default: 0,
        description: 'number of key press required on right',
      },
			rewl: 	{
        type: jsPsych.plugins.parameterType.FLOAT,
        pretty_name: 'reward left',
        default: 0,
        description: 'reward left',
      },
			rewr: 	{
        type: jsPsych.plugins.parameterType.FLOAT,
        pretty_name: 'reward right',
        default: 0,
        description: 'reward right',
      },
			keyl: 	{
        type: jsPsych.plugins.parameterType.KEYCODE,
        pretty_name: 'Key left  balloon',
        default: 'd',
        description: 'The key to choose left balloon.',
      },
			keyr: 	{
        type: jsPsych.plugins.parameterType.KEYCODE,
        pretty_name: 'Key right balloon',
        default: 'f',
        description: 'The key to choose right balloon.',
      },
	  keyp: 	{
        type: jsPsych.plugins.parameterType.KEYCODE,
        pretty_name: 'Key pump',
        default: 'j',
        description: 'The key to pump chosen balloon.',
      },
			savenow: {
        type: jsPsych.plugins.parameterType.FLOAT,
        pretty_name: 'whether to save now',
        default: 0,
        description: 'saveing index',
      },
			dur_fb:	{
        type: jsPsych.plugins.parameterType.FLOAT,
        pretty_name: 'feedback duration',
        default: 3000,
        description: 'feedback duration',
      },
			dur_max:	{
        type: jsPsych.plugins.parameterType.FLOAT,
        pretty_name: 'max duration of trial',
        default: 40000,
        description: 'trial max duration',
      },
			dur_decision:	{
        type: jsPsych.plugins.parameterType.FLOAT,
        pretty_name: 'max duration of decision time',
        default: 5000,
        description: 'max duration of decision time',
      },
		}
	}

	plugin.trial = function(display_element, trial) {
		var kpl = 0;
		var kpr = 0;
 		var total_trial_time =[];
 		var startTime =[];
 		var firstkey =[];
 		var rewchosen =[];
 		var effchosen =[];
 		var rewnotchosen =[];
 		var effnotchosen =[];
 		var rtx =[];
		var nonresp = "NaN";
		var escaped = 0;
		var timeout = 0;

		// set-up key listeners
		var after_response = function(info) {
			var key_l = (typeof trial.keyl == 'string') ? jsPsych.pluginAPI.convertKeyCharacterToKeyCode(trial.keyl) : trial.keyl;
			var key_r = (typeof trial.keyr == 'string') ? jsPsych.pluginAPI.convertKeyCharacterToKeyCode(trial.keyr) : trial.keyr;
      //convert to jspsych.js keylookup standard (e.keyCode deprecated, e.key returns string (see jspsych.js))
if (info.key == 'escape'){
	info.key = 'esc';
	}
	if (typeof info.key == 'string'){
	info.key = jsPsych.pluginAPI.convertKeyCharacterToKeyCode(info.key);
	}
		
		// log first key that was pressed
      rtx = info.rt;
      if (info.key == 27 ) { // ESCAPE pressed - terminate task
				escaped = 1;
				endTrial();
			}
			if (firstkey.length==0 & (info.key == key_l | info.key == key_r)) { //log first key press
        if (info.key == key_l) {
          kpl = 1;
        }
        else {
          kpr = 1;
        }
        firstkey = info.key;
				console.log(rtx);
        jsPsych.pluginAPI.cancelKeyboardResponse(key_listener); // clear keyboard response
        feedback(kpr,kpl);
        endTrial();
			}
    }
		// listen for responses
		var key_listener = jsPsych.pluginAPI.getKeyboardResponse({
			callback_function: after_response,
			valid_responses: [trial.keyl, trial.keyr, trial.keyp, 'esc'],
			rt_method: 'performance',
			persist: true,
			allow_held_key: false,
		});

		function feedback(kpr,kpl){
			if(kpl>0) {
        rewchosen = trial.rewl;
        effchosen = trial.npl;
      }
			else if (kpr>0) {
        rewchosen = trial.rewr;
        effchosen = trial.npr;
      };
      html = '<p style="color:green; text-align: center; font-size:200%; line-height: 200%">You chose ' +effchosen+ ' button presses for ' +rewchosen+ ' points.</br> This was a choice-only round and you will now be taken to the next round.';
			display_element.innerHTML = '<div id="jspsych-reconstruction-stim-container">'+html+'</div>';
		};

		function draw(kpr,kpl) {
			radl 	= 20+kpl/trial.npl*200;
			radr 	= 20+kpr/trial.npr*200;
			yl 	= 600-(radl);
			yr 	= 600-(radr);
			html = '<p style="text-align:center">'+
			'd to choose the LEFT balloon<br>'+
			'f to choose the RIGHT balloon<br>'+
			'j to pump up the chosen balloon.<br>'+
			'<svg width="800" height="720">' +
			'<defs>' +
			'<radialGradient id="grad1" cx="80%" cy="30%" r="50%" fx="50%" fy="50%"><stop offset="0%"   style="stop-color:rgb(100,100,255);stop-opacity:1" /><stop offset="100%" style="stop-color:rgb(0,0,255);stop-opacity:1" /></radialGradient>' +
			'<radialGradient id="grad2" cx="80%" cy="30%" r="50%" fx="50%" fy="50%"><stop offset="0%"   style="stop-color:rgb(255,100,100);stop-opacity:1" /><stop offset="100%" style="stop-color:rgb(255,0,0);stop-opacity:1" /></radialGradient>' +
			'</defs>' +
			'<circle cx="300" cy="' + yl + '" r="' + radl + '" fill="url(#grad2)" />' +
			'<circle cx="500" cy="' + yr + '" r="' + radr + '" fill="url(#grad1)" />' +
			'<polygon points="290,100 310,100 300,160" style="fill:black"/>' +
			'<polygon points="490,100 510,100 500,160" style="fill:black"/>' +
			'<text text-anchor="middle" font-size="200%" x="280" y="650" fill="red">' + trial.npl + ' presses</text>' +
			'<text text-anchor="middle" font-size="200%" x="280" y="700" fill="red">' + trial.rewl + ' points</text>' +
			'<text text-anchor="middle" font-size="200%" x="520" y="650" fill="blue">' + trial.npr + ' presses</text>' +
			'<text text-anchor="middle" font-size="200%" x="520" y="700" fill="blue">' + trial.rewr + ' points</text>' +
			'</svg></p>'+
			'<p><br><br>';
			display_element.innerHTML = '<div id="jspsych-reconstruction-stim-container">'+html+'</div>';
		}


		function endTrial() {
			// measure response time
			var endTime =performance.now();
			var total_trial_time= endTime - startTime;

			if(kpl>0) {
        rewnotchosen = trial.rewr;
        effnotchosen = trial.npr;
      }
			else if(kpr>0) {
        rewnotchosen = trial.rewl;
        effnotchosen = trial.npl;
      }
			else if(kpl==0 & kpr==0) {
        rewchosen='NaN';
        effchosen = 'NaN';
        rewnotchosen = 'NaN';
        effnotchosen = 'NaN';
        firstkey = 'NaN';
        rtx = 'NaN';
      };

			// save data
			var trial_data = {
        "trial_name": 'choice-only trial',
				"nonexecute_total_trial_time": total_trial_time,
				"nonexecute_trial_start_time": startTime,
				"nonexecute_chosen_balloon": firstkey,
				"nonexecute_chosen_reward": rewchosen,
				"nonexecute_chosen_effort": effchosen,
				"nonexecute_unchosen_reward": rewnotchosen,
				"nonexecute_unchosen_effort": effnotchosen,
				"nonexecute_key_press": firstkey,
				"nonexecute_rt": rtx,
				"total_trial_time": total_trial_time,
				"trial_start_time": startTime,
				"chosen_balloon": firstkey,
				"chosen_reward": rewchosen,
				"chosen_effort": effchosen,
				"unchosen_reward": rewnotchosen,
				"unchosen_effort": effnotchosen,
				"key_press": firstkey,
				"effort_rt": rtx,
				"stimulus": '{ "Left effort": '+trial.npl+', "Left reward": '+trial.rewl+', "Right effort": '+trial.npr+', "Right reward":'+trial.rewr+' }',
				"effort_nonresponses": nonresp,
				"effort_escaped": escaped,
				"effort_timeout": timeout,
				"bp_times": rtx,
			};

			// next trial
			jsPsych.pluginAPI.clearAllTimeouts();
			jsPsych.pluginAPI.setTimeout(function(){jsPsych.finishTrial(trial_data)},trial.dur_fb);
			//jsPsych.pluginAPI.clearAllTimeouts();
			jsPsych.pluginAPI.cancelKeyboardResponse(key_listener)

			//setTimeout(jsPsych.finishTrial,trial.dur_fb,trial_data);
		}

		// end trial if decision for ballon is set and too long
		if (trial.dur_decision !== null) {
				jsPsych.pluginAPI.setTimeout(function() {
					if (firstkey.length==0) {
						choices =  jsPsych.data.get().select('chosen_balloon').values;
						nonresp = choices.filter(x=> x=="NaN").length + 1
						timeout = 1; // indicates that timeout due to decision time
						console.log('timeout decision ' + nonresp);
						console.log(timeout)
		   			display_element.innerHTML = '<div id="jspsych-reconstruction-stim-container"><p style="color:red;   text-align: center; font-size:200%; line-height: 200%">TOO SLOW!!</p><p>Remember: </p><ul><li>d &nbsp; to CHOOSE the LEFT balloon.</li><li>f &nbsp; to CHOOSE the RIGHT ballooon.</li><li>j &nbsp; to PUMP UP the balloon.</li></ul></div>';
						endTrial();
					}
				   }, trial.dur_decision);
				 }

		 // end trial if trial_duration is set
		 if (trial.dur_max !== null) {
		   jsPsych.pluginAPI.setTimeout(function() {
				choices =  jsPsych.data.get().select('chosen_balloon').values;
				nonresp = choices.filter(x=> x=="NaN").length + 1
		   	timeout = 2; // indicates that timeout due to max trial duration
		   	console.log('timeout trial ' + nonresp)
		   	display_element.innerHTML = '<div id="jspsych-reconstruction-stim-container"><p style="color:red;   text-align: center; font-size:200%; line-height: 200%">TOO SLOW!!</p><p>Remember: </p><ul><li>d &nbsp; to CHOOSE the LEFT balloon.</li><li>f &nbsp; to CHOOSE the RIGHT ballooon.</li><li>j &nbsp; to PUMP UP the balloon.</li></ul></div>';
		   	endTrial();
		   }, trial.dur_max);
		 }

		// draw first iteration
		console.log('starting trial')
		draw(0,0);
		startTime = performance.now();

	};
	return plugin;
})();
