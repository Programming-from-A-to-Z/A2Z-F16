// A2Z F16
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F16



function setup() {
  noCanvas();
  // Set up a button
  var button = select('#button');
  button.mousePressed(generate);
}

function generate() {
  loadJSON('/generate', gotData);
  var output = select('#name');
  function gotData(data) {
    output.html(data.text);
  }
}
