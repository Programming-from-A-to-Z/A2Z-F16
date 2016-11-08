// A2Z F16
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F16

// This code runs when the pop up opens

// Wordnik API
var wordnik1 = 'http://api.wordnik.com:80/v4/word.json/'
var wordnik2 = '/definitions?limit=1&includeRelated=true&useCanonical=false&includeTags=false';
var api_key  = '&api_key=48dd829661f515d5abc0d03197a00582e888cc7da2484d5c7';

function setup() {
  noCanvas();

  // This is a way of getting a global variable from the background script
  var word = chrome.extension.getBackgroundPage().word;

  // Query the wordnik API
  var url = wordnik1 + word + wordnik2 + api_key;
  loadJSON(url, gotData);

  // And update the DOM to show the definition
  function gotData(data) {
    var p = select('#definition');
    if (data[0]) {
      p.html(data[0].text);
    } else {
      p.html('Something went wrong.');
    }
  }

}
