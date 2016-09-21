// A2Z F16
// Daniel Shiffman
// http://shiffman.net/a2z

function setup() {
  noCanvas();

  // Now make 500 of animating elements
  // Every 10 milliseconds
  for (var i = 0; i < 500; i++) {
    setTimeout(makeElement, i*10);
  }
}

// A functon for making the element
function makeElement() {

  // Make the element and animate it!
  var span = createSpan('0');
  animate(span);

  // This is silly but putting a space between them for spacing
  var space = createSpan(' ');
  // Just some styling
  space.parent('padded');
  span.class('box');
  span.parent('padded');
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
