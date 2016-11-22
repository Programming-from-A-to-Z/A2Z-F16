var spawn = require('child_process').spawn;
var express = require('express');

var app = express();
var server = app.listen(3000, listen);

function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://' + host + ':' + port);
  console.log('CTRL-C to quit server');
}

app.get('/generate/:diversity', generate);

function generate(request, response) {
  var diversity = request.params['diversity']

  var proc = spawn('python', ['lstm_generator.py', diversity]);
  proc.stdout.on('data', result);
  console.log('generating');

  function result(data) {
    var results = data.toString();
    console.log(results);
    var characters = results.split('\n');
    response.send(characters);
  }
}

