/**
* International Personality Item Pool (IPIP)
*
* https://osf.io/ycvdk/
*
* Donnellan, M. B., Oswald, F. L., Baird, B. M., & Lucas, R. E. (2006).
* The mini-IPIP scales: tiny-yet-effective measures of the Big Five factors of
* personality. Psychological assessment, 18(2), 192.
*
* Cooper, A. J., Smillie, L. D., & Corr, P. J. (2010). A confirmatory factor
* analysis of the Mini-IPIP five-factor model personality scale. Personality
* and Individual Differences, 48(5), 688-691.
*
**/

//---------------------------------------//
// Define survey parameters.
//---------------------------------------//

// Define items.
var ipip_items = [

  // Extraversion
  "Am the life of the party.",
  "Talk to a lot of different people at parties.",
  "Don't talk a lot.",
  "Keep in the background.",

  // Agreeableness
  "Sympathize with others' feelings.", //exact item not found in pdf?
  "Feel others' emotions.",
  "Am not really interested in others.",
  "Am not interested in other people's problems.",

  // Conscientiousness
  "Get chores done right away.",
  "Like order.",
  "Often forget to put things back in their proper place.",
  "Make a mess of things.", //exact item not found in pdf?

  // Neuroticism
  "Have frequent mood swings.",
  "Get upset easily.",
  "Am relaxed most of the time.",
  "Seldom feel blue.",

  // Intellect or Imagination
  "Have a vivid imagination.",
  "Have difficulty understanding abstract ideas.",
  "Am not interested in abstract ideas.",
  "Do not have a good imagination.",

];

// Define scale.
const ipip_scale = [
  "Very<br>inaccurate",
  "Moderately<br>Inaccurate",
  "Neither Accurate<br>Nor Inaccurate",
  "Moderately<br>Accurate",
  "Very<br>Accurate"
];

// Define reverse-coding.
var ipip_reverse = [
  false, false, true, true,
  false, false, true, true,
  false, false, true, true,
  false, false, true, true,
  false, true, true, true,
];

//---------------------------------------//
// Randomize item order.
//---------------------------------------//

// Define item order.
if (Math.random() < 0.5) {

  // Completely across items.
  var ipip_item_order = jsPsych.randomization.shuffle([...Array(ipip_items.length).keys()]);

} else {

  // Randomize within subscales.
  var ipip_item_order = [].concat.apply([], jsPsych.randomization.shuffle([
    jsPsych.randomization.shuffle([0,1,2,3]),
    jsPsych.randomization.shuffle([4,5,6,7]),
    jsPsych.randomization.shuffle([8,9,10,11]),
    jsPsych.randomization.shuffle([12,13,14,15]),
    jsPsych.randomization.shuffle([16,17,18,19]),
  ]));

}

// Apply ordering.
ipip_items = ipip_item_order.map(i => ipip_items[i]);
ipip_reverse = ipip_item_order.map(i => ipip_reverse[i]);

for (let i = 0; i < ipip_items.length; i++) {
  console.log(ipip_items[i], ipip_reverse[i]);
}

//---------------------------------------//
// Define survey node.
//---------------------------------------//

// 20-item version of the IPIP Big Five Inventory
var ipip_mini = [
  {
    type: 'survey-template',
    items: ipip_items.slice(0,12),
    scale: ipip_scale,
    reverse: ipip_reverse.slice(0,12),
    instructions: "The following are some descriptions of people's behaviors. Please use the scale next to each phrase to<br>describe how accurately each statement describes you.",
    survey_width: 950,
    item_width: 41,
    scale_repeat: 4,
    randomize_question_order: false,
    data: {survey: 'ipip_mini', ipip_item_order: ipip_item_order.slice(0,12)}
  },
  {
    type: 'survey-template',
    items: ipip_items.slice(12,20),
    scale: ipip_scale,
    reverse: ipip_reverse.slice(12,20),
    instructions: "The following are some descriptions of people's behaviors. Please use the scale next to each phrase to<br>describe how accurately each statement describes you.",
    survey_width: 950,
    item_width: 41,
    scale_repeat: 4,
    randomize_question_order: false,
    data: {survey: 'ipip_mini', ipip_item_order: ipip_item_order.slice(12,20)}
  }
]
