// A2Z F16
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F16

// This is based on Allison Parrish's great RWET examples
// https://github.com/aparrish/rwet-examples

// A grammar object
var cfree;

function setup() {
  // An empty one
  cfree = new ContextFree();

  // We can add rules manually
  cfree.addRule('S', ['NP', 'VP']);
  cfree.addRule('NP', ['the', 'N']);
  cfree.addRule('VP', ['V', 'the', 'N']);

  cfree.addRule('N', ['cat']);
  cfree.addRule('N', ['dog']);
  cfree.addRule('N', ['unicorn']);
  cfree.addRule('N', ['rainbow']);
  cfree.addRule('V', ['sees']);
  cfree.addRule('V', ['chases']);
  cfree.addRule('V', ['falls in love with']);
  cfree.addRule('V', ['believes']);

  noCanvas();
  // A button to generate a new sentence
  var button = select('#generate');
  button.mousePressed(generate);

  // A button to clear everything
  var clear = select('#clear');
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
