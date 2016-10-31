// A2Z F16
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F16

// Using express: http://expressjs.com/
var express = require('express');
// Create the app
var app = express();

// Set up the server
// process.env.PORT is related to deploying on heroku
var server = app.listen(process.env.PORT || 3000, listen);

// This call back just tells us that the server has started
function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://' + host + ':' + port);
}

// This is for hosting files
// Anything in the public directory will be served
// This is just like python -m SimpleHTTPServer
// We could also add routes, but aren't doing so here
app.use(express.static('public'));

// The 'fs' (file system) module allows us to read and write files
// http://nodejs.org/api/fs.html
// This is how we'll load data
var fs = require('fs');

// And we'll look at all files in the jane austen directory
var files = fs.readdirSync('austen');

// Pulling our concordance object from a separate "module" - concordance.js
var Concordance = require('./concordance');


// An object that acts as dictionary of words and counts
var wordcounts = new Concordance();

// Read all the files
for (var i = 0; i  < files.length; i++) {
  // Doing this synchronously since it's before the server begins
  var txt = fs.readFileSync('austen/'+files[i], 'utf8');
  wordcounts.process(txt);
}
console.log('finished all files');
wordcounts.sortByCount();


// Route for sending all the concordance data
app.get('/all', showAll);

// Callback
function showAll(req, res) {
  // Send the entire concordance
  // express automatically renders objects as JSON
  res.send(wordcounts);
}

// Now a route for data about one word
app.get('/search/:word', showOne);

// Callback for the above route
function showOne(req, res) {

  // Get the word
  var word = req.params['word'];

  // Put together a reply
  var reply = { };

  // Get count from concordance
  var count = wordcounts.getCount(word);

  // If it's not part of concordance send back a message
  if (count === undefined) {
    reply.status = 'word not found';
  // Otherwise send back the word and count
  } else {
    reply.status = 'success';
    reply.count = count;
  }
  reply.word = word;

  // Output the JSON
  res.send(reply);
}
