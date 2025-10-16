// Pass message from jsPsych to NivTurk
function pass_message(experiment, msg) {

  $.ajax({
    url: "/experiment?experiment=" + experiment,
    method: 'POST',
    data: JSON.stringify(msg),
    contentType: "application/json; charset=utf-8",
  }).done(function(data, textStatus, jqXHR) {
    // do nothing on success
  }).fail(function(error) {
    console.log(error);
  });

}

// // Successful completion of experiment: redirect to experiment page.
// function on_success(experiment) {
//   $.ajax({
//     url: "/on_success?experiment=" + experiment,
//     method: 'POST',
//     data: JSON.stringify(jsPsych.data.get().json()),
//     contentType: "application/json; charset=utf-8",
//   }).done(function(data, textStatus, jqXHR) {
//     console.log("AJAX success, redirecting to /main");
//     window.location.replace('/main'); // back to home
//   }).fail(function(error) {
//     console.log(error);
//   });

// }

function on_success(experiment) {
  console.log("on_success function called with experiment:", experiment);
  const payload = {
    experiment: experiment,
    data: jsPsych.data.get().json()
  };

  $.ajax({
    url: "/on_success",
    method: 'POST',
    data: JSON.stringify(payload),
    contentType: "application/json; charset=utf-8",
  }).done(function(data, textStatus, jqXHR) {
    console.log("AJAX success, redirecting to /main");
    window.location.replace('/main');
  }).fail(function(error) {
    console.log("AJAX request failed:", error);
  });
}


 
// Successful completion of all experiments.
function redirect_success() {
  window.location.replace('/redirect_success');
}

// Unsuccessful completion of experiment: redirect with decoy code.
function redirect_reject(error) {

  // Concatenate metadata into complete URL (returned on reject).
  var url = "/error/" + error;

  $.ajax({
    url: "/redirect_reject",
    method: 'POST',
    data: JSON.stringify(jsPsych.data.get().json()),
    contentType: "application/json; charset=utf-8",
  }).done(function(data, textStatus, jqXHR) {
    window.location.replace(url);
  }).fail(function(error) {
    console.log(error);
  });
}

// Unsuccessful completion of experiment: redirect to error page.
function redirect_error(error) {

  // error is the error number to redirect to.
  var url = "/error/" + error;

  $.ajax({
    url: "/redirect_error",
    method: 'POST',
    data: JSON.stringify(jsPsych.data.get().json()),
    contentType: "application/json; charset=utf-8",
  }).done(function(data, textStatus, jqXHR) {
    window.location.replace(url);
  }).fail(function(error) {
    console.log(error);
  });
}

// Save data at regular intervals during experiment without redirecting to another page
//Adapted from functions above and https://towardsdatascience.com/using-python-flask-and-ajax-to-pass-information-between-the-client-and-server-90670c64d688
function interval_save(task){
  $.ajax({
    url: "/experiments/" + task,
    method: 'POST',
    data: JSON.stringify(jsPsych.data.get().json()),
    contentType: "application/json; charset=utf-8",
  }).done(function(data, textStatus, jqXHR) {
    console.log("interval_save done");
  }).fail(function() {
    console.log("interval_save error");
  });
}
