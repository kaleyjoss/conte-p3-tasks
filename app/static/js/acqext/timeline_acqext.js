/*
EXPERIMENT TIMELINE: Acquisition + Extinction

Current Design: (see fctask_design.js for up-to-date task parameters)
- 6 practice trials (50% reinforced with neutral sound)
- 26 trials in acquisition, 30 trials in extinction
- each block has 5CS- and 8CS+
- reinforcement schedule during acquisition is 50%
- trial sequence hard-coded

NEW UPDATES:
* Filler page added after rating scales + attention checks
  to reorient the participant back to the spacebar. 
* April 2023: Removed timeouts on trials (does not proceed without a keypress).
* Jun 2023: Added one expectancy rating at the end of extinction. 

Files referenced:
- app/static/js/recovery/instructions_acqext.js
- app/static/js/fctask_shared/fctask_attention_check.js
- app/static/js/fctask_shared/fctask_data_functions.js    <- for data variables is saved
- app/static/js/fctask_shared/fctask_design.js            <- for number of trials
- app/static/js/fctask_shared/fctask_rating_scales.js     <- for when rating scales are shown
- app/static/js/symptom_surveys.js
*/


/***************************************************
 
 DEBUG MODE TOGGLE
 
 ***************************************************/

// Debugging Mode
let debugMode = false; // TOGGLE TO FALSE BEFORE PRODUCTION!!!
if (debugMode) {
nTrialsPractice = 1;
	nTrialsAcq = 1;
  nTrialsBlock = 1;
  nTrialsExtinction = 1;
  nTrialsPractice = 1;
}


// go into full screen
const full_screen = {
	type: 'fullscreen',
	fullscreen_mode: true
};

// preload audio and images
const preload = {
  type: 'preload',
  images: [csPlus, csMinus, attentionCheckIcon, stim],
  audio: [aversive1, aversive2, aversive3, ambient, attentionCheckAudioFiles, audioWord, audioLoudness],
  message: 'Loading experiment files. This may take a moment depending on your internet connection.',
  error_message: '<p>The experiment failed to load, please contact the experimenter.</p>',
  continue_after_error: true,
  show_progress_bar: true,
  max_load_time: 180000,	
  show_detailed_errors: true,
}

let timelineAcqExt = [];

// full task
timelineAcqExt.push(full_screen);
timelineAcqExt.push(preload);
timelineAcqExt.push(taskInstructions);

// Practice Block
timelineAcqExt.push(practiceInstructions);

let practiceTrials; // 6 trials
for (let i=0; i < nTrialsPractice; i++) {
  practiceTrials = {
    type: 'fctask-trial',
    stimulus_audio: practiceAudio[i],
    stimulus_image: stim,
    card_prompt: `(Press spacebar to proceed)`,
    background_colour: "White",
    font_colour: "Black",
    data: {
      fc_phase: 'practice',
      fc_trial: i,
    },
  };
  timelineAcqExt.push(practiceTrials);
  // expectancy rating after each practice trial
  timelineAcqExt.push(practiceExpectancy);
}
// one affective rating after practice block
timelineAcqExt.push(practiceAffectiveRating);
timelineAcqExt.push(endPractice);

timelineAcqExt.push(triggerWarnings);


/*
ACQUISITION PHASE - TWO BLOCKS
- 3x affective ratings; once before block 1, and after each block
- 2x attention checks; after block 1 and block 2
- expectancy ratings pseudo-randomised to have 9 (in phase) + 1 (at start)
*/

// affective rating #1 (pre block)
timelineAcqExt.push(affectiveRating);

// expectancy rating #1 (once before block 1)
timelineAcqExt.push(expectancyRating);
timelineAcqExt.push(pressSpacebar);

// Acquisition Block One
let acqBlockOne;
for (let i=0; i < nTrialsAcq; i++) {
  acqBlockOne = {
    type: 'fctask-trial',
    stimulus_audio: acqOneAudio[i],
    stimulus_image: acqOneImage[i],
    data: {
      fc_phase: 'acquisitionBlockOne',
      fc_trial: i,
    },
  };
  timelineAcqExt.push(acqBlockOne);
  // expectancy rating 
  if (expectancyAcqA[i] == 1) {
    timelineAcqExt.push(expectancyRating);
    timelineAcqExt.push(pressSpacebar);
  }
}

