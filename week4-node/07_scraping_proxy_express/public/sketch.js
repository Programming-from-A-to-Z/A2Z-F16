// A2Z F15
// Daniel Shiffman
// https://github.com/shiffman/

var url = 'http://www.imdb.com/title/tt0058331/';

function setup() {
  noCanvas();

  var input = select('#url');
  var button = select('#submit');

  button.mousePressed(getData);

  function getData() {
    var url = input.value();
    loadStrings('load?url='+url, gotData);
  }
}

function gotData(data) {
  var raw = data.join('\n');
  //console.log(raw);

  var time = /<time itemprop="duration" datetime="\w+?">(.*?)<\/time>/
  var matches = raw.match(time);

  createP(matches[1]);

  var poster = /<link rel='image_src' href="(.*?)">/
  matches = raw.match(poster);
  console.log(matches);
  var img = createImg(matches[1]);
  img.style('width', '100px');
}




