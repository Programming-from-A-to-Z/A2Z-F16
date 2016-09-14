var words = ["It", "was", "a", "dark", "and", "stormy", "night"];

function hoverWord() {
  var word = this.html();
  if (word.length > 3) {
    this.style('background-color', '#F0F');
  } else {
    this.style('background-color', '#FF0');
  }
  // this.html('rainbow');

}

function setup() {
  console.log(this);

  noCanvas();

  var wordP = select("#words");

  for (var i = 0; i < words.length; i++) {
    var word = createSpan(words[i]);
    //word.style("margin-left", "10px");
    word.parent(wordP);
    word.mouseOver(hoverWord);

    var space = createSpan(" ");
    space.parent(wordP);
  }
}