// affective rating #2 (post block)
timelineAcqExt.push(affectiveRating);

// attention check #1 (post block)
timelineAcqExt.push(attentionCheckG);
timelineAcqExt.push(pressSpacebar);

// Acquisition Block Two
let acqBlockTwo;
for (let i=0; i < nTrialsAcq; i++) {
  acqBlockTwo = {
    type: 'fctask-trial',
    stimulus_audio: acqTwoAudio[i],
    stimulus_image: acqTwoImage[i],
    data: {
      fc_phase: 'acquisitionBlockTwo',
      fc_trial: i,
    },
  };
  timelineAcqExt.push(acqBlockTwo);
  // expectancy rating
  if (expectancyAcqB[i] == 1) {
    timelineAcqExt.push(expectancyRating);
    timelineAcqExt.push(pressSpacebar);
  }
}

// affective rating #3 (post block)
timelineAcqExt.push(affectiveRating);

// attention check #2 (post block)
timelineAcqExt.push(attentionCheckU);


/*
SURVEYS
- IPIP (International Personality Item Pool)
*/
timelineAcqExt.push(ipip_mini[0]);
timelineAcqExt.push(ipip_mini[1]);

/*
EXTINCTION PHASE - THREE BLOCKS
- 3x affective ratings; post blocks
- 1x attention check; after block 2
- expectancy ratings pseudo-randomised to 10 (in phase) + 1 (at start)
*/

// expectancy rating #1 (once before block 1)
timelineAcqExt.push(expectancyRating);
timelineAcqExt.push(pressSpacebar);

// Extinction Block One
let extinctionBlockOne;
for (let i=0; i < nTrialsExtinction; i++) {
  extinctionBlockOne = {
    type: 'fctask-trial',
    stimulus_image: extinctionOne[i],
    data: {
      fc_phase: 'extinctionBlockOne',
      fc_trial: i,
    },
  };
  timelineAcqExt.push(extinctionBlockOne);
  // expectancy rating
  if (expectancyExtA[i] == 1) {
    timelineAcqExt.push(expectancyRating);
    timelineAcqExt.push(pressSpacebar);
  }
}

// affective rating #1 (post block)
timelineAcqExt.push(affectiveRating);
timelineAcqExt.push(pressSpacebar);


// Extinction Block Two
let extinctionBlockTwo;
for (let i=0; i < nTrialsExtinction; i++) {
  extinctionBlockTwo = {
    type: 'fctask-trial',
    stimulus_image: extinctionTwo[i],
    data: {
      fc_phase: 'extinctionBlockTwo',
      fc_trial: i,
    },
  };
  timelineAcqExt.push(extinctionBlockTwo);
  // expectancy rating
  if (expectancyExtB[i] == 1) {
    timelineAcqExt.push(expectancyRating);
    timelineAcqExt.push(pressSpacebar);
  }
}

// affective rating #2 (post block)
timelineAcqExt.push(affectiveRating);

// attention check #1 (post block)
timelineAcqExt.push(attentionCheckF);
timelineAcqExt.push(pressSpacebar);

// Extinction Block Three
let extinctionBlockThree;
for (let i=0; i < nTrialsExtinction; i++) {
  extinctionBlockThree = {
    type: 'fctask-trial',
    stimulus_image: extinctionThree[i],
    data: {
      fc_phase: 'extinctionBlockThree',
      fc_trial: i,
    },
  };
  timelineAcqExt.push(extinctionBlockThree);
  // expectancy rating
  if (expectancyExtC[i] == 1) {
    timelineAcqExt.push(expectancyRating);
    timelineAcqExt.push(pressSpacebar);
  }
}
// affective rating #3 (post block)
timelineAcqExt.push(affectiveRating);

// debrief with questions
timelineAcqExt.push(volumeDebrief);

// task end
timelineAcqExt.push(breakReminder);

/*
Acquisition+Extinction is Task #1 in the Fear Conditioning task,
so there is no debrief-questions or debrief-information.
*/
 
