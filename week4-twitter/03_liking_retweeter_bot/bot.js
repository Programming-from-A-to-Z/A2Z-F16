// A2Z F16
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F16

// Bot that retweets

// Using the Twit node package
// https://github.com/ttezel/twit
var Twit = require('twit');

// Pulling all my twitter account info from another file
var config = require('./config.js');

// Making a Twit object for connection to the API
var T = new Twit(config);

// Search the stream for a kind of tweet

var phrase = 'I feel like I';
var regex = /^I feel like I/;

// var phrase = '🌈';
// var regex = /🌈/;

// Search parameters: https://dev.twitter.com/streaming/reference/post/statuses/filter
// Info on track: https://dev.twitter.com/streaming/overview/request-parameters#track
var stream = T.stream('statuses/filter', { track: phrase })
stream.on('tweet', gotTweet);

function gotTweet(tweet) {
  // If we wanted to write a file out
  // to look more closely at the data
  // var fs = require('fs');
  // var json = JSON.stringify(tweet,null,2);
  // fs.writeFile("tweet.json", json);

  // Note that according to twitter docs: "Exact matching of phrases
  // (equivalent to quoted phrases in most search engines) is not supported."
  // So we filter ourselves here:

  if (regex.test(tweet.text)) {
    console.log('Attempting to retweet ' + tweet.id_str + ": " + tweet.text);

    T.post('statuses/retweet', { id: tweet.id_str }, retweeted);

    // I could also favorite (i.e. "like")
    // T.post('favorites/create', { id: tweet.id_str }, retweeted);

    function retweeted(err, data, response) {
      if (err) {
        console.log("Error: " + err.message);
      } else {
        console.log('Retweeted: ' + tweet.id);
      }
    }
  }
}
