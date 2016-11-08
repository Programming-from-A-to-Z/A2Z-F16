// A2Z F16
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F16

// This is the content script for the extension

// Things are happening
console.log("Page action chrome extension is running!");

// A message to show the page action
// Here I could add some logic to only show it if the page
// contains certain content or meets some other criteria
chrome.runtime.sendMessage({ "message": "show_page_action" });
