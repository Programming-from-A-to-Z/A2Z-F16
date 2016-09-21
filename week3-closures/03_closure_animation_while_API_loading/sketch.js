// A2Z F16
// Daniel Shiffman
// http://shiffman.net/a2z


// Main API URL
var wordnik = 'http://api.wordnik.com/v4/word.json/';
// API Key
var api_key = '/?api_key=48dd829661f515d5abc0d03197a00582e888cc7da2484d5c7'

// Each one of these words will be assigned to a DOM element
var words = ['rainbow', 'heart', 'sparkle', 'canteen', 'ridiculous'];

function setup() {
  noCanvas();

  // Make links to each one of these words
  for (var i = 0; i < words.length; i++) {
    var a = createA('#', words[i]);
    a.class('box');

    // Pair the DOM element with the word
    // and set-up the events in a closure
    assignQuery(a, words[i]);

    // Just putting a space
    createSpan(' ');
  }
}

// Pair the DOM element with the word
// and set-up the events in a closure
function assignQuery(elt, word) {

  // Query the API when the mouse is clicked
  elt.mousePressed(queryWordnik);

  // A reference to the interval for animation
  var interval;

  // This happens later, when the user clicks the mouse
  // So all of the variables within scope are maintained for
  // when it is called.  Closure magic!
  function queryWordnik() {
    // Start animating
    interval = animate(elt);
    // Query the API
    loadJSON(wordnik + word + '/relatedWords' + api_key, gotData);
  }

  // Look, another closure function!
  // This one happens when the data comes back from the API
  function gotData(data) {
    // Pick a random related word
    var r1 = floor(random(data.length));
    var r2 = floor(random(data[r1].words.length));
    // Updat the content
    elt.html(data[r1].words[r2]);
    // Stop the animation
    clearInterval(interval);
  }
}


// A closure for animating
function animate(elt) {
  // count and elt are local to this function but live on since
  // increment continues to be called via setInterval
  var count = 0;

  // Just update the contents of the DOM element
  function increment() {
    count = (count + 1) % 100;
    elt.html(count);
  }

  // Execute increment every 25 milliseconds
  // Also return the interval for later use!
  return setInterval(increment, 25);
}
