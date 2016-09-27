// A2Z F16
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F16

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
}
