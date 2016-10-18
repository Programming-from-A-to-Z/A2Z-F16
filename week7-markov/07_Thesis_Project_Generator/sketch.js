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

function setup() {
  noCanvas();

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



function generate() {
  // Generate a title
  var title = select('#title');
  title.html(titleMarkov.generate());

  // And a decription
  var description = select('#description');
  description.html(elevatorMarkov.generate());
}
