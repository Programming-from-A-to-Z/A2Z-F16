// A2Z F16
// Daniel Shiffman
// http://shiffman.net/a2z

function setup() {
  noCanvas();

  // Select and animate three DOM elements
  var one = select('#apple');
  animate(one);

  var two = select('#pear');
  animate(two);

  // This one only starts animating when you click on it!
  var click = select('#click');
  click.mousePressed(start);
}

// Call back for clicking
function start() {
  var three = select('#orange');
  animate(three);
}


// A closure for animating
function animate(elt) {
  // count and elt are local to this function but live on since
  // increment continues to be called via setInterval
  var count = 0;

  // Just update the contents of the DOM element
  function increment() {
    count = (count + 1) % 100;
    elt.html(count);
  }

  // Exercuse increment every 100 milliseconds
  setInterval(increment, 100);
}
