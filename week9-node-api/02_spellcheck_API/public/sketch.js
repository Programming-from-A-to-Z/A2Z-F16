// A2Z F15
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F15

function setup() {
  noCanvas();

  // Get a word from user
  var wordinput = select('#word');
  // Check spelling suggestions anytime the user types
  wordinput.input(spellcheck);

  // Is it correct or incorrect?
  var statusElt = select('#status');

  // Spelling suggestions if incorrect
  var suggestions = select('#suggestions');

  function spellcheck() {
    var word = wordinput.value();

    // Make sure the user actually typed a word
    if (word.length > 0) {
      // Query the API
      var url = "/spellcheck/" + wordinput.value();
      loadJSON(url, checked);
    }

    // Get data back from the api
    function checked(data) {
      // Update correct or incorrect
      statusElt.html(data.status);
      if (data.status == 'incorrect') {
        if (data.suggestions.length === 0) {
          suggestions.html('no suggestions');
        } else {
          // If it's incorrect, show suggestions
          suggestions.html(data.suggestions.join(' '));
        }
      } else {
        // Otherwise nothing
        suggestions.html('');
      }
    }
  }
  
}