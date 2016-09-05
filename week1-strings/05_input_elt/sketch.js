// A2Z F16
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F16
// http://shiffman.net/a2z

// Adapted from: http://p5js.org/examples/examples/Dom_Input_and_Button.php

var input, button, greeting;

function setup() {

  noCanvas();

  // Make an h2 element
  greeting = createElement('h2', 'What is your name?');
  // Make a text input field
  input = createInput();
  // Make a submit button
  button = createButton('submit');

  // Here a button triggers the "hello message"
  button.mousePressed(greet);

  // p5 has a function for when the user hits enter
  // Since we are using the button, it's not necessary here
  // though we could have both?
  input.changed(greet);

  // The input event is fired with each keyPress
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
