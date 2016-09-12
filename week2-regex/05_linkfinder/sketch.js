// A2Z F15
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F15



// Here is where we are working with a regex
function process(txt) {

  // A regex to match href='link'>name</a> capturing link and name
  // Make sure we have /g
  var regex = /href\s*=\s*['"](.*?)['"].*?>(.*?)<\/a>/gi;

  // Fill this array
  var links = [];
  
  // We have to use exec and loop because of the capturing group
  var match = regex.exec(txt);
  while (match != null) {
    // Making an object out of the two captured groups
    var link = {
      href: match[1],
      name: match[2]
    }
    links.push(link);
    match = regex.exec(txt);
  }

  var list = createElement('ol');
  for (var i = 0; i < links.length; i++) {
    var link = createElement('li','');
    var a = createA(links[i].href, links[i].name);
    a.parent(link);
    link.parent(list);
  }

  var par = createP('');
  par.class('text');
  par.child(list);
  paragraphs.push(par);
}


/***************************************************/
/* Everything below just handles the text input ****/
/***************************************************/


// Many DOM elements
var dropZone, input, button, sample, clearButton;

// Checkboxes and regex input
var regexInput, globalCheck, caseCheck;

// An array to keep track of all the new DOM elements being added
var paragraphs = [];

var inputText = '';

function setup() {

  noCanvas();

  // Selecting the text field and button
  input = select('#textinput');
  button = select('#submit');
  // What to do when button pressed
  button.mousePressed(handleInput);

  // Selected the div which will be the "drop zone"
  // for dragging and dropping files
  dropZone = select('#drop_zone');
  // Here are the events to handle
  dropZone.dragOver(highlight);
  dropZone.drop(gotFile, unHighlight);

  // This link allows quick testing with a file
  // that's ready to load instantly
  sample = select('#sample');
  sample.mousePressed(loadFile);

  // This button clears the new paragraph elements
  // added
  clearButton = select('#clear');
  clearButton.mousePressed(clearText);

  regexInput = select('#regex');
  globalCheck = select('#global');
  caseCheck = select('#case');
}

// Load a file for quick testing
function loadFile() {
  loadStrings('files/p5js.html', fileLoaded);
}
// When the file is loaded
function fileLoaded(data) {
  var txt = data.join('\n');

  input.html(txt);
  // Note the use of a function that will "process" the text
  // This is b/c the text might come in a number of different ways
  // process(txt);
}

// Handle dropzone events
function highlight() {
  dropZone.style('background', '#AAA');
}

function unHighlight() {
  dropZone.style('background','');
}

function gotFile(file) {
  if (file.type === 'text') {
    // process(file.data);
    inputText += file.data + '\n\n';
    input.html(inputText);
  } else {
    // In case it's some weird other kind of file
    alert('this is not a text file.');
  }
}

// Handle the text input field
function handleInput() {
  process(input.value());
}

// Clear all the divs with remove()
function clearText() {
  input.html('');
  intputText = '';
  for (var i = 0; i < paragraphs.length; i++) {
    paragraphs[i].remove();
  }
  paragraphs = [];
}
