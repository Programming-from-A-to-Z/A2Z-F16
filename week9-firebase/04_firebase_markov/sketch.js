// A2Z F16
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F16

// Venue IDs
// 108-131
// 4 8 31 44 48 60 73 81 89 101 107 96

var venues = [4, 8, 31, 44, 48, 60, 73, 81, 89, 101, 107, 96];

// An array of lines from a text file
var lines;

// Two generators, one for titles one for elevator pitches
var titleMarkov;
var elevatorMarkov;

var thesisTitle;
var thesisElevator;

var permabutton;

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
    loadThesis(params.id);
  }

  // The Markov Generator
  // First argument is N-gram length, second argument is max length of generated text
  titleMarkov = new MarkovGenerator(3, 40);
  elevatorMarkov = new MarkovGenerator(6, 1000);

  // Grab data from the APIs
  for (var i = 108; i < 132; i++) {
    var url = 'https://itp.nyu.edu/projects/public/projectsJSON.php?venue_id=' + i;
    loadJSON(url, process)
  }

  for (var i = 0; i < venues.length; i++) {
    var url = 'https://itp.nyu.edu/projects/public/projectsJSON.php?venue_id=' + venues[i];
    loadJSON(url, process)
  }

  // Set up a button
  var button = select('#button');
  button.mousePressed(generate);

  permabutton = select('#getperma');
  permabutton.mousePressed(saveThesis);

}

function process(data) {
  //console.log(data);
  for (var i = 0; i < data.length; i++) {
    // Feed in project names
    titleMarkov.feed(data[i].project_name);

    var elevator = data[i].elevator_pitch;
    // Not all the data has elevator pitches
    if (elevator) {
      // Doing some cleanup to get rid of nonsense text
      // This is a somewhat terrible job
      elevator = elevator.replace(/&lt;/g, '<');
      elevator = elevator.replace(/&gt;/g, '>');
      elevator = elevator.replace(/&.*?;/g, '');
      elevator = elevator.replace(/<.*?>/g, '');
      // Feed in elevator pitches
      elevatorMarkov.feed(elevator);
    }
  }
}

function loadThesis(id) {
  var ref = database.ref("theses/" + id);
  ref.on("value", gotThesis, errData);

  function errData(error) {
    console.log("Something went wrong.");
    console.log(error);
  }

  // The data comes back as an array
  function gotThesis(data) {
    var thesis = data.val();

    // Generate a title
    var title = select('#title');
    title.html(thesis.title);

    // And a decription
    var description = select('#description');
    description.html(thesis.description);

    // In the response is an id
    // We can use that id to make a "permalink" to this sketch
    var a = createA('?id=' + id, 'permalink');
    a.id('perma');
    a.parent('permalink');
  }
}

function saveThesis() {
  // Has to be an object!
  var data = {
    title: thesisTitle,
    description: thesisElevator
  };

  var theses = database.ref('theses');
  var thesis = theses.push(data, finished);
  console.log("Firebase generated key: " + thesis.key);

  // Reload the data for the page
  function finished(err) {
    if (err) {
      console.log("ooops, something went wrong.");
      console.log(err);
    } else {
      console.log('Data saved successfully');
      var previous = select('#perma');
      if (previous) {
        previous.remove();
      }

      // In the response is an id
      // We can use that id to make a "permalink" to this sketch
      var a = createA('?id=' + thesis.key, 'permalink');
      a.id('perma');
      a.parent('permalink');
    }
  }
}



function generate() {

  // Clear permalink
  var previous = select('#perma');
  if (previous) {
    previous.remove();
  }

  // Generate a title
  var title = select('#title');
  thesisTitle = titleMarkov.generate();
  title.html(thesisTitle);

  // And a decription
  var description = select('#description');
  thesisElevator = elevatorMarkov.generate();
  description.html(thesisElevator);

  permabutton.show();
}
