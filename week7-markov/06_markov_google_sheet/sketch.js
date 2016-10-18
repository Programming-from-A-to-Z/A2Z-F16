// A2Z F16
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F16

// An array of lines from a text file
var lines;

// The Markov Generator object
var markov;

// Global variable to save the data from the sheet
var sheet;


function setup() {
  noCanvas();
  // The Markov Generator
  // First argument is N-gram length, second argument is max length of generated text
  markov = new MarkovGenerator(3, 100);

  // This is the URL for my google sheet
  // The sheet is generated from this form: http://goo.gl/forms/hwSX7MPMCP
  // The sheet must set to File --> Published for the Web
  var url = 'https://docs.google.com/spreadsheets/d/1z3RN9vPeVvWZSQVkzqI7m0FXqSI6dXAmY8HQi5NXqNo/pubhtml';

  // Tabletop expects some settings
  var settings = {
    key: url,            // The url of the published google sheet
    callback: gotData,   // A callback for when the data comes in
    simpleSheet: true    // This makes things simpler for just a single worksheet of rows
  }

  // Make the request
  Tabletop.init(settings);

  // The data comes back as an array of objects
  // Each object contains all the data for one row of the sheet
  // See comment above
  function gotData(data) {
    // Save the data to use it again later
    sheet = data;

    // Feed it into the markov generator
    for (var i = 0; i < data.length; i++) {
      markov.feed(data[i].name);
    }
  }

  // Set up a button
  var button = select('#button');
  button.mousePressed(generate);

  // This slider changes the "order" of the markov chain
  var slider = select('#slider');
  slider.input(changeOrder);

  // Regenerate the markov chain with new order value
  // whenver the slider is updated
  function changeOrder() {
    order = slider.value();
    // Update DOM element to show user changed value
    var span = select('#order');
    span.html(order);
    // Re-seed the markov chain
    markov = new MarkovGenerator(order, 100);
    for (var i = 0; i < sheet.length; i++) {
      markov.feed(sheet[i].name);
    }
  }


}


function generate() {
  // Display the generated text
  var output = select('#name');
  var text = markov.generate();
  output.html(text);
}
