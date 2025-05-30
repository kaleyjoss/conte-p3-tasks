// ---------------------------------
// Baseline Measure
// ---------------------------------
// A custom plugin based off on existing html-keyboard-response plugin
//
// What this plugin does:
// Measure frequency and speed of button presses within a set timeframe
// ---------------------------------
// Parameters that can be customised:
// - key to press
// - time limit
// - display text
//
// Data to save:
// - number of button presses made
// - time of each button press
//
// Plugin.trial aspects:
// - display instructions
// - capture keyboard response, not allow for long presses to be counted
// - count key presses
// - record reaction time of each button press
// - end trial when timer runs out
// - bonus: display a countdown timer
//
// last modified: Yongjing Ren, March-2022. For keyCode issues.


jsPsych.plugins['baseline-measure'] = (function() {

  var plugin = {};

  plugin.info = {
    name: 'baseline-measure',
    parameters: {
      key_to_press: {
        type: jsPsych.plugins.parameterType.KEYCODE, // BOOL, STRING, INT, FLOAT, FUNCTION, KEY, SELECT, HTML_STRING, IMAGE, AUDIO, VIDEO, OBJECT, COMPLEX
        default: 'j', // keycode for j is 74
      },
      time_limit: {
        type: jsPsych.plugins.parameterType.INT,
        default: 1500, // time is in ms
      },
      instructions: {
        type: jsPsych.plugins.parameterType.STRING,
        default: "<h3>Press the 'j' key as many times as you can, as fast as you can.",
      },
    }
  }

  plugin.trial = function(display_element, trial) {

    var instructions = trial.instructions
    var rt = []; //create an empty array to save response time; each keypress adds on to the array
    var bp = 0; // count total number of button presses made
    // show instructions
    display_element.innerHTML = "<h3>" + instructions + "</h3>";

    jsPsych.pluginAPI.getKeyboardResponse({
      callback_function: after_response, // have to create this
      valid_responses: [trial.key_to_press],
      rt_method: 'performance', // default method for saving reaction time
      persist: true, // true if you want to keep listening to keyboard responses; false if stop after one keyboard response
      allow_held_key: false,
    });

    function after_response(response_info){ // what to do after a key has been pressed
      rt.push(response_info.rt);
      bp = bp + 1;
    }

    var end_trial = function(){ // what to do when end_trial is called
      jsPsych.pluginAPI.clearAllTimeouts();
      jsPsych.pluginAPI.cancelKeyboardResponse();
      // data to be saved
      var trial_data = {
        'baseline_rt': rt,
        'baseline_bp_count': bp,
        'baseline_key_to_press': jsPsych.pluginAPI.convertKeyCharacterToKeyCode(trial.key_to_press),
        'baseline_time_limit': trial.time_limit,
        'baseline_trial_type': 'baseline_measure',
      };
      // clear the display
      display_element.innerHTML = '';
      jsPsych.finishTrial(trial_data);
    };


    if (trial.time_limit !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        end_trial();
      }, trial.time_limit);
    }
  };

  return plugin;
})();
