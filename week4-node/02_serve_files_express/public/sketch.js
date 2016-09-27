// Learning Processing
// Daniel Shiffman
// http://www.learningprocessing.com

// Example 9-11 ported to p5.js
// Resizing an array is JS is as easy as "push()"

var balls = []; // We start with an empty array
var gravity = 0.1;

function setup() {
  createCanvas(640,360);
  
  // Initialize ball index 0
  balls.push(new Ball(50,0,24));
}

function draw() {
  background(51);
  
  // Update and display all balls
  for (var i = 0; i < balls.length; i ++ ) { // Whatever the length of that array, update and display all of the objects.
    balls[i].gravity();
    balls[i].move();
    balls[i].display();
  }
}

function mousePressed() {
  // A new ball object
  var b = new Ball(mouseX,mouseY,24); // Make a new object at the mouse location.
  // Here, the function push() adds an element to the end of the array. 
  balls.push(b);
}
