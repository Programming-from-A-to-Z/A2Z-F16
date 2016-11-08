// A2Z F16
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F16

// This is the content script for the extension
// Note there is also a content.css file

// Grab the entire document body
// This gets an array even though it's likely just one thing
var everything = document.getElementsByTagName("body");

for (var i = 0; i < everything.length; i++) {
  // Look at the full content
  var txt = everything[i].innerHTML;
  //var s = "test the <img the> the";

  // This is a way of splitting up by tags.
  var tokens = txt.split(/(<.*?>)/);
  for (var j = 0; j < tokens.length; j++) {
    // Ignore anything that is a tag
    if (tokens[j].charAt(0) !== '<') {
      // Now replace the word "the" with "the" spanned with the class "redact"
      tokens[j] = tokens[j].replace(/\bthe\b/gi,'<span class="redact">the</span>');
    }
  }
  // Put everything back in
  everything[i].innerHTML = tokens.join('');
}
