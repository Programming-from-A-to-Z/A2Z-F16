// A2Z F16
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F16

// This is the content script for the extension

console.log("Chrome extension is running!");


// Look for a "mouse up event"
document.addEventListener('mouseup', selectedText);

// Handle the mouse up event
function selectedText(event) {
  // See what text has been selected by the user
  var selected = window.getSelection().toString();

  // Make sure something actually was selected
  if (selected.length > 0) {
    // Send the message to the background script
    // Can't be sent to the pop-up as the pop-up might
    // not be open
    chrome.runtime.sendMessage({ "word": selected });
  }
}
