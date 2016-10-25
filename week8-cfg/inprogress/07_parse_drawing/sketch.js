// A2Z F15
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F15

// Get input from user
var points = [];

// Keep list of DOM elements for clearing later when reloading
var listItems = [];

function setup() {
  
  // Start parse
  // See: https://parse.com/apps/quickstart
  Parse.initialize("63MFKUwjDE4syXL3vr3hFJw6Ic5brmF7VfHbJgti", 
    "P9eoSLPUbdkVLr60iYHd58iD4Jje2fgrFXHiN5Oc");

  loadAll();

  var params = getURLParams();
  if (params.id) {
    loadOne(params.id);
  }

  var canvas = createCanvas(300, 300);
  canvas.parent('canvas');

  canvas.mousePressed(startDrawing);
  canvas.mouseReleased(endDrawing);
}

function startDrawing() {
  // Empty array
  points = [];
}

// Put points in the array
function mouseDragged() {
  var p = {
    x: mouseX,
    y: mouseY
  }
  points.push(p);
}

// Finished send data!
function endDrawing() {
  sendToParse();
}


function draw() {
  background(0);  
  noFill();
  stroke(255);
  strokeWeight(4);
  beginShape();
  for (var i = 0; i < points.length; i++) {
    vertex(points[i].x, points[i].y);
  }
  endShape();
}

function loadAll() {
  // What's the name of the object we're looking for
  var Path = Parse.Object.extend("Path");

  // Start a query
  var query = new Parse.Query(Path);

  // Need a success and error callback
  var callbacks = {
    // success callback is more complex, moving out of here
    success: gotAll,
    // Just log the error if it doesn't work
    error: function(error) {
      console.log(error);
    }    
  }

  // find() is how to ask for everything
  query.find(callbacks);
}

// The data comes back as an array 
function gotAll(data) {
  // Look at the data in the console 

  // Loop through array
  for (var i = 0; i < data.length; i++) {
    // The data for each record is in a property attributes
    // But here I'm just making a list with "id"
    addDrawing(data[i].id);
  }
}

function loadOne(id) {
  // What's the name of the object we're looking for
  var Path = Parse.Object.extend("Path");

  // Start a query
  var query = new Parse.Query(Path);

  // Need a success and error callback
  var callbacks = {
    // success callback is more complex, moving out of here
    success: gotOne,
    // Just log the error if it doesn't work
    error: function(object, error) {
      console.log(error);
    }
  }
  // get() is how to ask by id
  query.get(id, callbacks);
}

// The data comes back as an array 
function gotOne(data) {
  points = data.attributes.path;
}



// This is a function for sending data
function sendToParse() {

  // Has to be an object!
  var data = {
    path: points
  };

  // This is the name of the object "type"
  var Path = Parse.Object.extend("Path");
  // Make a new instance
  var path = new Path();
  // Save that data and a callback for when completed
  path.save(data).then(finished);

  // Reload the data for the page
  function finished(response) {
    console.log('Data saved successfully ' + response.id);
    // In the response is an id
    // We can use that id to make a "permalink" to this sketch
    addDrawing(response.id);

  }
}

function addDrawing(id) {
  var li = createElement('li','');
  var a1 = createA('#', id);
  loadDrawing(a1, id);
  var dash = createSpan(' — ');
  var a2 = createA('?id='+id, 'permalink');
  a1.parent(li);
  dash.parent(li);
  a2.parent(li);
  li.parent('drawings');
}

function loadDrawing(link, id) {
  link.mousePressed(requestDrawing);
  function requestDrawing() {
    loadOne(id);
  }
}


