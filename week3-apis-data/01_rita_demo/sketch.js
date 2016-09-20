// A2Z F16
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F16
// http://shiffman.net/a2z


function setup() {

  noCanvas();

  var lexicon = new RiLexicon();

  // Make a text input field
  input = select('#sentence');
  // Make a submit button
  var button1 = select('#pos');
  button1.mousePressed(posSwap);
  var button2 = select('#rhyme');
  button2.mousePressed(rhymeSwap);

  function posSwap() {
    var sentence = input.value();
    var rs = new RiString(sentence);
    var pos = rs.pos();

    var output = '';
    for (var i = 0; i < pos.length; i++) {
      output += lexicon.randomWord(pos[i]);
      output += ' ';
    }
    createP(output).class('text');
  }

  function rhymeSwap() {
    var sentence = input.value();
    var output = sentence.replace(/\b\w+\b/g, replacer);
    createP(output).class('text');
    function replacer(match) {
      var rhymes = lexicon.rhymes(match);
      if (rhymes.length > 0) {
        return random(rhymes);
      } else {
        return match;
      }
    }
  }
}
