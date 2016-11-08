// A2Z F16
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F16

// This is the background script for the extension

// Demonstrating the Alarms API
// https://developer.chrome.com/extensions/alarms

// "onInstalled" is an event that fires only once
// When the extension is installed (or re-loaded)
chrome.runtime.onInstalled.addListener(scheduleAlarm);

// This function will schedule the alarm and so this extension
// sets up an alarm the minute you install it
function scheduleAlarm() {
  var params = {
    delayInMinutes: 0.1,
    periodInMinutes: 0.1
  }
  chrome.alarms.create("A2Z", params);
}

// Now add a function for when the alarm is triggered
chrome.alarms.onAlarm.addListener(alarmEvent);

// What to do when the alarm is triggered
function alarmEvent(alarm) {
  alert("Got an alarm!");
  // There is metadata associated with the alarm
  console.log(alarm);
}
