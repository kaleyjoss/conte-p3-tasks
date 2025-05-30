// -----------------------------------------------------------------------------
// INSTRUCTIONS


// // go into full screen
// const full_screen = {
// 	type: 'fullscreen',
// 	fullscreen_mode: true
// };

// First page welcoming participant to experiment
const recoveryIntroduction = {
	type: "instructions",
	pages: [
		`<h1>Shrieking Cards 2</h1>
    <br><p style="padding:0 200px">Similar to the first game, in every round, you will be shown a card with either moon or candles on it.
    <br><br>The moon cards and candle cards might make different sounds. 
    <br><br>You are to predict how likely you think a scream might follow the different cards.
    <br><br>To reveal the sound of the card: press the space bar.<br><br></p>`
	],
	allow_backward: false,
	button_label_next: "Continue",
	post_trial_gap: 300,
	show_clickable_nav: true,
}

// Keyboard response instructions 
const recoveryKeyboardResponseInstructions = {
	type: "instructions",
	pages: [
		`<p style="padding:0 200px">Every so often, you will be asked to share your
    predictions about the cards and how likely screams might occur.
    <br><br>Other times, you will be asked to rate your feelings about the moon or candle cards.
    <br><br></p>`,
    `<p style="padding: 0 200px">Please remember to continue to keep your headphones on. Your volume should remain similar to the previous parts of the experiment.
    <br><br>`
	],
	allow_backward: false,
	button_label_next: "Continue",
	post_trial_gap: 300,
	show_clickable_nav: true,
}

// Trigger Warning
const triggerWarning = {
	type: "instructions",
	pages: [
		`<h3>Trigger Warning</h3>
    <p style="padding:0 200px">Again, please note that this part of the experiment may involve being exposed to screams which may be startling and unpleasant for some. 
    <br><br>
    You have already heard some of the screams in the earlier parts of the experiment, but here is an example again of the screams you may hear:
    <br>
    <div id="player"><audio controls><source src=${aversive2} type="audio/mpeg"></audio></div>`
	],
	allow_backward: false,
	button_label_next: "Continue",
	post_trial_gap: 300,
	show_clickable_nav: true,
}

// Instructions to remain at volume
const recoveryAudioInstructions = {
	type: "instructions",
	pages: [
		`<h3 style="padding: 0 200px">Please try to maintain your volume for the duration of the study.</h3>
		<p style="padding: 0 200px">Your volume should have been maintained throughout the whole session. If not, please make sure to re-adjust the volume (by following the instructions below) before you continue.
    <br>Please make sure you can hear the sentence being read in the following audio clip comfortably, so that you can press a letter when instructed to do so in the study:
    <br>
    <div id="player"><audio controls><source src=${attentionCheckAudioFiles[5]} type="audio/mpeg"></audio></div>
    <br>At the same time, check to make sure the scream in the following audio clip is not unbearably loud (Do note that the scream is meant to be unpleasant but not intolerable): 
    <br>
    <div id="player"><audio controls><source src=${aversive2} type="audio/mpeg"></audio></div>
    Thank you and please maintain this volume for the rest of the study. Great, let's begin!<br><br></p>`
	],
	button_label: "Begin",
  button_label_next: "Begin",
	post_trial_gap: 300,
	show_clickable_nav: true,
};

const recoveryBeginTask = {
  type: "instructions",
  pages: [
    `<h3>Let's start!</h3><br><br>`
  ],
  button_label: "Continue",
  button_label_next: "Continue",
  post_trial_gap: 300,
  show_clickable_nav: true,
};

const recoveryTaskInstructions = {
  timeline: [
    recoveryIntroduction,
    recoveryKeyboardResponseInstructions,
    triggerWarning,
    recoveryAudioInstructions,
  ]
}

const responseStyleInstructions = {
	type: "instructions",
	pages: [`
    <br><p style="padding:0 200px">On the next few pages, you will read about which stimuli other people saw and heard. 
    <br><br>We will ask you to indicate how you think they should respond.<br><br></p>`
	],
	allow_backward: false,
	button_label_next: "Continue",
	post_trial_gap: 300,
	show_clickable_nav: true,
}

const probabilityInstructions = {
	type: "instructions",
	pages: [`
    <br><p style="padding:0 200px">On the next few pages, you will answer some questions on how likely certain events are to occur.`
	],
	allow_backward: false,
	button_label_next: "Continue",
	post_trial_gap: 300,
	show_clickable_nav: true,
}

const unpleasantRating = {
  type: "html-slider-response-modified",
  stimulus: "On a scale of 1 (not <b>un</b>pleasant at all) to 100 (as <b>un</b>pleasant as a sound can possibly be),<br> how <b>un</b>pleasant did you find the screams?",
  step: 5,
  require_movement: true,
  labels: ['0<br>least unpleasant', '100<br>most unpleasant'],
  slider_width: 500,
  on_finish: function(data){
    jsPsych.data.addProperties({'unpleasantness_slider':data.response})
  }
}

const volumeDebrief = {
  type: 'survey-debrief'
}

// Instructions for ending the task
const mhalert = {
	type: 'mental-health-alert',
};