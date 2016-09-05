// A2Z F16
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F16
// http://shiffman.net/a2z

var dropZone;

function setup() {

  noCanvas();

  // Make a div to drag a file on, equivalent of
  // <div id="drop_zone">Drop files here</div>
  dropZone = createDiv('Drop files here');
  dropZone.id('drop_zone');

  // When the user drags a file over the div
  dropZone.dragOver(highlight);

  // Not using this event in this example
  // dropZone.dragLeave(someHandler);

  // When the file is "dropped" we need two callbacks
  // One to handle the dropping event
  // One to handle the files when they are ready
  dropZone.drop(gotFile, unHighlight);

}

// highlight and unhighlight the div
function highlight() {
  dropZone.style('background', '#AAA');
}

function unHighlight() {
  dropZone.style('background','');
}

// file is a p5.File object that has metadata, and the file's contents
function gotFile(file) {
  // Make a div to display info about the file
  var fileDiv = createDiv(file.name + ' ' + file.type + ' ' + file.subtype + ' ' + file.size + ' bytes');
  // Assign a CSS class for styling (see index.html)
  fileDiv.class('file');

  // Hanlde image and text differently
  if (file.type === 'image') {
    var img = createImg(file.data);
    img.class('thumb');
  } else if (file.type === 'text') {
    // Make a paragraph of text
    var par = createP(file.data);
    par.class('text');
  }
}
