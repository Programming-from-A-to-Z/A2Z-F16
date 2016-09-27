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

// An empty array for a queue of tweets
var queue = [];

// Every so often pick a random one from the queue and tweet it once per hour
setInterval(tweetIt, 60 * 1000);

function tweetIt() {
  console.log('I have ' + queue.length + ' tweets in the queue.');

  // Make sure there is something
  if (queue.length > 0) {
    var index = Math.floor(Math.random() * queue.length);
    var tweetID = queue[index];
    console.log('attempting to retweet: ' + tweetID);
    // Start over again?
    queue = [];

    T.post('statuses/retweet', { id: tweetID }, retweeted);

    function retweeted(err, data, response) {
      if (err) {
        console.log("Error: " + err.message);
      } else {
        console.log('Retweeted: ' + tweetID);
      }
    }

  } else {
    console.log('No tweets to retweet.');
  }
}

// Search the stream for a kind of tweet
// Search parameters: https://dev.twitter.com/streaming/reference/post/statuses/filter
// Info on track: https://dev.twitter.com/streaming/overview/request-parameters#track
// var phrase = '🌈';
// var regex = /🌈🌈+/;
var phrase = 'rainbow';
var regex = /rainbow/;

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
    console.log('Adding to queue ' + tweet.id_str);
    // Save this tweet for the queue
    queue.push(tweet.id_str);
  }
}
