// A2Z F16
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F16

// Sign up for Wordnik here: https://www.wordnik.com/
// Developer documentation: http://developer.wordnik.com/

// Main API URL
var wordnik = 'http://api.wordnik.com/v4/word.json/';
// Looking up word frequency vetween 1800 and 2015
var command = '/frequency?startYear=1800&endYear=2015'
// API Key
var api_key = '&api_key=48dd829661f515d5abc0d03197a00582e888cc7da2484d5c7'

// Getting words from Pride and Prejudice
var lines;
function preload() {
  lines = loadStrings('prideprejudice.txt');
}

function setup() {
  noCanvas();

  // Put everything into a concordance
  var txt = lines.join('\n');
  var counts = new Concordance();
  counts.process(txt);

  var keys = counts.getKeys();
  // Look at every single word
  for (var i = 0; i < keys.length; i++) {
    // Make the URL to query wordnik
    var url = wordnik + keys[i] + command + api_key;
    // Use a closure function to trigger the API calls with a delay
    delayQuery(url, i);
    // This below would break things!
    // loadJSON(url, gotData);
  }
}

// Here is the closure
// Get a url and count
function delayQuery(url, count) {
  // Wait 10 seconds between each query
  setTimeout(runQuery, count * 10);
  // We've got access the the URL here!
  function runQuery() {
    loadJSON(url, gotData);
  }
}

// Make a div with the data tha came back from the API
function gotData(data) {
  var span = createSpan(data.word + ':' + data.totalCount + ' ');
  span.class('count');
  span.parent('results');
}
