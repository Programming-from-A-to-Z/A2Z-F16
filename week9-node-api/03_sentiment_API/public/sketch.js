// A2Z F15
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F15

function setup() {
  noCanvas();

  // This is all for submitting a new word

  // Word from user
  var wordinput = select('#word');
  // Score from user 
  var scoreinput = select('#score');
  var scoreit = select('#scoreit');
  scoreit.mousePressed(submitscore);

  // Submit the score to the API
  function submitscore() {
    // Make the url
    var url = '/add/' + wordinput.value() + '/' + scoreinput.value();
    // Use loadJSON
    loadJSON(url, submitted);
    function submitted(result) {
      // Just look at the reply in the console
      console.log(result);
    }
  }

  // Get the text to analyze
  var txt = select('#text');
  // Get the analyze button
  var analyzeit = select('#analyze');
  analyzeit.mousePressed(analyze);


  // Run the analysis
  function analyze() {
    var params = {
      text: txt.value()
    }
    // Have to use a POST here!
    httpPost('/analyze', params, success);
  }

  // A bunch of elements to show results
  var scoreresult = select('#scoreresult');
  var comparative = select('#comparative');
  var negative = select('#negative');
  var positive = select('#positive');

  // Look at the results
  function success(result) {
    // It comes in as text so have to turn it into an object
    result = JSON.parse(result);
    scoreresult.html('score: ' + result.score);
    comparative.html('comparative: ' + result.comparative);
    negative.html('negative words: ' + result.negative.join(', '));
    positive.html('positive words: ' + result.positive.join(', '));
    console.log(result);
  }

}