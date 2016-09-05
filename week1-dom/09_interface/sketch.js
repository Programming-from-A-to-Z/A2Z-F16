// A2Z F16
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F16
// http://shiffman.net/a2z

var divs = [];
var slider;
var checkbox;
var dropdown;
var input;


function setup() {
  noCanvas();

  var divButton = createButton('make a div');
  divButton.mousePressed(makeDiv);

  slider = createSlider(1, 48, 12);

  checkbox = createCheckbox('red');
  dropdown = createSelect();
  dropdown.option('date');
  dropdown.option('random number');

  input = createInput('your name');

  var clearButton = createButton('clear');
  clearButton.mousePressed(function() {
    for (var i = 0; i < divs.length; i++) {
      divs[i].remove();
    }
  });
}

function makeDiv() {
  var div;

  if (dropdown.selected() === 'date') {
    div = createDiv(input.value() + ', this div was made at ' + Date());
  } else {
    div = createDiv(input.value() + ', here\'s a random number: ' + floor(random(100)));
  }
  div.style('font-size', slider.value() + 'pt');

  if (checkbox.checked()) {
    div.style('background-color', '#D00');
  }

  divs.push(div);
}

// function changeSize() {
//   for (var i = 0; i < divs.length; i++) {
//     divs[i].style('font-size', slider.value() + 'pt');
//   }
// }
