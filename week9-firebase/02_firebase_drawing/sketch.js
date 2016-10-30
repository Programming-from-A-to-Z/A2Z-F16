// A2Z F15
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F15

// Get input from user
var points = [];

// Keep list of DOM elements for clearing later when reloading
var listItems = [];

var database;

function setup() {

  // Start parse
  // See: https://parse.com/apps/quickstart
  var config = {
    apiKey: "AIzaSyA-VyZJOZVqXZj82wvVMkfJedDEhqXcIh8",
    authDomain: "a2zitp-6519b.firebaseapp.com",
    databaseURL: "https://a2zitp-6519b.firebaseio.com",
    storageBucket: "a2zitp-6519b.appspot.com",
    messagingSenderId: "363965061200"
  };
  firebase.initializeApp(config);
  database = firebase.database();

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
  sendFirebase();
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

function clearList() {
  for (var i = 0; i < listItems.length; i++) {
    listItems[i].remove();
  }
}

function loadAll() {
  var ref = database.ref("drawings");
  ref.on("value", gotAll, errData);
  // The data comes back as an object

  function gotAll(data) {
    var drawings = data.val();
    // Grab all the keys to iterate over the object
    var keys = Object.keys(drawings);
    // Loop through array
    clearList();
    for (var i = 0; i < keys.length; i++) {
      // The data for each record is in a property attributes
      // But here I'm just making a list with "id"
      addDrawing(keys[i]);
    }
  }

  function errData(error) {
    console.log("Something went wrong.");
    console.log(error);
  }
}


function loadOne(id) {
  var ref = database.ref("drawings/" + id);
  ref.on("value", gotOne, errData);

  function errData(error) {
    console.log("Something went wrong.");
    console.log(error);
  }

  function gotOne(data) {
    points = data.val().path;
  }
}


// This is a function for sending data
function sendFirebase() {

  var drawings = database.ref('drawings');

  // Has to be an object!
  var data = {
    path: points
  };

  var drawing = drawings.push(data, finished);
  console.log("Firebase generated key: " + drawing.key);

  // Reload the data for the page
  function finished(err) {
    if (err) {
      console.log("ooops, something went wrong.");
      console.log(err);
    } else {
      console.log('Data saved successfully');
      // We can use the keys to make a "permalink" to this sketch
      //addDrawing(drawing.key);
    }
  }
}

function addDrawing(id) {
  var li = createElement('li', '');
  var a1 = createA('#', id);
  loadDrawing(a1, id);
  var dash = createSpan(' — ');
  var a2 = createA('?id=' + id, 'permalink');
  a1.parent(li);
  dash.parent(li);
  a2.parent(li);
  li.parent('drawings');
  listItems.push(li);
  console.log('adding ' + id);
}

function loadDrawing(link, id) {
  link.mousePressed(requestDrawing);

  function requestDrawing() {
    loadOne(id);
  }
}
