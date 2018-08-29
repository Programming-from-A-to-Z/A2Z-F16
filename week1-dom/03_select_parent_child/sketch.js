// A2Z F16
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F16
// http://shiffman.net/a2z

var paragraphs;

function setup() {
  noCanvas();

  // Getting the element with the id banana with code
  //see https://youtu.be/sSQPLIHIzmg?t=2m10s for a discussion of this
  //using #unicorn as the select
  //by creating the object (dom element) in js you have access to the object in js
  // good reference 
  // discussion of select https://youtu.be/sSQPLIHIzmg?t=12m10s
  var p1 = select('#banana');

  // Creating an element
  //this will get called in the html
  //reference https://p5js.org/reference/#/p5/createImage
  var img = createImg('https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Bananas_white_background_DS.jpg/320px-Bananas_white_background_DS.jpg');

  // Nesting the element inside the banana paragraph element
  img.parent(p1);
  
  //you can change the font size of all the paragraphs
  //with apple class here
  paragraphs = selectAll(".apple")
  for (var i = 0; i < paragraphs.length; i++) {
    paragraphs[i].style('font-size', '12pt');
}
//you can change the font size of all the paragraphs
  //with pear class here
  paragraphs = selectAll(".pear")
  for (var i = 0; i < paragraphs.length; i++) {
    paragraphs[i].style('font-size', '16pt');
}
}
