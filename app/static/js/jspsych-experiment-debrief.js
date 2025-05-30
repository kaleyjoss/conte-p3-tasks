/**
 * jspsych-experiment-debrief
 * 
 * a jspsych plugin for soliciting experiment feedback
 */

jsPsych.plugins['experiment-debrief'] = (function() {

    var plugin = {};
  
    plugin.info = {
      name: 'experiment-debrief',
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
      .survey-debrief-instructions {
        width: 900px;
        margin: auto;
        text-align: center;
        font-size: 18px;
        line-height: 1.15em;
        padding-top: 12px;
      }
      .survey-debrief-container {
        display: grid;
        grid-template-columns: 50% 50%;
        grid-row-gap: 3px;
        width: 900px;
        margin: auto;
        border-radius: 12px;
      }
      .survey-debrief-item {
        display: flex;
        flex-direction: row;
        line-height: 1.5em;
        padding-top: 4px;
        padding-bottom: 4px;
        background-color: #F8F8F8;
        align-items: center;
      }
      .survey-debrief-item[type='prompt'] p {
        text-align: left;
        font-size: 16px;
        padding-left: 16px;
      }
      .survey-debrief-item[type='response'] {
        justify-content: space-evenly;
      }
      .radiogroup {
        width: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        white-space: nowrap;
      }
      .radiogroup label {
        font-size: 15px;
        display: block;
        margin-bottom: 4px;
      }
      .radiogroup input[type="radio"] {
        position: relative;
        height: 16px;
        width: 16px;
        margin: auto;
      }
      .radiogroup input[type="radio"]:before {
        display: block;
        position: absolute;
        left: 100%;
        top: 50%;
        transform: translateY(-50%);
        -webkit-transform : translateY(-50%);
        width: 45px;
        height: 2px;
        background: #d8dcd6;
        content: '';
      }
      .radiogroup:last-child input[type="radio"]:before {
        display: none;
      }
      .survey-debrief-item[type='response'] input[type=text] {
        width: 90%;
        height: 32px;
        padding: 4px 4px;
        border: 1px solid #ccc;
        border-radius: 4px;
      }
      .survey-debrief-footer {
        margin: auto;
        width: 900px;
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
  
      // initialize HTML
      html += '<form id="jspsych-survey-debrief">';
  
      // add preamble
      html += '<div class=survey-debrief-instructions>';
      html += '<p><font color="#c87606">Your answers will not affect your payment or further participation in the study, but will help us improve the study for other participants.</font></p>'
      html += '</div>';
  
      // initialize survey container
      html += '<div class="survey-debrief-container">';
      
      // add prompt 1
      html += '<div class="survey-debrief-item" type="prompt">';
      html += '<p>Did you experience any technical issues with e-couch?</p>';
      html += '</div>';
  
      // add free response option
      html += '<div class="survey-debrief-item" type="response">';
      html += '<input type="text" name="ecouch-tech">';
      html += '</div>';

      // add prompt 2
      html += '<div class="survey-debrief-item" type="prompt">';
      html += '<p>How clear were the instructions and explanations about when and how to access e-couch?</p>';
      html += '</div>';
  
      // add free response option
      html += '<div class="survey-debrief-item" type="response">';
      html += '<input type="text" name="ecouch-instructions">';
      html += '</div>';

      // add prompt 3
      html += '<div class="survey-debrief-item" type="prompt">';
      html += '<p>How helpful did you find the modules in e-couch?</p>';
      html += '</div>';
  
      // add free response option
      html += '<div class="survey-debrief-item" type="response">';
      html += '<input type="text" name="ecouch-effectiveness">';
      html += '</div>';

      // add prompt 4
      html += '<div class="survey-debrief-item" type="prompt">';
      html += '<p>Did you learn anything new from the modules in e-couch?</p>';
      html += '</div>';
  
      // add free response option
      html += '<div class="survey-debrief-item" type="response">';
      html += '<input type="text" name="ecouch-novelty">';
      html += '</div>';

      // add prompt 5
      html += '<div class="survey-debrief-item" type="prompt">';
      html += '<p>Do you have any suggestions on how to improve your experience as a participant in the study?</p>';
      html += '</div>';
  
      // add free response option
      html += '<div class="survey-debrief-item" type="response">';
      html += '<input type="text" name="suggestions">';
      html += '</div>';

      // add prompt 6
      html += '<div class="survey-debrief-item" type="prompt">';
      html += '<p>How helpful were the reminder/encouragement emails?</p>';
      html += '</div>';
  
      // add free response option
      html += '<div class="survey-debrief-item" type="response">';
      html += '<input type="text" name="emails">';
      html += '</div>';

      // add prompt 7
      html += '<div class="survey-debrief-item" type="prompt">';
      html += '<p>Did you find the workload of the study acceptable?</p>';
      html += '</div>';
  
      // add free response option
      html += '<div class="survey-debrief-item" type="response">';
      html += '<input type="text" name="workload">';
      html += '</div>';

      // add prompt 8
      html += '<div class="survey-debrief-item" type="prompt">';
      html += '<p>Did you find you were clearly informed about all parts of the study in advance?</p>';
      html += '</div>';
  
      // add free response option
      html += '<div class="survey-debrief-item" type="response">';
      html += '<input type="text" name="informed">';
      html += '</div>';

      // add prompt 9
      html += '<div class="survey-debrief-item" type="prompt">';
      html += '<p>What could the study team do differently to make it better for the next participant?</p>';
      html += '</div>';
  
      // add free response option
      html += '<div class="survey-debrief-item" type="response">';
      html += '<input type="text" name="better experience">';
      html += '</div>';

      // add prompt 10
      html += '<div class="survey-debrief-item" type="prompt">';
      html += '<p>How well were you able to represent how you were feeling using the rating scale?</p>';
      html += '</div>';
  
      // add free response option
      html += '<div class="survey-debrief-item" type="response">';
      html += '<input type="text" name="rating">';
      html += '</div>';

      // add prompt 11
      html += '<div class="survey-debrief-item" type="prompt">';
      html += '<p>Was there anything unclear about the instructions?</p>';
      html += '</div>';
  
      // add free response option
      html += '<div class="survey-debrief-item" type="response">';
      html += '<input type="text" name="instructions">';
      html += '</div>';

      // add prompt 12
      html += '<div class="survey-debrief-item" type="prompt">';
      html += '<p>What were some things that helped or hindered your progress on e-couch?</p>';
      html += '</div>';
  
      // add free response option
      html += '<div class="survey-debrief-item" type="response">';
      html += '<input type="text" name="ecouch-experience">';
      html += '</div>';

      // add prompt 13
      html += '<div class="survey-debrief-item" type="prompt">';
      html += '<p>Did you find that the information you needed to engage with the task/e-couch modules were readily available to you?</p>';
      html += '</div>';
  
      // add free response option
      html += '<div class="survey-debrief-item" type="response">';
      html += '<input type="text" name="information">';
      html += '</div>';
    
  
      // Close survey-debrief-container.
      html += '</div>';
  
      // Add submit button.
      html += '<div class="survey-debrief-footer">';
      html += `<input type="submit" id="jspsych-survey-debrief-next" class="jspsych-btn jspsych-survey-debrief" value="${trial.button_label}"></input>`;
      html += '</div>';
  
      // End survey.
      html += '</form>';
  
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
              "rt": response_time,
              "responses": question_data
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
  