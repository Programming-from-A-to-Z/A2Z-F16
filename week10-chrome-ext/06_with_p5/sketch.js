// A2Z F16
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F16

// This is the content script for the extension

// It creates a canvas overlay on a web page

// p5 can not be executed the normal "global" way
// Instead a sketch instance has to be manually created
// This is done with the closure below
var sketch = function(p5) {

  // The setup function
  p5.setup = function() {
    console.log('p5 running');
    // Make a canvas that covers the HTML document up to 2000 pixels high
    var h = p5.constrain(document.body.clientHeight, 0, 2000);
    var c = p5.createCanvas(p5.windowWidth, h);
    // Position it
    c.position(0,0);
    p5.clear();
  }

  // Draw lines if the user drags the mouse
  p5.mouseDragged = function() {
    p5.stroke(0);
    p5.strokeWeight(4);
    p5.line(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY);
  }

}

// The above function closure is passed into a p5 object constructor
// this starts the sketch.
var myp5 = new p5(sketch);
