/*
* ==============================================================================
*
* Fear Conditioning Task - Custom Plugin
* jsPsych plugin for deploying trials within the fear conditioning task
* Created: Jamie C. Chiu
* Date last updated: 11th July 2022
*
* ==============================================================================
*
* How this plugin works:
* - a card is shown face down + flips automatically
* - participant presses key corresponding to stimuli (rt measure)
* - audio sound is revealed as unconditioned stimuli (neutral or aversive)
* - trial ends after sound is played
* - warning is displayed if time lapses without response + trial ends
*
* ==============================================================================
*/



jsPsych.plugins["fctask-trial"] = (function() {

  var plugin = {};

  plugin.info = {
    name: "fctask-trial",
    parameters: {
      // stimuli for CS+
      // stimuli for CS-
      // when to reinforce CS+ (probability or hard-coded array)
      // implicit RT measure, keys to press
      // audio / unconditioned stimulus
      // trial duration
      stimulus_image: {
        type: jsPsych.plugins.parameterType.STRING, // BOOL, STRING, INT, FLOAT, FUNCTION, KEY, SELECT, HTML_STRING, IMAGE, AUDIO, VIDEO, OBJECT, COMPLEX
        default: null,
        description: "Stimulus (image) to be shown."
      },
      stimulus_audio: {
        type: jsPsych.plugins.parameterType.STRING,
        default: null,
        description: "Audio to be played."
      },
      valid_key: {
        type: jsPsych.plugins.parameterType.ARRAY,
        default: 32, // 32 == spacebar 
        description: 'The keys subject has to press to flip card - RT used as implicit measure of aversive learning.'
      },
      card_prompt: {
        type: jsPsych.plugins.parameterType.STRING,
        default: null,
        description: "Text to be displayed on top of card."
      },
      response_duration: {
        type: jsPsych.plugins.parameterType.STRING,
        default: 6000,
        description: "How long subject has to make a keypress before warning shows up."
      },
      background_colour: {
        type: jsPsych.plugins.parameterType.STRING,
        default: "MidnightBlue",
        description: "Changes the background colour."
      },
      font_colour: {
        type: jsPsych.plugins.parameterType.STRING,
        default: "White",
        description: "Changes the hint font colour."
      },
    },
  };
  

  plugin.trial = function(display_element, trial) {

    // to control for pacing and flow of trial
    const timeBeforeFlip = 500; // how long card is facedown for
    const transitionDelay = 100; // for the title to change on flip
    const audioDelay = Math.random() * 500; // random delay of <1s
    const timeAfterFlip = 300; // when audio plays after card flips
    const warningDuration = 3000; // how long warning feedback is displayed


    // for storing response
    let response = {
      key: null,
      rt: null,
      startTime: null,
      endTime: null,
      timeout: 0,
    };


    // -----------------------------------------------------------------------//
    // Initialising Trial: Define HTML
    // ----------------------------------------------------------------------// 
    
    let new_html = "";

    // insert CSS
    const style = `
      <style>
      .jspsych-display-element {
        background: ${trial.background_colour};
      }
      .jspsych-content-wrapper {
        background: ${trial.background_colour};
      }
      html * {
        color: white;
      }
      p {
        margin-block-start: 0px;
        margin-block-end: 0px;
      }
      body {
        background: ${trial.background_colour};
        overflow-x: hidden;
      }
      </style>
    `;

    new_html += style;

    // create card, face down
    new_html += `
      <div class="trial-container">
        <div class="trial-header">  
          <h1 class="trial-header" id="title-el">
        </div>
        <div class="trial-objects">
          <div class="flip-card" id="flip-card">
            <div class="flip-card-inner">
              <div class="flip-card-front" id="front-card-el">
              <img src="../../static/img/fctask-shared/card-face-back.png" style="width:90%; padding-top: 10px">
              </div>
              <div class="flip-card-back">
                <img src="${trial.stimulus_image}" style="width:80%; padding-top:80px">
                <audio id="audio-el"><source src="${trial.stimulus_audio}">
                </audio>
              </div>
            </div>
          </div>
        </div>  
      </div>
    `;

    // draw card
    display_element.innerHTML = new_html;

    // define constants for getting DOM elements
    let cardEl = document.getElementById("flip-card");
    let frontCardEl = document.getElementById("front-card-el");
    let titleEl = document.getElementById("title-el");
    let borderEl = document.getElementById("flip-card");


    // -----------------------------------------------------------------------//
    // Defining functions
    // ----------------------------------------------------------------------// 

     // function for keyboard listener
     const onKeyPress = function(event) {
      if(event.which == trial.valid_key) {
        response.key = event.which;
        console.log(event.which);
        afterResponse();
      }
    };
    
    function missedResponse() {
      document.removeEventListener("keydown", onKeyPress);
      response.timeout += 1;
      console.log(response.timeout);
      // warning message
      let msg = `
          <p style="position: absolute; left: 50%; top: 35%; -webkit-transform: translate(-50%, -50%); transform: translate(-50%, -50%); font-size: 20px; line-height: 1.5em; color: Orange">
          !!
          <br><br>Please respond to the card by pressing spacebar.<br><br>
        </p>
        `;
      display_element.innerHTML = style + msg;
      // display warning
      setTimeout( () => {
        display_element.innerHTML = new_html;
        // reinitialise all DOM elements
        let cardEl = document.getElementById("flip-card");
        let titleEl = document.getElementById("title-el");
        cardEl.setAttribute("status", "reveal");
        titleEl.style.fontSize = "20px";
        titleEl.style.color = trial.font_colour;
        titleEl.innerHTML = "(Press spacebar to proceed)";
        document.addEventListener("keydown", onKeyPress);
      }, warningDuration );
    };


    // function to flip card back down
    function returnCard() {
      let cardEl = document.getElementById("flip-card");
      let titleEl = document.getElementById("title-el");
      // initiate flip animation
      cardEl.setAttribute("status", "end");
      titleEl.innerHTML = " ";
    };

    // function for playing audio
    function playAudio() {
      if (trial.stimulus_audio == null) {
        setTimeout(() => {
          returnCard();
        }, 500);
        setTimeout(() => {
          endTrial();
        }, 1300);
      } else {
        const audio = document.getElementById("audio-el");
        console.log(audio.duration)
        setTimeout(() => {
          audio.play();
          console.log( "Sound");
        }, audioDelay);
        setTimeout(() => {
          returnCard();
        }, 500);
        setTimeout(() => {
          endTrial();
        }, 2500);
      }
    }
    
  

    function displayFeedback(){
      let titleEl = document.getElementById("title-el");
      let borderEl = document.getElementById("flip-card");
      // visual feedback, border gets thicker for a moment
      borderEl.style.border = "5px solid slategray";
      titleEl.style.color = "White"; // hides text
      // border resets + sound is played
      setTimeout(() => {
        borderEl.style.border = "0px";
        setTimeout(() => {
          playAudio();
        }, timeAfterFlip);
      }, 500);
      
    };

    // after valid key is pressed
    function afterResponse() {
      // save data
      response.endTime = performance.now();
      response.rt = response.endTime - response.startTime;
      console.log("logged");
      displayFeedback();
      document.removeEventListener("keydown", onKeyPress);
      console.log("key listener stopped");
    };


    // function to flip card
    function revealCard() {
      let cardEl = document.getElementById("flip-card");
      let titleEl = document.getElementById("title-el");
      // save start of response period
      response.startTime = performance.now();
      // initiate flip animation
      cardEl.setAttribute("status", "reveal");
      // update title with transition delay
      setTimeout(function(){
        titleEl.innerHTML = trial.card_prompt;
        titleEl.style.fontSize = "20px";
        titleEl.style.color = trial.font_colour; // hides text
      }, transitionDelay);  
    };

    //------------------------------------------------------------------------//
    // Sequencing of trial
    //------------------------------------------------------------------------//

    // flip card + start keyboard listener
    setTimeout(() => {
      // flip card
      revealCard();
      // start keyboard listener
      document.addEventListener("keydown", onKeyPress);
    }, timeBeforeFlip);

    // start timer for missed response
    const showWarning = setTimeout(() => {
      if( response.rt == null ) {
        missedResponse();
      }
    }, trial.response_duration);

    //  // start timer for missed response
    //  const timeoutTwo = setTimeout(() => {
    //   if(isNaN(response.rt)) {
    //     missedResponse();
    //   }
    // }, trial.response_duration + trial.response_duration + warningDuration);

    // // start timer for missed response
    // const timeoutThree = setTimeout(() => {
    //   if(isNaN(response.rt)) {
    //     missedResponse();
    //   }
    // }, trial.response_duration + trial.response_duration + trial.response_duration + warningDuration + warningDuration);

 
    // end trial
    function endTrial() {

      clearTimeout(showWarning);
      
      // data to be saved
      let trialData = {
        trial_type: "fc_trial",
        stimulus_image: trial.stimulus_image,
        stimulus_audio: trial.stimulus_audio,
        endTime: response.endTime,
        fc_rt: response.rt,
        fc_key: response.key,
        timeout: response.timeout

      };
      // slight delay before trial ends
      setTimeout(() => {
        display_element.innerHTML = "";
        jsPsych.finishTrial(trialData);
      }, 300);
    }

  };

  return plugin;
})();

