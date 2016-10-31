// A2Z F15
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F15

function setup() {
  noCanvas();
  // No concordance is performed here
  // Just all the data is loaded from the server
  loadJSON('/all', gotData);
}


function gotData(data) {
  // Get all the keys
  var words = data.keys;

  // Make a div for every word
  for (var i = 0; i < words.length; i++) {
    var word = words[i];
    var count = data.dict[word];
    divMaker(word, count, i);  
  }
}

// Div-making closure, need this to use setTimeout
function divMaker(word, count, index) {
  setTimeout(makeDiv, index*10);

  function makeDiv() {
    var span = createSpan(word + ": " + count + " ");
    span.class('count');
    span.parent('results');
  }
}
