// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// An L-System object
var lsys;
// A Turtle object
var turtle;
// How many times has recursion happened
var generations = 0;


function setup() {

  // Create the canvas and use parent to place on the HTML page
  var canvas = createCanvas(400, 400);
  canvas.parent('canvas');

  var ruleset = [];

  // Some other rules to try
  // // Fill with two rules (These are rules for the Sierpinksi Gasket Triangle)
  // ruleset[0] = new Rule('F',"F--F--F--G");
  // ruleset[1] = new Rule('G',"GG");
  // // Create LSystem with axiom and ruleset
  // lsys = new LSystem("F--F--F",ruleset);
  // turtle = new Turtle(lsys.getSentence(),width*2,TWO_PI/3);

  // //ruleset[0] = new Rule('F',"F[F]-F+F[--F]+F-F");
  // ruleset[0] = new Rule['F',"FF+[+F-F-F]-[-F+F+F]");
  // lsys = new LSystem("F-F-F-F",ruleset);
  // turtle = new Turtle(lsys.getSentence(),width-1,PI/2);

  ruleset[0] = new Rule('F', "FF+[+F-F-F]-[-F+F+F]");
  lsys = new LSystem("F", ruleset);
  turtle = new Turtle(lsys.getSentence(), height/3, radians(25));

  // Place the current sentence on the page
  var sentence = select('#sentence');
  sentence.style('width', windowWidth-width-100 +'px');
  sentence.html(lsys.getSentence());

  // Deal with generate button
  var button = select('#generate');
  button.mousePressed(generate);

  // No draw loop
  noLoop();
}

// Get the turtle drawing!
function draw() {
  background(51);
  fill(0);
  //text("Click mouse to generate", 10, height-10);

  translate(width/2, height);
  rotate(-PI/2);
  turtle.render();
}

// Every time the mouse is pressed generate and redraw
function generate() {
  // Stop after a certain point
  if (generations < 5) {

    // Generate and draw!
    lsys.generate();
    turtle.setToDo(lsys.getSentence());
    turtle.changeLen(0.5);
    redraw();

    // Update the DOM element
    var sentence = select('#sentence');
    sentence.html(lsys.getSentence());

    generations++;
  }
}

function windowResized() {
  var sentence = select('#sentence');
  sentence.style('width', windowWidth-width-100 +'px');
}
