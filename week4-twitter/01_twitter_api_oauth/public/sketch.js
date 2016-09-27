// A2Z F16
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F16

// A p5 sketch that searches twitter and tweets

// User input fields
var searchInput;
var postInput;

// How many characters in the tweet?
var numchars;

function setup() {
  noCanvas();

  // Get all the HTML elements
  searchInput = select('#searchInput');
  postInput = select('#postInput');
  var button1 = select('#searchButton');
  var button2 = select('#postButton');
  numchars = select('#numchars');

  // Assign the callbacks to the functions
  button1.mousePressed(getTweets);
  button2.mousePressed(postTweet);

  // Set the current tweet character count
  countChars();

  // Count characters for the tweet
  postInput.input(countChars);
}

// Update the div that says how many characters are in the tweet
function countChars() {
  numchars.html(postInput.value().length);
}

// Execute an API call, this is our own API!
function getTweets() {
  loadJSON(/tweets/ + searchInput.value(), gotTweets);
}

// We got the tweets
function gotTweets(tweets) {
  // Just stick them in the window
  for (var i = 0; i < tweets.length; i++) {
    var par = createP(tweets[i].text);
    par.class('text');
  }
}

// Execute an API call to tweet!
function postTweet() {
  // Note the use of encodeURIComponent()
  // We should probably be using this more often!
  loadJSON('/tweet?status=' + encodeURIComponent(postInput.value()), tweeted);
}

// We tweeted!
function tweeted(data) {
  // Debugging what happened
  console.log(data);

  // What came back?
  // Just show that in the window
  var msg;

  if (data.message) {
    msg = 'Error! ' + data.message;
  } else if (data.text) {
    msg = 'Success I tweeted: ' + data.text;
  } else {
    msg = 'Unknown error!';
  }
  var p = createP(msg);
  p.style('background','#F660AB')
  p.style('padding','16px');
}
