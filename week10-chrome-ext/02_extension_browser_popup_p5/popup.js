// A2Z F16
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F16

// This popup is just a p5 sketch!

var x = 0;

function setup() {
  createCanvas(100, 100);
}

function draw() {
  background(51);
  x = x + 5;
  if (x > width) {
    x = 0;
  }
  stroke(255);
  line(x, 0, x, height);
}
