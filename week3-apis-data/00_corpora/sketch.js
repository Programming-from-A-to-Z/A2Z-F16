// A2Z F16
// Daniel Shiffman
// http://shiffman.net/a2z

var emojis;

function setup() {
  noCanvas();
  loadJSON('sea_emoji.json', gotEmoji);

  var button = select('#button');
  // Demonstrating anonymous function
  button.mousePressed(function() {
    var span = createSpan(random(emojis))
    // Demonstrating chaining
    span.style('font-size','64px').parent('emojis');
  });
}

function gotEmoji(data) {
  console.log(data);
  emojis = data.seaEmoji;
}
