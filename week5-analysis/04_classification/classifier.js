// A2Z F16
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F16

// An object that does classification with us of words
function Classifier() {

  // A function to validate a toke
  function validate(token) {
    return /\w{4,}/.test(token);
  }

  // With each word we'll store an object that includes
  // Category A,B count
  // Category A,B probability
  // Probability of A (vs. B): 1.0 means 100% A, 0% B
  this.dict = {};

  // An array of just the keys for sorting
  this.keys = [];

  // Total counts and document counts
  this.tokenCountA = 0;
  this.tokenCountB = 0;
  this.docCountA = 0;
  this.docCountB = 0;

  // Increment a word for a category
  this.increment = function(token, category) {

    // Is this a new word?
    if (this.dict[token] === undefined) {
      this.dict[token] = {};
      this.dict[token].countA = 0;
      this.dict[token].countB = 0;
      this.dict[token].word = token;
      // Track the key
      this.keys.push(token);
    }

    // Which category are we incrementing?
    if (category === 'A') {
      this.dict[token].countA++;
      this.tokenCountA++;
    } else if (category === 'B') {
      this.dict[token].countB++;
      this.tokenCountB++;
    }
  }


  // Get some data to train
  this.train = function(data, category) {
    // Split into words
    var tokens = data.split(/\W+/);

    // For every word
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i].toLowerCase();
      // Make sure it's ok
      if (validate(token)) {
        // Increment it
        this.increment(token, category);
      }
    }

    // What category are we in?
    if (category === 'A') {
      this.docCountA++;
    } else if (category === 'B') {
      this.docCountB++;
    }
  }

  // Compute the probabilities
  this.probabilities = function() {
    for (var i = 0; i < this.keys.length; i++) {
      var key = this.keys[i];
      var word = this.dict[key];

      // Average frequency per document
      word.freqA = word.countA / this.docCountA;
      word.freqB = word.countB / this.docCountB;

      // Probability via Bayes rule
      word.probA = word.freqA / (word.freqA + word.freqB);
      // Nothing is certain
      if (word.probA < 0.01) word.probA = 0.01;
      if (word.probA > 0.99) word.probA = 0.99;
      // Inverse for category B
      word.probB = 1 - word.probA;
    }
  }


  // Now we have some data we need to guess
  this.guess = function(data) {

    // All the tokens
    var tokens = data.split(/\W+/);

    // Now let's collect all the probability data
    var words = [];
    var hash = {};


    for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i].toLowerCase();
        if (validate(token)) {
          // Collect the probability
          var word;
          if (this.dict[token] !== undefined && !hash[token]) {
            word = this.dict[token];
            words.push(word);
            hash[token] = true;
          } else {
            // For an unknown word
            // We could just not include this (would be simpler)
            // Or in the case of spam we might give it 0.4 chance of spam
            // word = {};
            // word.word = token;
            // word.probA = 0.5;
            // word.probB = 0.5;
          }
      }
    }

    // Combined probabilities
    // http://www.paulgraham.com/naivebayes.html
    var productA = 1;
    var productB = 1;

    // Multiply probabilities together
    for (var i = 0; i < words.length; i++) {
      var word = words[i];
      productA *= word.probA;
      productB *= word.probB;
    }

    // Apply formula
    var pA = productA / (productA + productB);

    var results = {
      'words': words,
      'pA': pA,
    };

    return results;
  }

}
