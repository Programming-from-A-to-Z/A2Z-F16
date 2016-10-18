// A2Z F15
// Daniel Shiffman
// https://github.com/shiffman/

// Arrays of words to be used in replacing
var four = ["text", "golf", "rain"];
var five = ["hello", "shirt", "plush"];

// Here is where we are working with a regex
function process(txt) {
  
  // The second argument is a function
  var output = txt.replace(/\b[a-z]{3,5}\b/gi, replacer);

  // Whatever that function returns will be used to replace
  // the matched text.  The matched text is available as
  // a parameter.  If there were also captured groups, there 
  // would be additional parameters.
  function replacer(match) {
    var len = match.length;

    // This is completely arbitrary but just demonstrating
    // you can make up your own logic
    if (len == 3) {
      // Make the word upper case
      return match.toUpperCase();
    } else if (len == 4) {
      // Pick a random word from the array
      var index = floor(random(0, four.length));
      return four[index];
    } else if (len == 5) {
      // Pick a random word from the array
      var index = floor(random(0, five.length));
      return five[index]; 
    } 

  }

  // Show what happened
  var par1 = select('#results');
  par1.html(output);
  par1.class('text');



}


/***************************************************/
/* Everything below just handles the text input ****/
/***************************************************/


function setup() {

  noCanvas();

  // Selecting the text field and button
  input = select('#textinput');
  button = select('#submit');
  // What to do when button pressed
  button.mousePressed(handleInput);

  loadStrings('files/rainbow.txt', fileLoaded);

  regexInput = select('#regex');
  globalCheck = select('#global');
  caseCheck = select('#case');
}


// When the file is loaded
function fileLoaded(data) {
  var txt = data.join('\n');
  input.html(txt);
}

// Handle the text input field
function handleInput() {
  process(input.value());
}