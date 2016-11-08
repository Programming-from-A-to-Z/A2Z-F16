// A2Z F16
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F16

// This code runs when the pop up opens

function setup() {
  noCanvas();

  // Look for a text field and slider
  var col = select('#color');
  col.input(sendMessage);
  var slider = select('#size');
  slider.input(sendMessage);

  // Whenever those interface elements change
  // A message is sent to the content script
  function sendMessage() {
    // Messages are just objects
    var msg = {
      from: 'popup',
      color: col.value(),
      size: slider.value()
    }

    // A tab has be selected for the message to be sent
    var params = {
      active: true,
      currentWindow: true
    }
    // This searches for the active tabs in the current window
    chrome.tabs.query(params, gotTabs);

    // Now we've got the tabs
    function gotTabs(tabs) {
      // The first tab is the one you are on
      chrome.tabs.sendMessage(tabs[0].id, msg);//, messageBack);
    }
  }
}
