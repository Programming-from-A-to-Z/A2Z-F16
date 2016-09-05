// A2Z F16
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F16
// http://shiffman.net/a2z

// Adapted from: http://p5js.org/examples/examples/Dom_Input_and_Button.php

var input, button, greeting;

function setup() {

  noCanvas();

  // Unlike example 05_input_elt
  // These elements are found in index.html
  // And I'm just accessing them with select() in p5.js
  greeting = select('#greeting');
  input = select('#textinput');
  button = select('#submit');

  // Here a button triggers the "hello message"
  button.mousePressed(greet);

  // p5 has a function for when the user hits enter
  // Since we are using the button, it's not necessary here
  // though we could have both?
  // input.changed(greet);

  // You can also dig into native events for every character typed
  input.input(greetTyping);

}

function greetTyping() {
  // value() is the function to get the contents of the text input
  greeting.html(input.value());
}

function greet() {
  var name = input.value();
  var par = createP('hello '+ name + '!');
}
