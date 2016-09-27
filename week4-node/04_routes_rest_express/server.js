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
// http://myserver.com/thing/dan/5
// This is the "RESTful" model, thing is the path, name and num are parameters
app.get('/thing/:name/:num', doThing);

// This is the call back for what to do
// We can get stuff from url path
// http://myserver.com/thing/name/id
function doThing(req, res) {
  // Query String
  var name = req.params['name'];
  // If there is no num keep it as 1
  var num = req.params['num'] || 1;

  // Create the output
  var output = '';
  for (var i = 0; i < num; i++) {
    output += "Thanks for doing your thing, " + name + '<br/>';
  }
  res.send(output);
}
