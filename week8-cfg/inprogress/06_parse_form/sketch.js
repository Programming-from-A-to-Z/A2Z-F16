// A2Z F15
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F15

// Get input from user
var fruitInput;
var totalInput;

// Keep list of DOM elements for clearing later when reloading
var listItems = [];

function setup() {
  
  // Start parse
  // See: https://parse.com/apps/quickstart
  Parse.initialize("63MFKUwjDE4syXL3vr3hFJw6Ic5brmF7VfHbJgti", "P9eoSLPUbdkVLr60iYHd58iD4Jje2fgrFXHiN5Oc");

  // Input fields
  fruitInput = select('#fruit');
  totalInput = select('#total');

  // Submit button
  var submit = select('#submit');
  submit.mousePressed(sendToParse);

  // Start loading the data
  loadParse();
}

function loadParse() {
  // What's the name of the object we're looking for
  var Fruit = Parse.Object.extend("Fruit");

  // Start a query
  var query = new Parse.Query(Fruit);

  // Need a success and error callback
  var callbacks = {
    // success callback is more complex, moving out of here
    success: gotData,
    // Just log the error if it doesn't work
    error: function(error) {
      console.log(error);
    }    
  }

  // find() is how to ask for everything
  query.find(callbacks);
}

// The data comes back as an array 
function gotData(data) {
  // Look at the data in the console 
  console.log(data);
  // clear previous HTML list
  clearList();

  // Make an HTML list
  var list = createElement('ol');
  list.parent('data');

  // Loop through array
  for (var i = 0; i < data.length; i++) {
    // The  data is in a property attributes
    // The "id" is also important (it's unique)
    var attributes = data[i].attributes;
    var li = createElement('li', attributes.fruit + ': ' + attributes.total + ", id: " + data[i].id);
    li.parent(list);
    listItems.push(li);
  }
}

// Clear everything
function clearList() {
  for (var i = 0; i < listItems.length; i++) {
    listItems[i].remove();
  }
}

// This is a function for sending data
function sendToParse() {
  // Make an object with data in it
  var data = {
    fruit: fruitInput.value(),
    total: totalInput.value()
  }

  // This is the name of the object "type"
  var Fruit = Parse.Object.extend("Fruit");
  // Make a new instance
  var fruit = new Fruit();
  // Save that data and a callback for when completed
  fruit.save(data).then(finished);

  // Reload the data for the page
  function finished() {
    console.log('Data saved successfully');
    loadParse();
  }
}