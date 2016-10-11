// A2Z F16
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F16


var url = 'http://cdn3-www.cattime.com/assets/uploads/2011/08/best-kitten-names-1.jpg';

var fs = require('fs');
var request = require('request');

download(url, 'kitten.jpg');

function download(url, filename) {
  request.head(url, downloading);

  function downloading(err, res, body) {
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);
    request(url).pipe(fs.createWriteStream(filename)).on('close', finished);
  }

  function finished() {
    console.log('downloaded to: ' + filename);
    // This is where you could upload the image to twitter and post a tweet
  }
}
