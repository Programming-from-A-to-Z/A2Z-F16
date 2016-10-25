// A2Z F15
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F15

// Get input from user
var exclamationInput;
var adjectiveInput;
var adverbInput;
var nounInput1;
var nounInput2;

function setup() {
  noCanvas();

  // Start parse
  // See: https://parse.com/apps/quickstart
  Parse.initialize("63MFKUwjDE4syXL3vr3hFJw6Ic5brmF7VfHbJgti", "P9eoSLPUbdkVLr60iYHd58iD4Jje2fgrFXHiN5Oc");


  var params = getURLParams();
  if (params.id) {
    loadParse(params.id);
  }
  
  // Input fields
  exclamationInput = select('#exclamation');
  adjectiveInput = select('#adj');
  adverbInput = select('#adv');
  nounInput1 = select('#noun1');
  nounInput2 = select('#noun2');

  // Submit button
  var submit = select('#submit');
  submit.mousePressed(sendToParse);

  // Start loading the data
  // loadParse();
}


// This is a function for sending data
function sendToParse() {
  // Make an object with data in it
  var data = {
    exclamation: exclamationInput.value(),
    adjective: adjectiveInput.value(),
    adverb: adverbInput.value(),
    noun1: nounInput1.value(),
    noun2: nounInput2.value()
  }

  // This is the name of the object "type"
  var MadLib = Parse.Object.extend("MadLib");
  // Make a new instance
  var madlib = new MadLib();
  // Save that data and a callback for when completed
  madlib.save(data).then(finished);

  // Reload the data for the page
  function finished(response) {
    console.log('Data saved successfully');
    console.log(response);
    generate(response);
  }
}

function generate(data) {
  var txt = '"$exclamation$!" she said $adverb$ as she jumped into her convertible $noun1$ ' 
           + 'and drove off with her $adjective$ $noun2$.';

  var madlib = txt.replace(/\$(.*?)\$/g, replacer);

  function replacer(match, what) {
    var newtext = data.attributes[what];

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
  var a = createA('?id='+id,'permalink');
  a.parent('madlib');
}

function loadParse(id) {
  // What's the name of the object we're looking for
  var MadLib = Parse.Object.extend("MadLib");

  // Start a query
  var query = new Parse.Query(MadLib);

  // Need a success and error callback
  var callbacks = {
    // success callback is more complex, moving out of here
    success: gotData,
    // Just log the error if it doesn't work
    error: function(object, error) {
      console.log(error);
    }
  }
  console.log(id);
  // get() is how to ask by id
  query.get(id, callbacks);
}

// The data comes back as an array 
function gotData(response) {
  generate(response);

}




