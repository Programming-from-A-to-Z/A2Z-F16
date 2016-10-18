// A2Z F16
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F16

// An array of lines from a text file
var lines;

// The Markov Generator object
var markov;

// Preload the seed data
function preload() {
  lines = loadStrings('itp.txt');
}

function setup() {
  noCanvas();
  // The Markov Generator
  // First argument is N-gram length, second argument is max length of generated text
  markov = new MarkovGenerator(3, 100);
  // Feed all the lines from the text file into the generator
  for (var i = 0; i < lines.length; i++) {
    markov.feed(lines[i]);
  }
  // Set up a button
  var button = select('#button');
  button.mousePressed(generate);
}

function generate() {
  // Display the generated text
  var output = select('#name');
  var text = markov.generate();
  output.html(text);
}
