// A2Z F16
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F16

// Get input from user
var exclamationInput;
var adjectiveInput;
var adverbInput;
var nounInput1;
var nounInput2;
var database;

function setup() {
  noCanvas();

  var config = {
    apiKey: "AIzaSyA-VyZJOZVqXZj82wvVMkfJedDEhqXcIh8",
    authDomain: "a2zitp-6519b.firebaseapp.com",
    databaseURL: "https://a2zitp-6519b.firebaseio.com",
    storageBucket: "a2zitp-6519b.appspot.com",
    messagingSenderId: "363965061200"
  };
  firebase.initializeApp(config);
  database = firebase.database();


  var params = getURLParams();
  if (params.id) {
    loadOne(params.id);
  }

  // Input fields
  exclamationInput = select('#exclamation');
  adjectiveInput = select('#adj');
  adverbInput = select('#adv');
  nounInput1 = select('#noun1');
  nounInput2 = select('#noun2');

  // Submit button
  var submit = select('#submit');
  submit.mousePressed(sendFirebase);

}


// This is a function for sending data
function sendFirebase() {
  // Make an object with data in it
  var data = {
    exclamation: exclamationInput.value(),
    adjective: adjectiveInput.value(),
    adverb: adverbInput.value(),
    noun1: nounInput1.value(),
    noun2: nounInput2.value()
  }

  var madlibs = database.ref('madlibs');
  var madlib = madlibs.push(data, finished);
  console.log("Firebase generated key: " + madlib.key);

  // Reload the data for the page
  function finished(err) {
    if (err) {
      console.log("ooops, something went wrong.");
      console.log(err);
    } else {
      console.log('Data saved successfully');
      generate(data, madlib.key);
    }
  }

}

function generate(data, key) {
  var txt = '"$exclamation$!" she said $adverb$ as she jumped into her convertible $noun1$ '
           + 'and drove off with her $adjective$ $noun2$.';

  var madlib = txt.replace(/\$(.*?)\$/g, replacer);

  function replacer(match, what) {
    var newtext = data[what];

    if (what === 'Exclamation') {
      newtext = newtext.replace(/^(.)/, capitalize);
      function capitalize(match, firstLetter) {
        return firstLetter.toUpperCase();
      }
    }

    return newtext;
  }
  var par = createDiv(madlib);
  par.parent('madlib');
  par.class('text');

  var id = data.id;
  var a = createA('?id='+key,'permalink');
  a.parent('madlib');
}

function loadOne(id) {
  var ref = database.ref("madlibs/" + id);
  ref.on("value", gotOne, errData);

  function errData(error) {
    console.log("Something went wrong.");
    console.log(error);
  }

  function gotOne(data) {
    generate(data.val(), id);
  }
}
