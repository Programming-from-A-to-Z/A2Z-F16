// A2Z F16
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F16

// This function builds the JSON grammar

function buildGrammar(words) {

  // Hard-coded haiku
  grammar = {};

  grammar['<start>'] = [
    '<5-line> % <7-line> % <5-line>'
  ];
  grammar['<5-line>'] = [
    '<1> <4>',
    '<1> <3> <1>',
    '<1> <1> <3>',
    '<1> <2> <2>',
    '<1> <2> <1> <1>',
    '<1> <1> <2> <1>',
    '<1> <1> <1> <2>',
    '<1> <1> <1> <1> <1>',
    '<2> <3>',
    '<2> <2> <1>',
    '<2> <1> <2>',
    '<2> <1> <1> <1>',
    '<3> <2>',
    '<3> <1> <1>',
    '<4> <1>',
    '<5>'
  ];
  grammar['<7-line>'] = [
    '<1> <1> <5-line>',
    '<2> <5-line>',
    '<5-line> <1> <1>',
    '<5-line> <2>'
  ];


  // Make the terminal words assigned to their syllable count
  for (var i = 1; i < 6; i++) {
    var key = '<' + i + '>';
    grammar[key] = [];
  }

  // Go through all the words
  for (var i = 0; i < words.length; i++) {
    var word = words[i];
    // Use RiTa's Analyzer to determine syllable count
    var syllables = RiTa.getSyllables(word);
    // Syllables are separated with colons
    var count = syllables.split('/').length;
    if (count < 6) {
      // Add the word to the appropriate list
      // Assuming it has between 1 and 5 syllables
      var key = '<' + count + '>';
      grammar[key].push(word);
    }
  }

  // Now make the context free grammar object from the "grammar" JSON
  cfree = new ContextFree();

  // Look at the JSON object
  for (var rule in grammar) {
    // Get the expansions and split them
    var expansions = grammar[rule];
    for (var j = 0; j < expansions.length; j++) {
      // Now split up each expansion into its own array
      // Internally, the CF object is using arrays of arrays
      // It's awkward to look at it that in the JSON file so split by whitespace
      var tokens = expansions[j].split(/\s+/);
      // Add the rule
      cfree.addRule(rule, tokens);
    }
  }


  // Now that data is loaded show all the buttons
  var buttons = select('#grammar');
  buttons.show();
}


// Process the text
function process(txt) {
  clearText();

  // Count all the words
  var concordance = new Concordance();
  concordance.process(txt);

  // Get all the unique keys
  var keys = concordance.getKeys();

  // Make a grammar from these unique keys
  buildGrammar(keys);
}

// This function generates the haiku
function generateHaiku() {
  // Make a DIV with the new sentence
  var expansion = cfree.getExpansion('<start>');
  expansion = expansion.replace(/%/g, '<br/>');
  var par = createP(expansion);
  par.class('text');
}

// This function downloads the grammar as a JSON file
function downloadGrammar() {
  saveJSON(grammar, 'haiku_grammar.json');
}


/***************************************************/
/* Everything below just handles the text input ****/
/***************************************************/


// Many DOM elements
var dropZone, input, button, sample, clearButton;

// An array to keep track of all the new DOM elements being added
var paragraphs = [];

var inputText = '';

var grammar = {};
var cfree;


function setup() {

  noCanvas();

  // Selecting the text field and button
  input = select('#textinput');
  button = select('#submit');
  // What to do when button pressed
  button.mousePressed(handleInput);

  // Selected the div which will be the 'drop zone'
  // for dragging and dropping files
  dropZone = select('#drop_zone');
  // Here are the events to handle
  dropZone.dragOver(highlight);
  dropZone.drop(gotFile, unHighlight);

  // This link allows quick testing with a file
  // that's ready to load instantly
  sample = select('#sample');
  sample.mousePressed(loadFile);

  // Button to generate something from grammar
  var generate = select('#haiku');
  generate.mousePressed(generateHaiku);

  // Button to generate something from grammar
  var clear = select('#clearp');
  clear.mousePressed(clearIt);

  // Button to download the grammar as JSON
  var download = select('#download');
  download.mousePressed(downloadGrammar);

}

function clearIt() {
  var elts = selectAll('.text');
  for (var i = 0; i < elts.length; i++) {
    elts[i].remove();
  }
}

// Load a file for quick testing
function loadFile() {
  loadStrings('rainbow.txt', fileLoaded);
}
// When the file is loaded
function fileLoaded(data) {
  var txt = data.join('\n');

  input.html(txt);
  // Note the use of a function that will 'process' the text
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
  //input.html('');
  for (var i = 0; i < paragraphs.length; i++) {
    paragraphs[i].remove();
  }
  paragraphs = [];
}
