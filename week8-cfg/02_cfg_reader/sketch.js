// A2Z F16
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F16

// This is based on Allison Parrish's great RWET examples
// https://github.com/aparrish/rwet-examples

// Grammar
var cfree;
// For loading text
var lines;

// Preload the grammar
function preload() {
  lines = loadStrings('test.grammar');
}


function setup() {
  cfree = new ContextFree();

  // rules are stored in the given file in the following format:
  // Rule -> a | a b c | b c d
  // ... which will be translated to:
  // cfree.addRule('Rule', ['a'])
  // cfree.addRule('Rule', ['a', 'b', 'c'])
  // cfree.addRule('Rule', ['b', 'c', 'd'])

  // Here, regex parses the grammar files and adds rules

  // Look through all the rules
  for (var i = 0; i < lines.length; i++) {
    // A regex to get rid of comments
    var line = lines[i].replace(/#.*$/,'').trim(); // Get rid if any comments
    // Match the rule syntax
    var match = /(\w+)\s*->\s*(.*)/.exec(line);
    // If we found a fule
    if (match) {
      // The rule is the first group
      var rule = match[1];
      // The expansions can found in group 2
      var expansions = match[2].split(/\s*\|\s*/);
      // For every expansion
      for (var j = 0; j < expansions.length; j++) {
        // Make the expansion an array and add the rule
        var tokens = expansions[j].split(/\s+/);
        cfree.addRule(rule, tokens);
      }
    }
  }

  noCanvas();
  // A button to generate a new sentence
  var button = select('#generate');
  button.mousePressed(generate);

  // A button to clear everything
  var clear = select('#clearp');
  clear.mousePressed(clearAll);
}

// Remove everything
function clearAll() {
  var elements = selectAll('.text');
  for (var i = 0; i < elements.length; i++) {
    elements[i].remove();
  }
}

function generate() {
  // Get an expansion starting with 'S'
  var expansion = cfree.getExpansion('S');
  // Make a paragraph
  var par = createP(expansion);
  par.class('text');
}
