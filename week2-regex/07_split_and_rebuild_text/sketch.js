// A2Z F15
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F15



// Here is where we are working with a regex
function process(txt) {
  
  // split by any sequence of "non word" characters
  // The parentheses mean that the delimiters will be retained
  var delimiter = /(\W+)/;
  var tokens = txt.split(delimiter);

  // This is silly, but I'm just replacing
  // five letter words.
  for (var i = 0; i < tokens.length; i++) {
    // Match any 5 letter words and change the token 
    // to something else
    var regex = /^[a-z]{5}$/i;
    if (regex.test(tokens[i])) {
      tokens[i] = "$#@$&!";
    }
  }

  // This is how to make everything back to one big paragraph with join()
  var output = tokens.join('');  
  var par1 = createP(output);
  par1.class('text');


  // Now let's do this again and have each token be its own div
  var par2 = createP('');
  par2.class('text');

  var tokens = txt.split(delimiter);
  for (var i = 0; i < tokens.length; i++) {
    // Make a div for each token
    var div = createDiv(tokens[i]);
    div.parent(par2);
    div.style('display', 'inline');
    // Check if it's a five letter word and highlight it
    var regex = /^[a-z]{5}$/i;
    if (regex.test(tokens[i])) {
      div.style('background-color', '#F5C');
    }
  }

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