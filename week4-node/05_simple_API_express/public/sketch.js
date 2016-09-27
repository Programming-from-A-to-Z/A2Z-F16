// A2Z F16
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F16

function setup() {
  noCanvas();
  loadJSON('/all', gotData);
}

function gotData(data) {
  for (var i = 0; i < data.alphabet.length; i++) {
    var c = data.alphabet.charAt(i);
    createDiv(c + " " + data.frequencies[c]);
  }
}
