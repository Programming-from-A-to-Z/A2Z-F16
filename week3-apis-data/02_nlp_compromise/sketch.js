// A2Z F16
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F16
// http://shiffman.net/a2z


function setup() {
  noCanvas();
  var nlp = window.nlp_compromise

  // Make a text input field
  input = select('#sentence');
  // Make a submit button
  var button1 = select('#pluralize');
  button1.mousePressed(pluralize);

  var button2 = select('#negate');
  button2.mousePressed(negate);

  var button3 = select('#tense');
  button3.mousePressed(futureTense);

  function pluralize() {
    var output = input.value();
    var sentence = nlp.sentence(output);

    for (var i = 0; i < sentence.terms.length; i++) {
      var word = sentence.terms[i].text;
      var pos = sentence.terms[i].pos;
      if (pos.Noun) {
        var plural = nlp.noun(word).pluralize();
        output = output.replace(word, plural);
      }
    }

    createP(output).class('text');
  }

  function negate() {
    var output = nlp.statement(input.value()).negate().text()
    createP(output).class('text');
  }

  function futureTense() {
    var output = input.value();
    var sentence = nlp.sentence(output);

    for (var i = 0; i < sentence.terms.length; i++) {
      var word = sentence.terms[i].text;
      var pos = sentence.terms[i].pos;
      if (pos.Verb) {
        var tenses = nlp.verb(word).conjugate();
        // { past: 'spoke',
        //   infinitive: 'speak',
        //   gerund: 'speaking',
        //   actor: 'speaker',
        //   present: 'speaks',
        //   future: 'will speak',
        //   perfect: 'have spoken',
        //   pluperfect: 'had spoken',
        //   future_perfect: 'will have spoken'
        // }
        output = output.replace(word, tenses.future);
      }
    }

    createP(output).class('text');
  }




  nlp.noun('dinosaur').pluralize();
  // 'dinosaurs'



  nlp.statement('She sells seashells').negate().text()
  // 'She doesn't sell seashells'

  nlp.sentence('I fed the dog').replace('the [Noun]', 'the cat').text()
  // 'I fed the cat'

  nlp.text('Tony Hawk did a kickflip').people();
  // [ Person { text: 'Tony Hawk' ..} ]

  nlp.noun('vacuum').article();
  // 'a'

  nlp.person('Tony Hawk').pronoun();
  // 'he'

  nlp.value('five hundred and sixty').number;
  // 560

  // nlp.text(require('nlp-corpus').text.friends()).topics()//11 seasons of friends
  // [ { count: 2523, text: 'ross' },
  //   { count: 1922, text: 'joey' },
  //   { count: 1876, text: 'god' },
  //   { count: 1411, text: 'rachel' },
  //   ....

}
