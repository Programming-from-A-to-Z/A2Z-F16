// A2Z F16
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F16

// Using the Twit node package
// https://github.com/ttezel/twit
var Twit = require('twit');

// Pulling all my twitter account info from another file
var config = require('./config.js');

// Here is all the generative text code
// Tracery: https://github.com/galaxykate/tracery
// Tutorial: http://www.crystalcodepalace.com/traceryTut.html
// Make a grammar: http://www.brightspiral.com/tracery/

var tracery = require('tracery-grammar');

var data = {
  "sentence": ["#color.capitalize# #animal.s# are #often# #mood#.",
               "#animal.a.capitalize# is #often# #mood#, unless it is #color.a# one."],
  "often": ["rarely","never","often","almost always","always","sometimes"],
  "color": ["orange","blue","white","black","grey","purple","indigo","turquoise"],
  "animal": ["unicorn","raven","sparrow","scorpion","coyote","eagle","owl","lizard","zebra","duck","kitten"],
  "mood": ["vexed","indignant","impassioned","wistful","astute","courteous"],
};

var grammar = tracery.createGrammar(data);
grammar.addModifiers(tracery.baseEngModifiers);

function generate() {
  var status = grammar.flatten('#sentence#');
  return status;
}

// Making a Twit object for connection to the API
var T = new Twit(config);

// Start once
tweeter();

// Once every N milliseconds
setInterval(tweeter, 60*5*1000);

// Here is the bot!
function tweeter() {

  // This is a random number bot
  var tweet = generate();

  // Post that tweet!
  T.post('statuses/update', { status: tweet }, tweeted);

  // Callback for when the tweet is sent
  function tweeted(err, data, response) {
    if (err) {
      console.log(err);
    } else {
      console.log('Success: ' + data.text);
      //console.log(response);
    }
  };
}
