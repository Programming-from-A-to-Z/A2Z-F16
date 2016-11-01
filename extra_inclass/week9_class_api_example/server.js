


var fs = require('fs');
var express = require('express');


var data = fs.readFileSync("words.json");
// var words = {};
words = JSON.parse(data);


var app = express();
app.use(express.static('website'));

var server = app.listen(3000, listen);

function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://' + host + ':' + port);
  console.log('CTRL-C to quit server');
}

// Set up a route
app.get('/search/:word/', searchWord);

function searchWord(request, response) {
  var txt = request.params.word;
  var reply;
  if (words[txt]) {
    reply = {
      msg: "found it",
      score: words[txt]
    }
  } else {
    reply = {
      msg: "did not find it"
    }
  }
  response.send(reply);
}



// Set up a route
app.get('/add/:word/:score', addWord);

function addWord(request, response) {
  var data = request.params;
  words[data.word] = data.score;

  var json = JSON.stringify(words, null, 2);
  fs.writeFile('words.json', json, finished);

  function finished() {
    var reply = {
      status: "success",
      word: data.word,
      score: data.score
    }
    response.send(reply);
    console.log('finished saving file!');
  }

}

app.get('/all', getAll);

function getAll(request, response) {
  response.send(words);
}
