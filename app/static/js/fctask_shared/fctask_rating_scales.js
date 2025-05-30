/*
* RATING SCALES: Expectancy and Affective Ratings
*
* - Defining the affective and expectancy rating scale variables
* - Defining the sequence for when expectancy ratings are presented:
*   CURRENT DESIGN: on average, every FOUR trials; 
*   with one before trial #1 and the next at trial #4
* - Custom plugins located in: 
*    app/static/lib/jsPsych/plugins/custom/
*     - jspsych-affective-rating.js
*     - jspsych-expectancy-rating.js
*/

// practice expectancy rating
// expectancy rating default shows both CS images
const practiceExpectancy = {
  type: 'expectancy-rating',
  imageCSminus: stim, // candle
  prompt: "How likely do you think this image will be followed by a sound?",
  background_colour: "White",
  font_colour: "Black",
};

// expectancy rating default shows both CS images
const expectancyRating = {
  type: 'expectancy-rating',
  imageCSminus: csMinus, // candle
  imageCSplus: csPlus, // moon
  prompt: "How likely do you think each image will be followed by a scream?"
};

// define the array for when the expectancy rating is presented
const expectancyAcqA = [ // 4 (1 pushed at beginning of phase)
  0, 0, 0, 1, 0,
  0, 1, 0, 0, 1,
  0, 1, 0
];

const expectancyAcqB = [ // 5
  0, 0, 0, 1, 0,
  0, 1, 1, 0, 1,
  0, 0, 1
];

const expectancyExtA = [ // 3
  0, 0, 0, 1,
  0, 0, 0, 1,
  1, 0, 
];

const expectancyExtB = [ // 3
  0, 0, 0, 1,
  0, 1, 0, 1,
  0, 0,  
];

const expectancyExtC = [ // 4
  0, 0, 0, 1,
  0, 1, 0, 1,
  0, 1,  
];

const expectancyRec = [ // every 4
  0, 0, 0, 1,
  0, 0, 0, 1, 
];

const expectancyRelA = [ // every 4
  0, 0, 0, 1,
  0, 0, 0, 1,
  // 0, 0 
];

const expectancyRelB = [ // every 4
  0, 1, 0, 0,
  0, 1, 0, 0,
  // 0, 1 
];


// affective rating you need to specify which image

const practiceAffectiveRating = {
  type: 'affective-rating',
  imageCSminus: stim, // orange image
  prompt: "How do you feel when looking at this image?",
  background_colour: "White",
  font_colour: "Black",
};

const affectiveRating = {
  type: 'affective-rating',
  imageCSminus: csMinus, // candle
  imageCSplus: csPlus, // moon
  prompt: "How do you feel when looking at each picture?"
};