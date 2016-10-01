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
var concordance = require('./concordance');

// Read the file as utf8 and process the data
// Notice how this is in a loop to parse all files
for (var i = 0; i  < files.length; i++) {
  // Note the callback is processFile
  fs.readFile('austen/'+files[i], 'utf8', processFile);
}

// How many files have been read?
// This helps us know when we are done
var fileCount = 0;

// An object that acts as dictionary of words and counts
var wordcounts = new concordance.Concordance();

// This callback is triggered for every file
function processFile(err, data) {
  // If there's a problem
  if (err) {
    console.log('ooops, there was an error reading this file');
    throw err;
  }

  // Send the data into the concordance
  wordcounts.process(data);

  // This file finished
  fileCount++;

  // Is this the last file?
  if (fileCount === files.length) {
    wordcounts.sortByCount();
  }
}


// Route for sending all the concordance data
app.get('/all', showAll);

// Callback
function showAll(req, res) {
  // Send the entire concordance
  // express automatically renders objects as JSON
  res.send(wordcounts);
}
