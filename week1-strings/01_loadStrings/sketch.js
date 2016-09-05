// A2Z F16
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F16
// http://shiffman.net/a2z

// Variable for array of lines
var lines;
// Variable where we'll join all the text together
var txt;

// Anything in preload will finish before setup() is triggered
function preload() {
  lines = loadStrings('files/spam.txt');
}

// Now we can do stuff with the text
function setup() {
  noCanvas();
  // join() joins the elements of an array
  // Here we pass in a line break to retain formatting
  txt = join(lines, '<br/>');
  var par = createP(txt);
  par.id('text');
}
