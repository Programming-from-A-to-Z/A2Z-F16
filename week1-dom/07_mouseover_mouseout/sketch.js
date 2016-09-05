// A2Z F16
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F16
// http://shiffman.net/a2z

var link;

function setup() {
  noCanvas();
  link = createA("#","click me");
  link.style('padding', '12px');
  link.style('border-style', 'solid');

  link.mouseOver(mOver);
  link.mouseOut(mOut);
  link.mousePressed(changeBG);
}

function mOver() {
  var heading = select('#heading');
  heading.html('mouse over!');
}

function mOut() {
  var heading = select('#heading');
  heading.html('mouse out!');
}

function changeBG() {
  var heading = select('#heading');
  var r = floor(random(255));
  var b = floor(random(255));
  var col = 'rgb(' + r + ',0,' + b + ')';
  heading.style('background-color', col);
}
