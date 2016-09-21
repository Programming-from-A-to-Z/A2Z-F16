


// Count through loop closure
function countIt(value, when) {
  setTimeout(count, when);
  function count() {
    createP(value);
  }
}

// Automatic p5 way of doing it
// function highlight() {
//   this.style('background-color','#AAA');
// }

function highlighter(elt) {
  elt.mouseOver(highlight);
  function highlight() {
    elt.style('background-color','#AAA');
  }
}



function setup() {
  noCanvas();

  // Showing content-editable
  var p = createP("Look at this.");
  p.attribute('contenteditable', 'true');

  var p1 = createP("test1");
  var p2 = createP("test2");
  // Call a closure to bind each element to an event
  // We could pass other arguments in if necessary
  highlighter(p1);
  highlighter(p2);

  //p5 way of doing the above
  //p1.mouseOver(highlight);
  //p2.mouseOver(highlight);


  for (var i = 0; i < 10; i++) {
    countIt(i, i*500);
  }
}
