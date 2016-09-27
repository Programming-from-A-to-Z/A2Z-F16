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

// From Wikipedia
// https://en.wikipedia.org/wiki/Letter_frequency
var data = {
  alphabet: 'abcdefghijklmnopqrstuvwxyz',
  frequencies: {
    a: 8.167,
    b: 1.492,
    c: 2.782,
    d: 4.253,
    e: 12.702,
    f: 2.228,
    g: 2.015,
    h: 6.094,
    i: 6.966,
    j: 0.153,
    k: 0.772,
    l: 4.025,
    m: 2.406,
    n: 6.749,
    o: 7.507,
    p: 1.929,
    q: 0.095,
    r: 5.987,
    s: 6.327,
    t: 9.056,
    u: 2.758,
    v: 0.978,
    w: 2.360,
    x: 0.150,
    y: 1.974,
    z: 0.074
  }
};

// Route for sending all the concordance data
app.get('/all', showAll);

// Callback
function showAll(req, res) {
  // Send the entire dataset
  // express automatically renders objects as JSON
  res.send(data);
}

// Now a route for data about one word
app.get('/search/:letter', showOne);

// Callback for the above route
function showOne(req, res) {

  // Get the word
  var letter = req.params['letter'];

  // Put together a reply
  var reply = {};

  // If it's not part of concordance send back a message
  if (data.frequencies[letter] === undefined) {
    reply.status = 'not a valid letter';
    // Otherwise send back the word and count
  } else {
    reply.status = 'success';
    reply.letter = letter;
    reply.freq = data.frequencies[letter];
  }

  // Output the JSON
  res.send(reply);
}
