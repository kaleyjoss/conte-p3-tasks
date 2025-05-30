// /**
//  * jspsych-survey-debrief
//  * edited for task battery
//  */

jsPsych.plugins['survey-debrief-battery'] = (function() {

  var plugin = {};

  plugin.info = {
    name: 'survey-debrief-battery',
    description: '',
    parameters: {
      button_label: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Button label',
        default:  'Continue',
        description: 'The text that appears on the button to finish the trial.'
      },
    }
  }
  plugin.trial = function(display_element, trial) {

    //---------------------------------------//
    // Define HTML.
    //---------------------------------------//

    // Initialize HTML
    var html = '';

    // Inject CSS
    html += `<style>
    .survey-debrief-wrap {
      height: 100vh;
      width: 100vw;
    }
    .survey-debrief-instructions {
      margin: auto;
      width: 75vw;
      padding: 0 0 0 0;
      text-align: center;
      font-size: 1.33vw;
      line-height: 1.15em;
    }
    .survey-debrief-container {
      display: grid;
      grid-template-columns: 40% 60%;
      grid-template-rows: auto;
      grid-gap: 2px;
      width: 75vw;
      margin: auto;
      background-color: #F8F8F8;
      border-radius: 12px;
    }
    .survey-debrief-row {
      display: contents;
      justify-items: center;
      text-align: left;
      font-size: 1.33vw;
      line-height: 1.5em;
    }
    .survey-debrief-prompt {
      padding: 12px 0 12px 15px;
      border-top: 2px solid #ffffff;
    }
    .survey-debrief-prompt label {
      padding: 0 8px 0 0;
      display: inline-block;
    }
    .survey-debrief-response {
      padding: 12px 0 12px 0;
      border-top: 2px solid #ffffff;
    }
    .survey-debrief-response label {
      padding: 0 8px 0 0;
      display: inline-block;
    }
    .survey-debrief-response input[type=text] {
      width: 60%;
      height: 1.66vw;
      padding: 0.1em 0.2em;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    .survey-debrief-response input[type="radio"] {
      height: 1.05vw;
      width: 1.05vw;
      margin: 0 6px 0 0;
    }
    .survey-debrief-footer {
      margin: auto;
      width: 75vw;
      padding: 0 0 0 0;
      text-align: right;
    }
    .survey-debrief-footer input[type=submit] {
      background-color: #F0F0F0;
      padding: 8px 20px;
      border: none;
      border-radius: 4px;
      margin-top: 5px;
      margin-bottom: 20px;
      margin-right: 0px;
      font-size: 1.15vw;
      color: black;
    }
    </style>`;

    // Initialize survey.
    html += '<div class="survey-debrief-wrap"><form id="jspsych-survey-debrief">';

    // Add debriefing header.
    html += '<div class=survey-debrief-instructions>';
    html += '<h2>Debrief Survey</h2>';
    html += '<p><font color="#c87606">Thank for completing the task. The following questions are optional. We would appreciate any feedback to help improve future participant experiences.</font></p>'
    html += '</div>';

    // Begin debriefing container.
    html += '<div class="survey-debrief-container">';

    // Item 1: distracted during task
    html += '<div class="survey-debrief-row">';
    html += '<div class="survey-debrief-prompt"><label for="distracted">How distracted, or disturbed by others, were you during the task?</label></div>';
    html += '<div class="survey-debrief-response">';
    html += '<label><input type="radio" name="distracted" value="5">Not distracted at all</label><br>';
    html += '<label><input type="radio" name="distracted" value="4">Slightly distracted</label><br>';
    html += '<label><input type="radio" name="distracted" value="3">Somewhat distracted</label><br>';
    html += '<label><input type="radio" name="distracted" value="2">Moderately distracted</label><br>';
    html += '<label><input type="radio" name="distracted" value="1">Very distracted</label>';
    html += '</div></div>';

    // Item 7: bugs / mistakes
    html += '<div class="survey-debrief-row">';
    html += '<div class="survey-debrief-prompt"><label for="mistakes">Did you notice any bugs, mistakes, or errors in the experiment?</label></div>';
    html += '<div class="survey-debrief-response"><input type="text" name="mistakes"></div>';
    html += '</div>';

    // Item 8: Additional comments.
    html += '<div class="survey-debrief-row">';
    html += '<div class="survey-debrief-prompt"><label for="feedback">Do you have any other comments?</label></div>';
    html += '<div class="survey-debrief-response"><input type="text" name="feedback"></div>';
    html += '</div>';

    // Close survey-debrief-container.
    html += '</div>';

    // Add submit button.
    html += '<div class="survey-debrief-footer">';
    html += `<input type="submit" id="jspsych-survey-debrief-next" class="jspsych-btn jspsych-survey-debrief" value="${trial.button_label}"></input>`;
    html += '</div>';

    // End survey.
    html += '</form></div>';

    // Display HTML
    display_element.innerHTML = html;

    //---------------------------------------//
    // Define functions.
    //---------------------------------------//

    // Scroll to top of screen.
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    }

    display_element.querySelector('#jspsych-survey-debrief').addEventListener('submit', function(event) {

        // Wait for response
        event.preventDefault();

        // verify that at least one box has been checked for the race question
        var checkboxes = document.querySelectorAll('input[type="checkbox"]');

          // Measure response time
          var endTime = performance.now();
          var response_time = endTime - startTime;

          var question_data = serializeArray(this);
          question_data = objectifyForm(question_data);

          // Store data
          var trialdata = {
            "rt_debriefing": response_time,
            "debriefing": question_data
          };

          // Update screen
          display_element.innerHTML = '';

          // Move onto next trial
          jsPsych.finishTrial(trialdata);

    });

    var startTime = performance.now();

  };

  /*!
   * Serialize all form data into an array
   * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
   * @param  {Node}   form The form to serialize
   * @return {String}      The serialized form data
   */
  var serializeArray = function (form) {
    // Setup our serialized data
    var serialized = [];

    // Loop through each field in the form
    for (var i = 0; i < form.elements.length; i++) {
      var field = form.elements[i];

      // Don't serialize fields without a name, submits, buttons, file and reset inputs, and disabled fields
      if (!field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') continue;

      // If a multi-select, get all selections
      if (field.type === 'select-multiple') {
        for (var n = 0; n < field.options.length; n++) {
          if (!field.options[n].selected) continue;
          serialized.push({
            name: field.name,
            value: field.options[n].value
          });
        }
      }

      // Convert field data to a query string
      else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
        serialized.push({
          name: field.name,
          value: field.value
        });
      }
    }

    return serialized;
  };

  // from https://stackoverflow.com/questions/1184624/convert-form-data-to-javascript-object-with-jquery
  function objectifyForm(formArray) {//serialize data function
    var returnArray = {};
    for (var i = 0; i < formArray.length; i++){
      returnArray[formArray[i]['name']] = formArray[i]['value'];
    }
    return returnArray;
  }

  return plugin;

})();