// A2Z F16
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F16

// https://github.com/NaturalNode/natural
// http://stackoverflow.com/questions/10059594/a-simple-explanation-of-naive-bayes-classification
// http://shiffman.github.io/A2Z-F15/week5/notes.html#naive-bayesian-text-classification

// Using express: http://expressjs.com/
var express = require('express');
// Create the app
var app = express();

// File System for loading the list of words
var fs = require('fs');

// Using node natural
var natural = require('natural');

// Cors for allowing "cross origin resources"
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
var cors = require('cors');
app.use(cors());

// "body parser" is need to deal with post requests
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// This is for hosting files
app.use(express.static('public'));

// Set up the server
var server = app.listen(3000, listen);

// This call back just tells us that the server has started
function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://' + host + ':' + port);
}

// Do we already have a classifier "database"
var exists = fs.existsSync('classifier.json');

// If we do, load it
if (exists) {
  natural.BayesClassifier.load('classifier.json', null, loaded);
// If not make a new one
} else {
  console.log('starting a new classifier');
  classifier = new natural.BayesClassifier();
}

// All set and loaded
function loaded(err, cf) {
  classifier = cf;
  console.log('Classifier loaded');
}


// This is a post for training
app.post('/train', training);

function training(req, res) {
  // Get the text and category
  var text = req.body.text;
  var category = req.body.category;

  // Add the document and train
  classifier.addDocument(text, category);
  classifier.train();

  // Save to the "database"
  classifier.save('classifier.json', saved);

  // All done saving, can send a message back to client
  function saved(err, classifier) {
    console.log('finished training and saving');
    res.send(req.body);
  }
}


// This is a POST for classifying a text
app.post('/classify', classify);

// Handle the POST
function classify(req, res) {
  // What is the text
  var text = req.body.text;
  // Use natural to classify
  var classification = classifier.classify(text);
  // Also look at all the metadaya
  var all = classifier.getClassifications(text);

  // Make a reply that has all the info
  var reply = {
    category: classification,
    classifications: all
  }

  // Send it back
  res.send(reply);
}
