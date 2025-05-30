/*
EXPERIMENT TIMELINE
Spontaneous Recovery Phase + Relearning (Task 3)

Current Design: (see fctask_design.js for up-to-date task paramters)
- 16 trials (2 blocks of 8) of Spontaneous Recovery
  - 0% reinforcement schedule
- 16 trials (2 blocks of 8) of Relearning
  - approx. 50% reinforcement schedule 
- trial sequence hard-coded

NEW UPDATES:
* Filler page added after rating scales + attention checks
  to reorient the participant back to the spacebar. 
* April 2023: Removed timeouts on trials (does not proceed without a keypress).
* June 2023: Removed one expectancy rating between recovery and relearning phase.

Files referenced:
- app/static/js/recovery/instructions_recovery.js
- app/static/js/fctask_shared/fctask_attention_check.js
- app/static/js/fctask_shared/fctask_data_functions.js
- app/static/js/fctask_shared/fctask_design.js
- app/static/js/fctask_shared/fctask_rating_scales.js
*/

/***************************************************
 
 DEBUG MODE TOGGLE
 
 ***************************************************/

// Debugging Mode
let recoveryDebugMode = false; // toggle before production!

if (recoveryDebugMode) {
  nTrialsBlock = 1;
  nTrialsRecovery = 1;
  nTrialsRelearning = 1;
}

const full_screen = {
	type: 'fullscreen',
	fullscreen_mode: true
};

let timelineRec = [];

timelineRec.push(full_screen);

// Expectancy and Affect Ratings
// before instructions
timelineRec.push(affectiveRating);
timelineRec.push(expectancyRating);

// Instructions
timelineRec.push(recoveryTaskInstructions);

/*
SPONTANEOUS RECOVERY - TWO BLOCKS
- 3x affective ratings; once before block 1, and after each block
- 1x attention checks; before block 1
- expectancy ratings pseudo-randomised per 4 trials; once before block 1
*/

// affective rating #1 (pre block)
timelineRec.push(affectiveRating);

// attention check
timelineRec.push(attentionCheckT);

// expectancy rating (once before block 1)
timelineRec.push(expectancyRating);
timelineRec.push(pressSpacebar);

// Recovery Block One
let recoveryBlockOne;
for (let i=0; i < nTrialsRecovery; i++) {
recoveryBlockOne = {
    type: 'fctask-trial',
    stimulus_image: recoveryOne[i],
  };
  timelineRec.push(recoveryBlockOne);
  // expectancy rating
  if (expectancyRec[i] == 1) {
    timelineRec.push(expectancyRating);
    timelineRec.push(pressSpacebar);
  }
}

// affective rating
timelineRec.push(affectiveRating);
timelineRec.push(pressSpacebar);

// Recovery Block Two
let recoveryBlockTwo;
for (let i=0; i < nTrialsRecovery; i++) {
  recoveryBlockTwo = {
    type: 'fctask-trial',
    stimulus_image: recoveryTwo[i],
  };
  timelineRec.push(recoveryBlockTwo);
  // expectancy rating
  if (expectancyRec[i] == 1) {
    timelineRec.push(expectancyRating);
    timelineRec.push(pressSpacebar);
  }
}
// affective rating
timelineRec.push(affectiveRating);


/*
RELEARNING - TWO BLOCKS
- 3x affective ratings; 1 before, once after each block
- 2x attention checks; before block 1, after block 2
- expectancy ratings pseudo-randomised to 4 total
*/

// attention check #2
timelineRec.push(attentionCheckG);
timelineRec.push(pressSpacebar);

// Relearning Block One
let relearnBlockOne;
for (let i=0; i < nTrialsRelearning; i++) {
  relearnBlockOne = {
    type: 'fctask-trial',
    stimulus_audio: relearnOneAudio[i],
    stimulus_image: relearnOne[i],
  };
  timelineRec.push(relearnBlockOne);
  // expectancy rating
  if (expectancyRelA[i] == 1) {
    timelineRec.push(expectancyRating);
    timelineRec.push(pressSpacebar);
  }
}
// affective rating
timelineRec.push(affectiveRating);
timelineRec.push(pressSpacebar);

