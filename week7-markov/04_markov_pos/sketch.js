// A2Z F16
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F16

// Keep track of all words by pos
var wordbypos = {};
// Keep track of all words
var poslist = [];

function setup() {
  noCanvas();
  // Assign the generate() function to the button
  var generateButton = select('#generate');
  generateButton.mousePressed(generate);

  var clearButton = select('#clear');
  clearButton.mousePressed(clearIt);
}

function clearIt() {
  var markovs = selectAll('.markov');
  for (var i = 0; i < markovs.length; i++) {
    markovs[i].remove();
  }
}


function generate() {

  // Get the input text
  var textinput = select('#text');

  // Create a generator with parameters
  var markov = new MarkovGeneratorWord(2, 50);

  // Split it up into line breaks
  var lines = textinput.value().split('\n');

  // Feed in the lines
  for (var i = 0; i < lines.length; i++) {
    // Trim out any extra white space
    var txt = lines[i].trim();

    var pos = RiTa.getPosTags(txt);
    var words = RiTa.tokenize(txt);
    markov.feed(pos);

    for (var i = 0; i < pos.length; i++) {
      var tag = pos[i];
      var word = words[i];
      if (!wordbypos[tag]) {
        wordbypos[tag] = [];
        poslist.push(tag);
      }
      wordbypos[tag].push(word);
    }

  }

  // Show the resulting output
  var generatedPos = markov.generate();

  var posarray = generatedPos.split(/\s+/);

  var generatedText = '';
  for (var i = 0; i < posarray.length; i++) {
    var tag = posarray[i];
    var options = wordbypos[tag];
    generatedText += options.choice() + ' ';
  }

  var par = createP(generatedPos + '<br/><br/>' + generatedText);
  par.class('markov');
  par.parent('results');



}
