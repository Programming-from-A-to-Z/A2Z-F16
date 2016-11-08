// A2Z F16
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F16

// This is the background script for the extension

// A listener for when the user clicks on the extension button
chrome.browserAction.onClicked.addListener(buttonClicked);

// Handle that click
function buttonClicked(tab) {
  // Send a message to the active tab
  console.log("button clicked!");

  // Send a message to the tab that is open when button was clicked
  chrome.tabs.sendMessage(tab.id, {"message": "browser action"});
}

// Listening for messages
chrome.runtime.onMessage.addListener(receiver);

function receiver(request, sender, sendResponse) {
  if (request.message === "thank you") {
    // Not doing anything for messages received but I could!
  }
}
