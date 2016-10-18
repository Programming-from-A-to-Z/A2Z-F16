// A2Z F16
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F16

function setup() {

  // Make a tiny canvas for loading animation
  var canvas = createCanvas(50, 50);
  canvas.parent('canvas');

  // Make 5,000 DOM elements one a time
  // Using a function that triggers the action with a delay
  for (var i = 0; i < 5000; i++) {
    makeIt(i);
  }

  function makeIt(count) {
    // Do this every 5 milliseconds
    setTimeout(reallyMakeIt, count * 5);

    // This "closure" gives us access to the value of count
    // which was filled from i in the original loop
    function reallyMakeIt() {
      var span = createSpan(count + ' ');
      span.parent('stuff');
    }
  }
}


var angle = 0;
// Just a silly loading animation
function draw() {
  background(200);
  translate(width / 2, height / 2);
  rotate(angle);
  fill(200);
  ellipse(0, 0, width, height);
  strokeWeight(4);
  line(-width / 2, 0, width / 2, 0);
  stroke(0);
  line(0, -height / 2, 0, height / 2);
  angle += 0.1;
}