// Relearning Block Two
let relearnBlockTwo;
for (let i=0; i < nTrialsRelearning; i++) {
  relearnBlockTwo = {
    type: 'fctask-trial',
    stimulus_audio: relearnTwoAudio[i],
    stimulus_image: relearnTwo[i],
  };
  timelineRec.push(relearnBlockTwo);
  // expectancy rating
  if (expectancyRelB[i] == 1) {
    timelineRec.push(expectancyRating);
    timelineRec.push(pressSpacebar);
  }
}
// affective rating
timelineRec.push(affectiveRating);


// attention check final
timelineRec.push(attentionCheckH);

// response style questions
// expectancy rating plugin modified for response style (conditional image display, additional text above prompt)
const responseStyle1 = {
  type: 'expectancy-rating-responsestyle',
  imageCSminus: csMinus, // candle
  context: `Emma saw 10 times a green circle on the computer screen. Each time she <br>
  saw the green circle, it was followed by a scream. Emma needs to indicate <br>
  <b>"How likely do you think the green circle will be followed by a scream?"</b> on a <br>
  scale from 0% (never) via 50% (half of the time) to 100% (always).`,
  prompt: "Please indicate below the response you think Emma should give!"
};

const responseStyle2 = {
  type: 'expectancy-rating-responsestyle',
  imageCSminus: csMinus, // candle
  context: `Liam saw 10 times an orange circle on the screen. The orange circle was <br>
  never followed by a scream. Liam needs to indicate <b>"How likely do you think <br>
  the orange circle will be followed by a scream?"</b> on a scale from <br>
  0% (never) via 50% (half of the time) to 100% (always).`,
  prompt: "Please indicate below the response you think Liam should give!"
};

const responseStyle3 = {
  type: 'expectancy-rating-responsestyle',
  imageCSminus: csMinus, // candle
  context: `Noah saw 10 times a red circle on the screen. The red circle was <br>
  followed at 5 random times by a scream, and it was at the other 5 random times <br>
  not followed by a scream. Noah needs to indicate <b>"How likely do you think the <br>
  red circle will be followed by a scream?"</b> on a scale from 0% (never) <br>
  via 50% (half of the time) to 100% (always)`,
  prompt: "Please indicate below the response you think Noah should give!"
};

const responseStyle4 = {
  type: 'expectancy-rating-responsestyle',
  imageCSminus: csMinus, // candle
  context: `Olivia saw 10 times a yellow circle on the screen. The yellow circle was <br>
  followed by a scream the first three times, but not the following 7 times <br>
  when it was displayed. Olivia needs to indicate <b>"How likely do you think the <br>
  yellow circle will be followed by a scream?"</b> on a scale from 0% (never) <br>
  via 50% (half of the time) to 100% (always).`,
  prompt: "Please indicate below the response you think Olivia should give!"
};

timelineRec.push(responseStyleInstructions);
timelineRec.push(responseStyle1);
timelineRec.push(responseStyle2);
timelineRec.push(responseStyle3);
timelineRec.push(responseStyle4);

// probability questions
const probability1 = {
  type: 'expectancy-rating-responsestyle',
  imageCSminus: csMinus, // candle
  context: ``,
  prompt: "How likely will the sun rise tomorrow?",
};

const probability2 = {
  type: 'expectancy-rating-responsestyle',
  imageCSminus: csMinus, // candle
  context: ``,
  prompt: "How likely will a meteorite hit earth in the next month?"
};

const probability3 = {
  type: 'expectancy-rating-responsestyle',
  imageCSminus: csMinus, // candle
  context: ``,
  prompt: "Susan is having a baby. How likely will it be a girl?"
};

const probability4 = {
  type: 'expectancy-rating-responsestyle',
  imageCSminus: csMinus, // candle
  context: ``,
  prompt: "How likely will it rain in the desert?"
};

const probability5 = {
  type: 'expectancy-rating-responsestyle',
  imageCSminus: csMinus, // candle
  context: ``,
  prompt: "How likely will the bus be late during bad weather?"
};

timelineRec.push(probabilityInstructions);
timelineRec.push(probability1);
timelineRec.push(probability2);
timelineRec.push(probability3);
timelineRec.push(probability4);
timelineRec.push(probability5);

// rate scream
timelineRec.push(unpleasantRating);

// debrief with questions
timelineRec.push(volumeDebrief);

// debrief with content
timelineRec.push(mhalert);
