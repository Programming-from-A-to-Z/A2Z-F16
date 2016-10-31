// A2Z F16
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F16

// An object to store all the info related to a concordance

module.exports = Concordance;

function Concordance() {
  this.dict = {};
  this.keys = [];

  // Splitting up the text
  this.split = function(text) {
    // Split into array of tokens
    return text.split(/\W+/);
  }

  // A function to validate a toke
  this.validate = function(token) {
    return /\w{2,}/.test(token);
  }

  // Process new text
  this.process = function(data) {
    var tokens = this.split(data);
    // For every token
    for (var i = 0; i < tokens.length; i++) {
      // Lowercase everything to ignore case
      var token = tokens[i].toLowerCase();
      if (this.validate(token)) {
        // Increase the count for the token
        this.increment(token);
      }
    }
  }

  // An array of keys
  this.getKeys = function() {
    return this.keys;
  }

  // Get the count for a word
  this.getCount = function(word) {
    return this.dict[word];
  }

  // Increment the count for a word
  this.increment = function(word) {
    // Is this a new word?
    if (!this.dict[word]) {
      this.dict[word] = 1;
      this.keys.push(word);
    // Otherwise just increment its count
    } else {
      this.dict[word]++;
    }
  }

  // Sort array of keys by counts
  this.sortByCount = function() {
    // For this function to work for sorting, I have
    // to store a reference to this so the context is not lost!
    var concordance = this;

    // A fancy way to sort each element
    // Compare the counts
    function sorter(a, b) {
      var diff = concordance.getCount(b) - concordance.getCount(a);
      return diff;
    }

    // Sort using the function above!
    this.keys.sort(sorter);
  }

}
