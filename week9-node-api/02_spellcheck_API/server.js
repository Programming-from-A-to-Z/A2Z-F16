// A2Z F16
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F16

// http://norvig.com/spell-correct.html
// https://github.com/dwyl/english-words

// Using express: http://expressjs.com/
var express = require('express');
// Create the app
var app = express();

// Node natural for NLP
var natural = require('natural');
var Spellcheck = natural.Spellcheck;

// File System for loading the list of words
var fs = require('fs');

// Cors for allowing "cross origin resources"
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
var cors = require('cors');

// Load all the words
var words = fs.readFileSync('data/words.txt', 'utf8');
// Make it an array by line breaks
var corpus = words.split(/\n/);
// Create a spellchecker with those words
var spellcheck = new Spellcheck(corpus);
// Set up the server
// process.env.PORT is related to deploying on heroku
var server = app.listen(process.env.PORT || 3000, listen);

// This call back just tells us that the server has started
function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Spellcheck API listening at http://' + host + ':' + port);
}

// This is for hosting files
// Anything in the public directory will be served
// This is just like python -m SimpleHTTPServer
// We could also add routes, but aren't doing so here
app.use(express.static('public'));
app.use(cors());

// Here's how we can write code to handle a specific 'route'
// http://myserver.com/spellcheck/werd/1
app.get('/spellcheck/:word/:maxdistance', spellCheck);
app.get('/spellcheck/:word', spellCheck);

// This is the call back for what to do
// We can get stuff from url path
// http://myserver.com/spellcheck/word/
function spellCheck(req, res) {
  // Query String
  var word = req.params['word'];
  // Maxdistance is "optional"
  var maxdistance = req.params['maxdistance'] || 1;

  // The spellchecker seems to hang over 2
  // Probably b/c the wordlist at 350,000 words in it
  if (maxdistance > 2) {
    maxdistance = 2;
  }

  // Is it correct?
  var correct = spellcheck.isCorrect(word);
  // If so, just send back "correct" and the original word
  if (correct) {
    var reply = {
      status: 'correct',
      word: word
    }
    res.send(reply);
  // Otherwise
  } else {
    // Get the corrections
    var corrections = spellcheck.getCorrections(word, maxdistance);
    // Send back the suggestions
    var reply = {
      status: 'incorrect',
      maxdistance: maxdistance,
      suggestions: corrections,
      word: word
    }
    res.send(reply);
  }
}
