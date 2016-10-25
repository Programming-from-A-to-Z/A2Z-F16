// A2Z F15
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F15

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

function setup() {
  noCanvas();

  // Start parse
  // See: https://parse.com/apps/quickstart
  Parse.initialize("63MFKUwjDE4syXL3vr3hFJw6Ic5brmF7VfHbJgti", 
    "P9eoSLPUbdkVLr60iYHd58iD4Jje2fgrFXHiN5Oc");

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
      elevator = elevator.replace(/&lt;/g,'<');
      elevator = elevator.replace(/&gt;/g,'>');
      elevator = elevator.replace(/&.*?;/g,'');
      elevator = elevator.replace(/<.*?>/g,'');
      // Feed in elevator pitches
      elevatorMarkov.feed(elevator);
    }
  }
}

function loadThesis(id) {
  // What's the name of the object we're looking for
  var Thesis = Parse.Object.extend("Thesis");

  // Start a query
  var query = new Parse.Query(Thesis);

  // Need a success and error callback
  var callbacks = {
    // success callback is more complex, moving out of here
    success: gotThesis,
    // Just log the error if it doesn't work
    error: function(object, error) {
      console.log(error);
    }
  }
  // get() is how to ask by id
  query.get(id, callbacks);
}

// The data comes back as an array 
function gotThesis(data) {

  // Generate a title
  var title = select('#title');
  title.html(data.attributes.title);

  // And a decription
  var description = select('#description');
  description.html(data.attributes.description);

  // In the response is an id
  // We can use that id to make a "permalink" to this sketch
  var a = createA('?id='+data.id, 'permalink');
  a.id('perma');
  a.parent('permalink');
}

function saveThesis() {
  // Has to be an object!
  var data = {
    title: thesisTitle,
    description: thesisElevator
  };

  // This is the name of the object "type"
  var Thesis = Parse.Object.extend("Thesis");
  // Make a new instance
  var thesis = new Thesis();
  // Save that data and a callback for when completed
  thesis.save(data).then(finished);

  // Reload the data for the page
  function finished(response) {
    console.log('Data saved successfully ' + response.id);

    var previous = select('#perma');
    if (previous) {
      previous.remove();
    }

    // In the response is an id
    // We can use that id to make a "permalink" to this sketch
    var a = createA('?id='+response.id, 'permalink');
    a.id('perma');
    a.parent('permalink');
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
