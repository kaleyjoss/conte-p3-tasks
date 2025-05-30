/*
DATA-SAVING FUNCTIONS
Fear Conditioning Task, Acquisition+Extinction and Recovery Phase
*/

// saves entire task setup, saved at end of Task 3
var fcTaskSaveSetup = function(){
  var fcTaskSetup ={
    stimulus_display_order : [
      acqOneImage,
      acqTwoImage,
      extinctionOne,
      extinctionTwo,
      extinctionThree,
      recoveryOne,
      recoveryTwo,
      relearnOne,
      relearnTwo,
    ],
    acq_conditioning_order: [
      acqOneAudio,
      acqTwoAudio,
    ],
    relearn_conditioning_order: [
      relearnOneAudio,
      relearnTwoAudio,
    ],
    cs_plus_stimulus: csPlus,
    cs_minus_stimulus: csMinus,
    cs_practice_stimulus: stim,
    aversive_audio: [
      aversive1,
      aversive2,
      aversive3
    ],
    practice_audio: ambient,
    
    // comprehension check data
    test_type: jsPsych.data.get().select('test_type').values,
    comp_check_response: jsPsych.data.get().select('comp_check_response').values,
    question_order: jsPsych.data.get().select('question_order').values,
    // data from debrief survey
    debrief_responses: jsPsych.data.get().select('debriefing').values,
  };
  jsPsych.data.get().addToLast(fcTaskSetup);
};


/*
Function is called twice (i.e. after the end of each task; once after Acquition + Extinction Phase,and again after Recovery Phase.)
*/

var fcTaskSaveData = function () {
  const fcTaskData = {
    // block + phase name
    fc_phase: jsPsych.data.get().select('fc_phase').values,

    // rt for fc trials
    fc_rt: jsPsych.data.get().select('fc_rt').values, // not differentiated between stimulus
    stimulus_image: jsPsych.data.get().select('stimulus_image').values,
    stimulus_audio: jsPsych.data.get().select('stimulus_audio').values,

    // attention check data
    attention_check_response: jsPsych.data.get().select('attention_check_response').values, // null if wrong

    // expectancy rating data
    expectancy_cs_plus: jsPsych.data.get().select('csPlusRating').values,
    expectancy_cs_minus: jsPsych.data.get().select('csMinusRating').values,

    // affective rating data
    affective_cs_plus: jsPsych.data.get().select('csPlusAffectRating').values,
    affective_cs_minus: jsPsych.data.get().select('csMinusAffectRating').values,

    // Data from plugins 
    trial_type: jsPsych.data.get().select('trial_type').values,
    trial_index: jsPsych.data.get().select('trial_index').values,
  }
  // appends to end of dataset
  jsPsych.data.get().addToLast(fcTaskData);
};

var saveInteractionData = function() {
  const interactionData = jsPsych.data.getInteractionData();
  jsPsych.data.get().addToLast(interactionData);
}

var saveSurveyData = function(){
  var surveyData = {
    ipip: jsPsych.data.get().filter({survey: 'ipip_mini'}).values(),
  }
  jsPsych.data.get().addToLast(surveyData);
}

var saveResponseStyleData = function(){
    var responseStyleData = {
      responsestyle_cs: jsPsych.data.get().select('responseStyleCsRating').values,
    }
    jsPsych.data.get().addToLast(responseStyleData);
}

var saveUnpleasantnessData = function(){
  var unpleasantnessData = {
    unpleasantness_slider: jsPsych.data.get().select('unpleasantness_slider').values,
  }
  jsPsych.data.get().addToLast(unpleasantnessData);
}

var saveDatafcTaskOne = function () {
  saveInteractionData();
  fcTaskSaveData();
  saveSurveyData();
  on_success('acqext');
}
	
var saveDatafcTaskRecovery = function () {
  fcTaskSaveSetup();
  saveInteractionData();
  fcTaskSaveData();
  saveResponseStyleData();
  saveUnpleasantnessData();
  on_success('recovery');
}

