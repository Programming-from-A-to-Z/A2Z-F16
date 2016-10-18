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

// Slider to weight the data fed
var slider;

// Preload some seed data
function preload() {
  linesA = loadStrings('data/natureofcode.txt');
  linesB = loadStrings('data/shakes_short.txt');
}

function setup() {


  // Make the button
  var button = select('#button');
  button.mousePressed(generate);

  // Make the output element
  output = select('#output');

  // Make the slider
  slider = select('#slider');
  // We could regenerate as the user moves the slider!
  // but unless it's very little data, we'd have to do it
  // a different way
  // slider.input(tooSlow);

  noCanvas();
}

// function tooSlow() {
//   generate();
// }

function generate() {
  // Make the markov generator each time we generate text!
  markov = new MarkovGenerator(5, 2000);

  // How many times should we repeat input B
  var repeat = floor(slider.value() / 10);

  // Repeat A the inverse of B
  var totalA = 10 - repeat;
  var totalB = repeat;


  // Feed input A totalA times to the generator
  for (var n = 0; n < totalA; n++) {
    for (var i = 0; i < linesA.length; i++) {
      markov.feed(linesA[i]);
    }
  }

  // Feed input B totalB times to the generator
  for (var n = 0; n < totalB; n++) {
    for (var i = 0; i < linesB.length; i++) {
      markov.feed(linesB[i]);
    }
  }

  // Generate some text and show it
  var generated = markov.generate();
  output.html(generated);

}
