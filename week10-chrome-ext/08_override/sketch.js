// A2Z F16
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F16

// This just picks a random word from wordnik
// And shows it to the user each time a new tab is opened

// A random word
var randomWordURL = "http://api.wordnik.com/v4/words.json/randomWord?" +
                    "&minLength=5&maxLength=-1" +
                    "&api_key=48dd829661f515d5abc0d03197a00582e888cc7da2484d5c7";

function setup() {
  noCanvas();
  wordnik('word', randomWordURL);
}


function wordnik(where, url) {
  loadJSON(url, wordLoaded);
  function wordLoaded(data) {
    var div = createDiv(data.word);
    div.parent(where);
  }
}
