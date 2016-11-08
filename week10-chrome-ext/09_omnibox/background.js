// A2Z F16
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F16

// This is the background script for the extension

// You can trigger actions based on what a user types in the "omnibox"
// The "omnibox" is the address bar

// Add a listener for the omnibox
// The keyword that will trigger this event is set in manifest.json
// "omnibox": {
//   "keyword": "a2z"
// }
chrome.omnibox.onInputChanged.addListener(omniInput);

// The text is what the user types
// Here you can set some suggestions to help the user know
// what commands can follow
function omniInput(text, suggest) {
  var suggestions = [
    {content: text + " apple", description: "say for apple also"},
    {content: text + " pear", description: "say for pear also"}
  ];
  suggest(suggestions);
}

// This event is fired when the user hits "enter"
chrome.omnibox.onInputEntered.addListener(omniChanged);

// You can do anything here, this example is speaking the text
function omniChanged(text) {
  chrome.tts.speak(text);
}
