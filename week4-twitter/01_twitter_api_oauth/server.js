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

// Create an Twitter object to connect to Twitter API
// npm install twit
var Twit = require('twit');

// Pulling all my twitter account info from another file
var config = require('./config.js');
// Making a Twit object for connection to the API
var T = new Twit(config);

// This is how I would do it manually, if I were doing it manually
// var T = new Twit({
//   consumer_key:         '',
//   consumer_secret:      '',
//   access_token:         '',
//   access_token_secret:  ''
// });

// This route searches twitter
app.get('/tweets/:query', getTweets);

// Callback
function getTweets(req, res) {
  // Here's the string we are seraching for
  var query = req.params.query;

  // Execute a Twitter API call
  T.get('search/tweets', { q: query, count: 10 }, gotData);

  // Callback
  function gotData(err, data) {
    // Get the tweets
    var tweets = data.statuses;
    // Spit it back out so that p5 can load it!
    res.send(tweets);
  };
}

// This is a route for posting a tweet
app.get('/tweet', postTweet);

function postTweet(req, res) {
  // What did we ask to tweet?
  var statement = req.query.status;

  // Post that tweet!
  T.post('statuses/update', { status: statement }, tweeted);

  function tweeted(err, reply) {
    // If there was an error let's respond with that error
    if (err) {
      res.send(err);
    // Otherwise let's respond back that it worked ok!
    } else {
      res.send(reply);
    }
  };
}
