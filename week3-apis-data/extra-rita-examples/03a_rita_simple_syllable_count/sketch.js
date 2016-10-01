// A2Z F15
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F15

var wordInput;

var results;

function setup() {
  noCanvas();


  wordInput = select('#word');

  // A button
  var analyzeButton = select('#analyze')
  analyzeButton.mousePressed(analyze);

  var clearButton = select('#clear');
  clearButton.mousePressed(clearAll);
    
}

function analyze() {
  var p = createP('');
  p.class('text');


  // What has the user entered?
  // Make a rita string object
  var rs = new RiString(wordInput.value());

  // Analyze that string for lots of features
  var features = rs.features();
  
  // Just look at the syllables
  var syllables = features.syllables;

  // What's the count of syllables based on the slashes
  var syllablesCount = syllables.split(/\//).length;
  
  // Show
  var syl = createDiv('Syllables: ' + syllables);
  var count = createDiv('Count: ' + syllablesCount);
  syl.parent(p);
  count.parent(p);

}

// Go through and remove all the divs
function clearAll() {
  var par = selectAll('.text');
  for (var i = 0; i < par.length; i++) {
    par[i].remove();
  }
}
