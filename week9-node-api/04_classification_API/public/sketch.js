// A2Z F15
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F15


function setup() {
  noCanvas();

  // Training text and button
  var trainText = select('#textT');
  var trainButton = select('#submitT');
  // Training category and result
  var category = select('#category');

  // Handle button for training
  trainButton.mousePressed(train);
  function train() {
    var txt = trainText.value();
    var cat = category.value();
    var data = {
      text: txt,
      category: cat
    }
    // Post the text and category to the API
    httpPost('/train', data, success, error);
  }

  // For classifying a text
  var classifyText = select('#textC');
  var classifyButton = select('#submitC');
  // Get any results
  var classification = select('#classification');

  // Handle the button press
  classifyButton.mousePressed(classify);
  function classify() {
    var txt = classifyText.value();
    var data = {
      text: txt,
    }
    // Send the text to the API
    httpPost('/classify', data, classified, error);
  }

  // Here is where the results come back
  function classified(result) {
    // With a POST have to turn it back into valid JSON
    result = JSON.parse(result);

    // This could be vastly improved but throwing together some
    // html to put results on webpage
    var info = result.category + '<br/><br/>';
    for (var i = 0; i < result.classifications.length; i++) {
      var category = result.classifications[i];
      info += category.label + ', ' + category.value + '<br/>';
    }
    // Put it in the results DOM element
    classification.html(info);
  }
}


// Arbitrary success and error callbacks
function success(result) {
  console.log('success');
  console.log(JSON.parse(result));
}

function error(result) {
  console.log('error');
  console.log(JSON.parse(result));
}