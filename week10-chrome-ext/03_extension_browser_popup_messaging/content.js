// A2Z F15
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F15

// This is the content script for the extension


console.log("Chrome extension is running!");

// Listen for messages
chrome.runtime.onMessage.addListener(receiver);

// A message is received
function receiver(request, sender, sendResponse) {

  // Grab every single DOM element
  var elts = document.getElementsByTagName('*');

  // Change the background color and font-size
  // according to the message
  for (var i = 0; i < elts.length; i++) {
    elts[i].style['background-color'] = request.color;
    elts[i].style['font-size'] = request.size + '%';
  }

}
