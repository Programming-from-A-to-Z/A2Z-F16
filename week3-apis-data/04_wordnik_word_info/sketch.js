// A2Z F16
// Daniel Shiffman
// http://shiffman.net/a2z

// Sign up for Wordnik here: https://www.wordnik.com/
// Developer documentation: http://developer.wordnik.com/

// Main API URL
var wordnik = 'https://api.wordnik.com/v4/word.json/';
// API Key
var api_key = '/?api_key=48dd829661f515d5abc0d03197a00582e888cc7da2484d5c7'

// Get user input
var input;

var exampleButton;
var definitionButton;
var audioButton;

function setup() {
  noCanvas();

  // Get the input from user
  input = select('#word');

  exampleButton = select('#examples');
  definitionButton = select('#definitions');
  audioButton = select('#audio');

  exampleButton.mousePressed(listExamples);
  definitionButton.mousePressed(listDefinitions);
  audioButton.mousePressed(listAudio);

}


function listExamples() {
  var url = wordnik + input.value() + '/examples' + api_key;
  loadJSON(url, gotExamples);
}

function listDefinitions() {
  var url = wordnik + input.value() + '/definitions' + api_key;
  loadJSON(url, gotDefinitions);
}

function listAudio() {
  var url = wordnik + input.value() + '/audio' + api_key;
  loadJSON(url, gotAudio);
}

// This is a function to handle when the data has come back
function gotExamples(data) {
  console.log(data);
  show(data.examples);
}

// This is a function to handle when the data has come back
function gotDefinitions(data) {
  console.log(data);
  show(data);
}

function show(list) {
  // Render everything as an "ordered list"
  var ol = createElement('ol');
  for (var i = 0; i < list.length; i++) {
    // Get example text
    var li = createElement('li', list[i].text);
    li.parent(ol);
  }
}

// This is a function to handle when the data has come back
function gotAudio(data) {
  console.log(data);
  var ol = createElement('ol');
  for (var i = 0; i < data.length; i++) {
    // Make a link that plays the sound
    var a = createA('#', 'play');
    // Attach a sound to the link
    setSound(a, data[i].fileUrl);
    var li = createElement('li', data[i].audioType + ': ');
    a.parent(li);
    li.parent(ol);
  }
}


// Closure to attach a sond to a link press
function setSound(a, url) {
  a.mousePressed(playSound);
  function playSound() {
    var audio = createAudio(url);
    audio.play();
  }
}
