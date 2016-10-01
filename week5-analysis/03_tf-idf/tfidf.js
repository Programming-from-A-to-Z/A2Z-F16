// A2Z F16
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F16

function TFIDF() {
  this.dict = {};
  this.keys = [];
  this.totalwords = 0;

  function split(text) {
    // Split into array of tokens
    return text.split(/\W+/);
  }

  // A function to validate a toke
  function validate(token) {
    return /\w{2,}/.test(token);
  }

  // Count the words
  this.termFreq = function(data) {
    var tokens = split(data);
    // For every token
    for (var i = 0; i < tokens.length; i++) {
      // Lowercase everything to ignore case
      var token = tokens[i].toLowerCase();
      if (validate(token)) {
        this.increment(token);
        this.totalwords++;
      }
    }
  }

  // Get the document frequencies across all documents
  this.docFreq = function(data) {
    var tokens = split(data);

    // A temporary dictionary of words in this document
    var tempDict = {};
    // For every token
    for (var i = 0; i < tokens.length; i++) {
      // Lowercase everything to ignore case
      var token = tokens[i].toLowerCase();
      // Simpler we just need to see if it exists or not
      if (validate(token) && tempDict[token] === undefined) {
        tempDict[token] = true;
      }
    }

    for (var i = 0; i < this.keys.length; i++) {
      var key = this.keys[i];
      // Does this word exist in this document?
      if (tempDict[key]) {
        this.dict[key].docCount++;
      }
    }
  }

  // Get all the keys
  this.getKeys = function() {
    return this.keys;
  }

  // Get the count for one word
  this.getCount = function(word) {
    return this.dict[word].count;
  }

  // Get the score for one word
  this.getScore = function(word) {
    return this.dict[word].tfidf;
  }

  // Increment the count for one word
  this.increment = function(word) {
    // Is this a new word?
    if (this.dict[word] == undefined) {
      this.dict[word] = {};
      this.dict[word].count = 1;
      this.dict[word].docCount = 0;
      this.dict[word].word = word;
      this.keys.push(word);
    // Otherwise just increment its count
    } else {
      this.dict[word].count++;
    }
  }

  // Finish and calculate everything
  this.finish = function(totaldocs) {
    // calculate tf-idf score
    for (var i = 0; i < this.keys.length; i++) {
      var key = this.keys[i];
      var word = this.dict[key];
      var tf = word.count / this.totalwords;
      // See:
      var idf = log(totaldocs / word.docCount);
      word.tfidf = tf * idf;
    }
  }

  // Sort by word counts
  this.sortByCount = function() {
    // A fancy way to sort each element
    // Compare the counts
    var tfidf = this;
    this.keys.sort(function(a,b) {
      return (tfidf.getCount(b) - tfidf.getCount(a));
    });
  }

  // Sort by TFIDF score
  this.sortByScore = function() {
    // A fancy way to sort each element
    // Compare the counts
    var tfidf = this;
    this.keys.sort(function(a,b) {
      return (tfidf.getScore(b) - tfidf.getScore(a));
    });
  }

}
