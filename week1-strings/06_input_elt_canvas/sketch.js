// A2Z F16
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F16
// http://shiffman.net/a2z

// Adapted from: http://p5js.org/examples/examples/Dom_Input_and_Button.php

var input, button, greeting;

function setup() {

  // create canvas
  createCanvas(710, 400);
  background(51);

  // Create interface
  greeting = createElement('h2', 'what is your name?');
  input = createInput();
  button = createButton('submit');
  button.mousePressed(greet);
}

// When the user clicks the mouse, the canvas is redrawn
// Could you do this sketch a different way with draw()
// and have the elements animate?
function greet() {
  background(51);
  var name = input.value();
  greeting.html('hello '+name+'!');
  input.value('');

  for (var i=0; i < 200; i++) {
    push();
    fill(random(255), 255, 255);
    translate(random(width), random(height));
    rotate(random(2*PI));
    textAlign(CENTER)
    textSize(50);
    text(name, 0, 0);
    pop();
  }
}
