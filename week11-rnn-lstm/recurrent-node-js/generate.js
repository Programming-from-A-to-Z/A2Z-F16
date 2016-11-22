// A2Z F16
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F16

// Based entirely on: 
// https://github.com/karpathy/recurrentjs
// http://cs.stanford.edu/people/karpathy/recurrentjs/index.html

var express = require('express');

var app = express();
var server = app.listen(3000, listen);

function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://' + host + ':' + port);
  console.log('CTRL-C to quit server');
}

app.get('/generate/:temperature', generate);

function generate(request, response) {
  var temp = request.params['temperature'];
  var predict = {
   generated: predictSentence(model, true, temp),
   temperature: temp
  }
  response.send(predict);
}

var loaded_model;

app.get('/model', showModel);

function showModel(request, response) {
  response.send(loaded_model);
}

if (process.argv.length < 3) {
  console.log("I need an text input file and a model file.");
  process.exit();
}

var inputFile = process.argv[2];
var modelFile = process.argv[3];

var R = require('./recurrent');

var fs = require('fs');

// prediction params
var sample_softmax_temperature = 1.0; // how peaky model predictions should be
var max_chars_gen = 100; // max length of generated sentences
var solver = new R.Solver(); // should be class because it needs memory for step caches

// model parameters
var generator = 'lstm'; // can be 'rnn' or 'lstm'
var hidden_sizes = [20, 20]; // list of sizes of hidden layers
var letter_size = 5; // size of letter embeddings

// optimization
var regc = 0.000001; // L2 regularization strength
var learning_rate = 0.01; // learning rate
var clipval = 5.0; // clip gradients at this value

var model;// = {};

var forwardIndex = function(G, model, ix, prev) {
  var x = G.rowPluck(model['Wil'], ix);
  // forward prop the sequence learner
  if (generator === 'rnn') {
    var out_struct = R.forwardRNN(G, model, hidden_sizes, x, prev);
  } else {
    var out_struct = R.forwardLSTM(G, model, hidden_sizes, x, prev);
  }
  return out_struct;
}

var predictSentence = function(model, samplei, temperature) {
  if (typeof samplei === 'undefined') {
    samplei = false;
  }
  if (typeof temperature === 'undefined') {
    temperature = 1.0;
  }

  var G = new R.Graph(false);
  var s = '';
  var prev = {};
  while (true) {

    // RNN tick
    var ix = s.length === 0 ? 0 : letterToIndex[s[s.length - 1]];
    var lh = forwardIndex(G, model, ix, prev);
    prev = lh;

    // sample predicted letter
    logprobs = lh.o;
    if (temperature !== 1.0 && samplei) {
      // scale log probabilities by temperature and renormalize
      // if temperature is high, logprobs will go towards zero
      // and the softmax outputs will be more diffuse. if temperature is
      // very low, the softmax outputs will be more peaky
      for (var q = 0, nq = logprobs.w.length; q < nq; q++) {
        logprobs.w[q] /= temperature;
      }
    }

    probs = R.softmax(logprobs);
    if (samplei) {
      var ix = R.samplei(probs.w);
    } else {
      var ix = R.maxi(probs.w);
    }

    if (ix === 0) break; // END token predicted, break out
    if (s.length > max_chars_gen) {
      break;
    } // something is wrong

    var letter = indexToLetter[ix];
    s += letter;
  }
  return s;
}

var loadModel = function(j) {
  loaded_model = j;
  //learning_rate = 0.0001;

  hidden_sizes = j.hidden_sizes;
  generator = j.generator;
  letter_size = j.letter_size;
  model = {};
  for(var k in j.model) {
    if(j.model.hasOwnProperty(k)) {
      var matjson = j.model[k];
      model[k] = new R.Mat(1,1);
      model[k].fromJSON(matjson);
    }
  }
  letterToIndex = j['letterToIndex'];
  indexToLetter = j['indexToLetter'];
  vocab = j['vocab'];

  iterations = Number(j['iterations']) | 0;

  // reinit these
  ppl_list = [];
  tick_iter = 0;
  solver = new R.Solver(); // have to reinit the solver since model changed
}

if (fs.existsSync(modelFile)) {
  var data = fs.readFileSync(modelFile);
  loadModel(JSON.parse(data));
}

for (var q = 0; q < 5; q++) {
  var pred = predictSentence(model, true, sample_softmax_temperature);
  console.log(pred);
}







