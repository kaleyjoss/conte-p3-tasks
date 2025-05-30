/*
* Attention Checks
*/

// File path for fixation cross
const attentionCheckIcon = "../../static/img/fctask-shared/attention-check.png";

// Construct file path strings for audio files
const attentionCheckList = ['F', 'G', 'H', 'T', 'U'];
const attentionCheckAudioFiles = [
  `../../static/audio/fctask-shared/letter${attentionCheckList[0]}.m4a`,
  `../../static/audio/fctask-shared/letter${attentionCheckList[1]}.m4a`,
  `../../static/audio/fctask-shared/letter${attentionCheckList[2]}.m4a`,
  `../../static/audio/fctask-shared/letter${attentionCheckList[3]}.m4a`,
  `../../static/audio/fctask-shared/letter${attentionCheckList[4]}.m4a`,
  `../../static/audio/fctask-shared/letter${attentionCheckList[0]}.mp3`
]

// Fixation crosses with an audio test interlaced
const attentionCheckF = {
  type: 'image-keyboard-response',
  chioces: [attentionCheckList[0]],
  stimulus: attentionCheckIcon,
  stimulus_width: 500,
  data: {
    correct_key: `${attentionCheckList[0]}`,
  },
  trial_duration: 10000,
  response_ends_trial: true,
  on_start: function() {
    audio = new Audio(attentionCheckAudioFiles[0]);
    audio.play();
  },
  on_finish(trial_data) {
    if (audio) {
      audio.pause();
    }
    trial_data.attention_check_response = trial_data.response,
    console.log(trial_data)
  }
}

// Fixation crosses with an audio test interlaced
const attentionCheckG = {
  type: 'image-keyboard-response',
  chioces: [attentionCheckList[1]],
  stimulus: attentionCheckIcon,
  stimulus_width: 500,
  data: {
    correct_key: `${attentionCheckList[1]}`,
  },
  trial_duration: 10000,
  response_ends_trial: true,
  on_start: function() {
    audio = new Audio(attentionCheckAudioFiles[1]);
    audio.play();
  },
  on_finish(trial_data) {
    if (audio) {
      audio.pause();
    }
    trial_data.attention_check_response = trial_data.response,
    console.log(trial_data)
  }
}

// Fixation crosses with an audio test interlaced
const attentionCheckH = {
  type: 'image-keyboard-response',
  chioces: [attentionCheckList[2]],
  stimulus: attentionCheckIcon,
  stimulus_width: 500,
  data: {
    correct_key: `${attentionCheckList[2]}`,
  },
  trial_duration: 10000,
  response_ends_trial: true,
  on_start: function() {
    audio = new Audio(attentionCheckAudioFiles[2]);
    audio.play();
  },
  on_finish(trial_data) {
    if (audio) {
      audio.pause();
    }
    trial_data.attention_check_response = trial_data.response,
    console.log(trial_data)
  }
}

// Fixation crosses with an audio test interlaced
const attentionCheckT = {
  type: 'image-keyboard-response',
  chioces: [attentionCheckList[3]],
  stimulus: attentionCheckIcon,
  stimulus_width: 500,
  data: {
    correct_key: `${attentionCheckList[3]}`,
  },
  trial_duration: 10000,
  response_ends_trial: true,
  on_start: function() {
    audio = new Audio(attentionCheckAudioFiles[3]);
    audio.play();
  },
  on_finish(trial_data) {
    if (audio) {
      audio.pause();
    }
    trial_data.attention_check_response = trial_data.response,
    console.log(trial_data)
  }
}

// Fixation crosses with an audio test interlaced
const attentionCheckU = {
  type: 'image-keyboard-response',
  chioces: [attentionCheckList[4]],
  stimulus: attentionCheckIcon,
  stimulus_width: 500,
  data: {
    correct_key: `${attentionCheckList[4]}`,
  },
  trial_duration: 10000,
  response_ends_trial: true,
  on_start: function() {
    audio = new Audio(attentionCheckAudioFiles[4]);
    audio.play();
  },
  on_finish(trial_data) {
    if (audio) {
      audio.pause();
    }
    trial_data.attention_check_response = trial_data.response,
    console.log(trial_data)
  }
}

// Filler page after attention check to reorient to spacebar
const pressSpacebar = {
  type: 'html-keyboard-response-fc',
  stimulus: 'Please press Spacebar to proceed.',
  on_finish(trial_data) {
    trial_data.press_spacebar = trial_data.response
  },
}