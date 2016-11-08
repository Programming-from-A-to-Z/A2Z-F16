// A2Z F16
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F16

// This is the content script for the extension

// It only runs on github.com as indicated in manifest.json
// "content_scripts": [
//   {
//     "matches": [
//       "http://github.com/*",
//       "https://github.com/*"
//     ],
//     "js": ["content.js"]
//   }
// ],


// Look for all elements that are an "avatar" or "gravatar"
var avatars = document.getElementsByClassName('avatar');
var gravatars = document.getElementsByClassName('gravatar');

// Call swapImg() for all of these DOM elements
for (var i = 0; i < avatars.length; i++) {
  swapImg(avatars[i]);
}

for (var j = 0; j < gravatars.length; j++) {
  swapImg(gravatars[j]);
}

// Change the image to a file that is part of this extension
// The file must be made available in manifest.json
//   "web_accessible_resources": [
//      "images/rainbow.png"
// ]
function swapImg(img) {
  var newimg = chrome.extension.getURL("images/rainbow.png");
  img.src = newimg;
}

// Look for a "repository" description
var descriptions = document.getElementsByClassName('repository-description');

// This is just a silly algorithm that reverses the text
for (var k = 0; k < descriptions.length; k++) {
  // Look at the text
  var txt = descriptions[k].innerHTML;
  // Split it up
  var words = txt.split(/\s+/);
  // Reverse the array
  words = words.reverse();
  // Join it back together
  txt = words.join(' ');
  // Set the new text and change the background-color
  descriptions[k].innerHTML = txt;
  descriptions[k].style['background-color'] = '#F0C';
}
