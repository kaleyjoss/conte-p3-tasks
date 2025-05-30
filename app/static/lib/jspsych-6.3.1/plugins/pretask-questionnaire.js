// /**
//  * jspsych-pretask-questionnaire
//  * edited for the effortTask
//  */

jsPsych.plugins['pretask-questionnaire'] = (function() {

  var plugin = {};

  plugin.info = {
    name: 'pretask-questionnaire',
    description: '',
    parameters: {
      button_label: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Button label continue',
        default:  'Continue',
        description: 'The text that appears on the button to go forwards.'
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
    .pretask-questionnaire-wrap {
      height: 100vh;
      width: 100vw;
    }
    .pretask-questionnaire-instructions {
      margin: auto;
      width: 75vw;
      padding: 0 0 0 0;
      text-align: center;
      font-size: 1.33vw;
      line-height: 1.15em;
    }
    .pretask-questionnaire-container {
      display: grid;
      grid-template-columns: 40% 60%;
      grid-template-rows: auto;
      grid-gap: 2px;
      width: 75vw;
      margin: auto;
      background-color: #F8F8F8;
      border-radius: 12px;
    }
    .pretask-questionnaire-row {
      display: contents;
      justify-items: center;
      text-align: left;
      font-size: 1.33vw;
      line-height: 1.5em;
    }
    .pretask-questionnaire-prompt {
      padding: 12px 0 12px 15px;
      border-top: 2px solid #ffffff;
    }
    .pretask-questionnaire-prompt label {
      padding: 0 8px 0 0;
      display: inline-block;
    }
    .pretask-questionnaire-response {
      padding: 12px 0 12px 0;
      border-top: 2px solid #ffffff;
    }
    .pretask-questionnaire-response label {
      padding: 0 8px 0 0;
      display: inline-block;
    }
    .pretask-questionnaire-response input[type=text] {
      width: 60%;
      height: 1.66vw;
      padding: 0.1em 0.2em;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    .pretask-questionnaire-response input[type="radio"] {
      height: 1.05vw;
      width: 1.05vw;
      margin: 0 6px 0 0;
    }
    .pretask-questionnaire-footer {
      margin: auto;
      width: 75vw;
      padding: 0 0 0 0;
      text-align: right;
    }
    .pretask-questionnaire-footer input[type=submit] {
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
    html += '<div class="pretask-questionnaire-wrap"><form id="pretask-questionnaire">';

    // Add questionnaire header.
    html += '<div class=pretask-questionnaire-instructions>';
    html += '<br><br><h1>How are you feeling right now?</h1><br>';
    html += '<p>Please answer the questions below. <font color="#c87606">Your answers will not affect your payment or bonus, but they will help us to improve the experiment and better answer our scientific question.</font></p><br><br>'
    html += '</div>';

    // Begin questionnaire container.
    html += '<div class="pretask-questionnaire-container">';

    // Item 1: Tiredness
    html += '<div class="pretask-questionnaire-row">';
    html += '<div class="pretask-questionnaire-prompt"><label for="tiredness">How tired are you right now?</label></div>';
    html += '<div class="pretask-questionnaire-response">';
    html += '<label><input type="radio" name="tiredness" value="5" required>Very tired</label><br>';
    html += '<label><input type="radio" name="tiredness" value="4" required>Somewhat tired</label><br>';
    html += '<label><input type="radio" name="tiredness" value="3" required>Neither tired nor energetic</label><br>';
    html += '<label><input type="radio" name="tiredness" value="2" required>Somewhat energetic</label><br>';
    html += '<label><input type="radio" name="tiredness" value="1" required>Very energetic</label>';
    html += '</div></div>';


    // Item 2: Hours awake
    html += '<div class="pretask-questionnaire-row">';
    html += '<div class="pretask-questionnaire-prompt"><label for="hours_awake">How many hours have you been awake for today? Please enter a number.</label></div>';
    html += '<div class="pretask-questionnaire-response"><input type="text" name="hours_awake"></div>';
    html += '</div>';

    // Item 3: Motivation
    html += '<div class="pretask-questionnaire-row">';
    html += '<div class="pretask-questionnaire-prompt"><label for="motivated">How motivated are you about participating in this task?</label></div>';
    html += '<div class="pretask-questionnaire-response">';
    html += '<label><input type="radio" name="motivated" value="5" required>Very motivated</label><br>';
    html += '<label><input type="radio" name="motivated" value="4" required>Somewhat motivated</label><br>';
    html += '<label><input type="radio" name="motivated" value="3" required>Neither motivated nor unmotivated</label><br>';
    html += '<label><input type="radio" name="motivated" value="2" required>Somewhat unmotivated</label><br>';
    html += '<label><input type="radio" name="motivated" value="1" required>Very unmotivated</label>';
    html += '</div></div>';


    // Close pretask-questionnaire-container.
    html += '</div>';

    // Add submit button.
    html += '<div class="pretask-questionnaire-footer">';
    html += `<input type="submit" id="pretask-questionnaire-next" class="jspsych-btn pretask-questionnaire" value="${trial.button_label}"></input>`;
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

    display_element.querySelector('#pretask-questionnaire').addEventListener('submit', function(event) {

        // Wait for response
        event.preventDefault();

        // verify that at least one radio has been selected
        var radio = document.querySelectorAll('input[type="radio"]');

          // Measure response time
          var endTime = performance.now();
          var response_time = endTime - startTime;

          var question_data = serializeArray(this);
          question_data = objectifyForm(question_data);

          // Store data
          var trialdata = {
            "tiredness_questionnaire_rt": response_time,
            "tiredness_questionnaire_responses": question_data
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
