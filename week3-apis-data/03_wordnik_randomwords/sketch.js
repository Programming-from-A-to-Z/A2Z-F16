// A2Z F16
// Daniel Shiffman
// http://shiffman.net/a2z

// Thank you to: https://github.com/dariusk/metaphor-a-minute/blob/master/metaphor.js

// Sign up for Wordnik here: https://www.wordnik.com/
// Developer documentation: http://developer.wordnik.com/

// Call to get a random noun
var randomNounURL = "http://api.wordnik.com/v4/words.json/randomWord?" +
                    "&excludePartOfSpeech=proper-noun,proper-noun-plural,proper-noun-posessive,suffix,family-name,idiom,affix&" +
                    "&includePartOfSpeech=noun" +
                    "&minLength=5&maxLength=-1" +
                    "&api_key=48dd829661f515d5abc0d03197a00582e888cc7da2484d5c7";


// A random Adjective
var randomAdjURL  = "http://api.wordnik.com/v4/words.json/randomWord?" +
                    "&includePartOfSpeech=adjective" +
                    "&minLength=5&maxLength=-1" +
                    "&api_key=48dd829661f515d5abc0d03197a00582e888cc7da2484d5c7";


// A random word
var randomWordURL = "http://api.wordnik.com/v4/words.json/randomWord?" +
                    "&minLength=5&maxLength=-1" +
                    "&api_key=48dd829661f515d5abc0d03197a00582e888cc7da2484d5c7";

function setup() {
  noCanvas();
  // Some buttons
  var button1 = select('#word');
  button1.mousePressed(randomWord);

  var button2 = select('#adj');
  button2.mousePressed(randomAdj);

  var button3 = select('#noun');
  button3.mousePressed(randomNoun);
}

// Load the JSON for each one
function randomWord() {
  wordnik('words', randomWordURL);
}

function randomAdj() {
  wordnik('adjs', randomAdjURL);
}

function randomNoun() {
  wordnik('nouns', randomNounURL);
}

function wordnik(where, url) {
  loadJSON(url, wordLoaded);
  function wordLoaded(data) {
    var div = createDiv(data.word);
    div.parent(where);
  }
}
