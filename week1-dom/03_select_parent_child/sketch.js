// A2Z F16
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F16
// http://shiffman.net/a2z

function setup() {
  noCanvas();

  // Getting the element with the id banana with code
  var p1 = select('#banana');

  // Creating an element
  var img = createImg('https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Bananas_white_background_DS.jpg/320px-Bananas_white_background_DS.jpg');

  // Nesting the element inside the banana paragraph element
  img.parent(p1);

}
