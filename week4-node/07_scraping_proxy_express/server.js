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

// A router to load a URL
app.get('/load', loadURL);

// This is a module for HTTP Requests
var request = require('request');

// Callback
function loadURL(req, res) {
  // Get the URL from the user
  var url = req.query.url;

  // Execute the HTTP Request
  request(url, loaded);

  // Callback for when the request is complete
  function loaded(error, response, body) {
    // Check for errors
    if (!error && response.statusCode == 200) {
      // The raw HTML is in body
      res.send(body);
    } else {
      res.send('error');
    }
  }
}
