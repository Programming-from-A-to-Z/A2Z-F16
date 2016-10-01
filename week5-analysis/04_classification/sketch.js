// A2Z F16
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F16

var classifier;

var trainedA = false;
var trainedB = false;

var aCount = 0;
var bCount = 0;

function setup() {

  // No canvas
  // Though doing something visual with this is a great idea for an assignment
  noCanvas();

  // For file input
  setupInputs();

  classifier = new Classifier();

  var loadButton = select('#sample_files');
  loadButton.mousePressed(loadSamples);

  var guessButton = select('#sample_guess');
  guessButton.mousePressed(loadGuess);

  // Just loading from a file for simplicity
  // var stuff = loadStrings('data/test.txt', process);
}


function loadSamples() {
  for (var i = 0; i < 10; i++) {
    loadStrings('files/ham/ham'+i+'.txt', trainA);
    loadStrings('files/spam/spam'+i+'.txt', trainB);
  }
}

function loadGuess() {
  doGuess('files/ham/ham10.txt');
  doGuess('files/spam/spam10.txt');
}

function doGuess(filename) {

  loadStrings(filename, guess);

  function guess(data) {
    classifier.probabilities();
    results = classifier.guess(data.join('\n'));
    showResults(filename, results);
  }
}





function showResults(filename, results) {

  var which = 'A';
  var prob = 100 * results.pA;


  if (prob < 50) {
    prob = 100 - prob;
    which = 'B';
  }

  var div = createDiv('');
  div.class('text');

  var h3 = createElement('h3', 'Results for: ' + filename);
  h3.parent(div);

  var summary = createP('This document has a ' + prob.toPrecision(4) + '% chance of being in category ' + which);
  summary.parent(div);

  var info = createP('Sampling of words (w/ category ' + which + ' prob)');
  info.parent(div);

  var ol = createElement('ol');
  ol.parent(div);

  var howmany = min(20, results.words.length);

  for (var i = 0; i < howmany; i++) {
    var prob;
    if (which === 'A') {
      prob = 100 * results.words[i].probA;
    } else {
      prob = 100 * results.words[i].probB;
    }
    var li = createElement('li', results.words[i].word + ': ' + prob.toPrecision(2) + '%');
    li.parent(ol);
  }
}

function trainA(input) {
  if (input instanceof p5.File && input.type === 'text') {
    classifier.train(input.data, 'A');
  } else if (input instanceof Array) {
    var txt = input.join('\n');
    classifier.train(txt, 'A');
  } else {
    // In case it's some weird other kind of file
    alert('Something went wrong.');
  }
}

function trainB(input) {
  if (input instanceof p5.File && input.type === 'text') {
    classifier.train(input.data, 'B');
  } else if (input instanceof Array) {
    var txt = input.join('\n');
    classifier.train(txt, 'B');
  } else {
    // In case it's some weird other kind of file
    alert('Something went wrong.');
  }
}

function guess(file) {
  classifier.probabilities();
  var results = classifier.guess(file.data);
  showResults(file.name, results);
}


function setupInputs() {

  var dropA = select('#dropA');
  var dropB = select('#dropB');
  var guessZone = select('#guess');

  // Here are the events to handle
  dropA.dragOver(highlight);
  dropA.dragLeave(unHighlight);
  dropA.drop(trainA, unHighlight);

  dropB.dragOver(highlight);
  dropB.dragLeave(unHighlight);
  dropB.drop(trainB, unHighlight);

  // Here are the events to handle
  guessZone.dragOver(highlight);
  guessZone.dragLeave(unHighlight);
  guessZone.drop(guess, unHighlight);
}

// Handle dropzone events
function highlight() {
  this.style('background', '#AAA');
}

function unHighlight() {
  console.log('done');
  this.style('background','');
}
