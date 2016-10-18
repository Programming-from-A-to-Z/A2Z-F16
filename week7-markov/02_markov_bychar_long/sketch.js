// A2Z F16
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F16


// An array of lines from a text file
var lines;
// The Markov Generator object
var markov;
// An output element
var output;

// Preload some seed data
function preload() {
  lines = loadStrings('data/frankenstein.txt');
}

function setup() {
  // Join everything together in one long string
  // Keep carriage returns so these will show up in the markov generator
  var text = lines.join('\n');

  // N-gram length and maximum length
  markov = new MarkovGenerator(6, 10000);
  markov.feed(text);

  // Make the button
  var button = select('#button');
  button.mousePressed(generate);

  // Make the output element
  output = select('#output');

  noCanvas();
}

function generate() {
  // Generate some text
  var text = markov.generate();
  // Put in HTML line breaks wherever there was a carriage return
  text = text.replace(/\n/g,'<br/><br/>');
  output.html(text);
}
