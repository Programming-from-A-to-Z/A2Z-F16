// A2Z F16
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F16

var tfidf;

var files = [];

// And process the data for a file
function process(text) {
  tfidf = new TFIDF();

  // Process this data into the tfidf object
  tfidf.termFreq(text);

  // Now we need to read all the rest of the files
  // for document occurences
  for (var i = 0; i < files.length; i++) {
    tfidf.docFreq(files[i].data);
  }
  tfidf.finish(files.length);
  tfidf.sortByScore();
  showTFIDF();
}

// Make a bunch of divs to show results
function showTFIDF() {
  // If this gets called multiple times we're removing all the divs that show counts
  // before making new ones
  clearList();

  var p = createP('');
  p.id('results');

  var ol = createElement('ol');
  ol.parent(p);

  // Get all the words
  var keys = tfidf.getKeys();

  var howmany = min(10, keys.length);

  // Get the count for each word and display
  for (var i = 0; i < howmany; i++) {
    var score = tfidf.getScore(keys[i]);
    var li = createElement('li', keys[i] + ': '+ score.toPrecision(2));
    li.parent(ol);
  }

}

// Go through and remove all the divs
function clearList() {
  var p = select('#results');
  p.remove();
}

/***************************************************/
/* Everything below just handles the text input ****/
/***************************************************/


// Many DOM elements
var dropZone, input, button, sample, clearButton;

// An array to keep track of all the new DOM elements being added
var paragraphs = [];

var inputText = '';

function setup() {

  noCanvas();

  // Selected the div which will be the "drop zone"
  // for dragging and dropping files
  dropZone = select('#drop_zone');
  // Here are the events to handle
  dropZone.dragOver(highlight);
  dropZone.drop(gotFile, unHighlight);

  // This link allows quick testing with a file
  // that's ready to load instantly
  sample = select('#sample');
  sample.mousePressed(loadSamples);
}

// Load a file for quick testing
function loadSamples() {
  var filenames = ['rainbow.txt', 'fish.txt', 'phadke.txt',
  'eclipse.txt', 'sports.txt', 'test.txt', 'tree.txt'];

  for (var i = 0; i < filenames.length; i++) {
    handleSample(filenames[i]);
  }
}

function handleSample(filename) {
  loadStrings('files/' + filename, loaded);
  function loaded(data) {
    var txt = data.join('\n');
    var file = {
      name: filename,
      data: txt
    };
    gotFile(file);
  }
}


// Handle dropzone events
function highlight() {
  dropZone.style('background', '#AAA');
}

function unHighlight() {
  dropZone.style('background','');
}


function gotFile(file) {
  files.push(file);
  var li = createElement('li');
  li.parent('list');
  var link = createA('#',file.name);
  link.parent(li);
  link.mousePressed(readFile);
  function readFile() {
    console.log(file.name);
    process(file.data);
  }

}

// Handle the text input field
function handleInput() {
  process(input.value());
}

// Clear all the divs with remove()
function clearText() {
  //input.html('');
  for (var i = 0; i < paragraphs.length; i++) {
    paragraphs[i].remove();
  }
  paragraphs = [];
}
