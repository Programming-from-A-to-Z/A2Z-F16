// A2Z F16
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F16

function setup() {
  noCanvas();
  loadJSON('/all', gotData);
}


function gotData(data) {
  var words = data.keys;

  for (var i = 0; i < words.length; i++) {
    var word = words[i];
    var count = data.dict[word];
    divMaker(word, count, i);
  }
}

function divMaker(word, count, index) {
  setTimeout(makeDiv, index*10);
  function makeDiv() {
    var span = createSpan(word + ": " + count + " ");
    span.class('count');
    span.parent('results');
  }
}
