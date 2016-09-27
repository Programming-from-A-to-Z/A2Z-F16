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

// Here's how we can write code to handle a specific 'route'
// http://myserver.com/thing
app.get('/thing', doThing);

// This is the call back for what to do
// We can get stuff from the query String!
// http://myserver.com/thing?name=Dan
function doThing(req, res) {
  // Query String ?name=Dan
  var name = req.query['name'];
  // This is also valid:
  // var name = request.query.name;

  // Just spit back out the content
  res.send("Thanks for doing your thing, " + name);
}
