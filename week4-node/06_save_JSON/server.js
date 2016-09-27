// A2Z F16
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F16

// http://www2.imm.dtu.dk/pubdb/views/publication_details.php?id=6010
// https://www.npmjs.com/package/sentiment

// Using express: http://expressjs.com/
var express = require('express');
// Create the app
var app = express();

// File System for loading the list of words
var fs = require('fs');

// Cors for allowing "cross origin resources"
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
var cors = require('cors');
app.use(cors());

// This is for hosting files
app.use(express.static('public'));

// Our "database" (in addition to what is in the AFINN-111 list)
// is "additional.json", check first to see if it exists
var words;
var exists = fs.existsSync('words.json');
if (exists) {
  // Read the file
  console.log('loading words');
  var txt = fs.readFileSync('words.json', 'utf8');
  // Parse it  back to object
  words = JSON.parse(txt);
} else {
  // Otherwise start with blank list
  console.log('No words');
  words = {};
}

// Set up the server
// process.env.PORT is related to deploying on heroku
var server = app.listen(process.env.PORT || 3000, listen);

// This call back just tells us that the server has started
function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://' + host + ':' + port);
}

// A route for adding a new word with a score
app.get('/add/:word/:score', addWord);

// Handle that route
function addWord(req, res) {
  // Word and score
  var word = req.params.word;
  // Make sure it's not a string by accident
  var score = Number(req.params.score);

  // Put it in the object
  words[word] = score;

  // Let the request know it's all set
  var reply = {
    status: 'success',
    word: word,
    score: score
  }
  console.log('adding: ' + JSON.stringify(reply));

  // Write a file each time we get a new word
  // This is kind of silly but it works
  var json = JSON.stringify(words, null, 2);
  fs.writeFile('words.json', json, 'utf8', finished);
  function finished(err) {
    console.log('Finished writing words.json');
    // Don't send anything back until everything is done
    res.send(reply);
  }
}

// Route for sending all the concordance data
app.get('/all', showAll);

// Callback
function showAll(req, res) {
  // Send the entire dataset
  // express automatically renders objects as JSON
  res.send(words);
}
