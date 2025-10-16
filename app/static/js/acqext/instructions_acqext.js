/*
INSTRUCTIONS: Acquisition + Extinction

Note: Includes trigger warning and extra page for participants to adjust volume one final time before experiment begins.
*/

// First page welcoming participant to experiment
const introduction = {
	type: "instructions",
	pages: [
		`<h1>Shrieking Cards</h1>
    <br><p style="padding:0 200px">In every round, you will be shown a card with either moon or candles on it.
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
const keyboardResponseInstructions = {
	type: "instructions",
	pages: [
		`<p style="padding:0 200px">Every so often, you will be asked to share your
    predictions about the cards and the sounds you think they will make.
    <br><br>Other times, you will be asked to rate your feelings about the moon or candle cards.
    <br><br></p>`,
	],
	allow_backward: false,
	button_label_next: "Continue",
	post_trial_gap: 300,
	show_clickable_nav: true,
}

const audioWord = "../../static/audio/fctask-shared/leftChannelGirl.mp3";
const audioLoudness = "../../static/audio/fctask-shared/loudnessCheck.wav"

const audioPreTest = {
	type: 'comprehension-check',
	instruction_pages: [
	  `<h3>Before we continue, let's do an audio check.</h3>
	  <br><p style="padding: 0 200px">There are two audio clips below to help calibrate your volume.
    <br><br>With the first clip, adjust your volume so that you can just hear someone speaking but NOT make out what is being said:
    <br>
	  <div id="player"><audio controls><source src=${audioLoudness} type="audio/mpeg"></audio></div>
    <br><br>Now use this second clip to check that you are able to hear the word being said, and make sure you can hear it CLEARLY. If not, increase your volume until you do:
    <br>
	  <div id="player"><audio controls><source src=${audioWord} type="audio/mpeg"></audio></div>
    <br><br>Please try to maintain your volume for the duration of the study.
	  <br><br>When you are ready, you can proceed.
    <br><br></p>`
 	 ],
	  // Here are the questions for the above audio pretest
	questions: [
    {
      prompt: `<p style="padding: 0 200px">Which word did you hear in the second audio clip?`,
      options: ["furl ", "girl ", "house ", "mouse "],
      correct_answer: "girl ",
      required: true,
      horizontal: false
      },
    {
      prompt: `<p style="padding: 0 200px">In one of the audio clips, the sound was only coming from one side. Which audio channel was the sound coming from (i.e. did you hear the sound in your left or right ear)?`,
      options: ["right ", "left "],
      correct_answer: "left ",
      required: true,
      horizontal: false
      },
	],
	show_clickable_nav: true,
	show_page_number: false,
	randomize_question_order: false,
  button_label: "Continue",
  button_label_next: "Continue",
	failure_text: "Unfortunately, you didn't answer the question correctly. Please review the instructions and then try again.",
	data: {
		test_type: "comprehension-check-audio-channel",
	},
	on_finish(data){
		data.comp_check_response = jsPsych.data.getLastTrialData().select("responses").values;
	}
};

// Practice Rounds
const practiceInstructions = {
  type: "instructions",
  pages: [
    `<h3>Let's do a few practice rounds!</h3><br>
    <p style="padding:0 200px">The pictures you will see on the practice cards and the sounds played during these practice rounds are going to be different from those in the actual experiment later on.<br>
    <br>The purpose of these practice rounds is to give you a feel for what you will have to do in the actual experiment -- such as pressing spacebar to proceed, and how the rating scales will work.<br>
    <br>When you are ready, press begin to start the practice.</p><br><br>`
  ],
  button_label: "Begin",
  button_label_next: "Begin",
  post_trial_gap: 300,
  show_clickable_nav: true,
};

// End Practice
const endPractice = {
  type: "instructions",
  pages: [
    `<h3>Great job with the practice!</h3><br>
    There are just a few more things to note before we begin.<br><br>`
  ],
  button_label: "Continue",
  button_label_next: "Continue",
  post_trial_gap: 300,
  show_clickable_nav: true,
};

// Trigger Warning
const triggerWarning = {
	type: "instructions",
	pages: [
		`<h3 style="color: red;">Trigger Warning</h3>
    <p style="padding:0 200px">This study involves being exposed to screams which may be startling and unpleasant for some. 
    <br><br>
    Here is an example of the kind of scream you may hear:
    <br>
    <div id="player"><audio controls><source src=${aversive3} type="audio/mpeg"></audio></div>
    <br><br>
    <p style="padding:0 200px">If this may be intolerable for you, please exit the task and let the study team know. Otherwise, please click Continue to proceed. 
    </p><br><br>`
	],
	allow_backward: false,
	button_label_next: "Continue",
	post_trial_gap: 300,
	show_clickable_nav: true,
}

// Instructions to remain at volume
const audioInstructions = {
	type: "instructions",
	pages: [
		`<h3 style="padding: 0 200px">Please try to maintain your volume for the duration of the entire experiment.</h3>
		<p style="padding: 0 200px">You may adjust the volume one final time before we begin.
    <br>Please make sure you can hear the sentence being read in the following audio clip comfortably. In this task, you will be instructed by audio to press specific letters. Please make sure that you always press the corresponding letter such that we can know that you can do all parts of the study correctly and pay the attention throughout. An example of the audio is like the one below:
    <br>
    <div id="player"><audio controls><source src=${attentionCheckAudioFiles[5]} type="audio/mpeg"></audio></div>
    <br>At the same time, check to make sure the scream in the following audio clip is not unbearably loud (Do note that the scream is meant to be unpleasant but not intolerable): 
    <br>
    <div id="player"><audio controls><source src=${aversive3} type="audio/mpeg"></audio></div>
    <br>If you find the scream is too loud with the current volume, please do not continue the task.
    <br><br>
    Thank you for your patience, let us begin the experiment now!</p><br><br>`
	],
	button_label: "Start",
  button_label_next: "Start",
	post_trial_gap: 300,
	show_clickable_nav: true,
};

const beginTask = {
  type: "instructions",
  pages: [
    `<h3>Let's start!</h3><br><br>`
  ],
  button_label: "Continue",
  button_label_next: "Continue",
  post_trial_gap: 300,
  show_clickable_nav: true,
};



// Instructions Timeline
const taskInstructions = {
  timeline: [
    introduction,
    keyboardResponseInstructions,
    audioPreTest,
  ]
}

const triggerWarnings = {
  timeline: [
    triggerWarning,
    audioInstructions,
  ]
}

// Instructions for ending the task
const mhalert = {
	type: 'mental-health-alert',
};

const volumeDebrief = {
  type: 'survey-debrief'
}

const breakReminder = {
	type: 'instructions',
	pages: [
	  "<h1>A quick reminder about breaks:</h1>" +
	  "<p>You are about to exit this task, and return to the main page where you see all the other tasks in the experiment.</p>" +
	  "</br>If you begin to get tired or bored, we encourage you to take a short break before starting the next part."
	],
	key_forward: 'j',
	show_clickable_nav: true,
};
