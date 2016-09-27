// A2Z F16
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F16

// Create an Twitter object to connect to Twitter API
// npm install twit
var Twit = require('twit');
// Pulling all my twitter account info from another file
var config = require('./config.js');
// Making a Twit object for connection to the API
var T = new Twit(config);

// File system
var fs = require('fs');
// Request for downloading files
var request = require('request');

// Require child_process for triggering script for Processing
var exec = require('child_process').exec;

// Start a streem to listen to tweets
var stream = T.stream('user');
stream.on('tweet', tweetEvent);

// Ok a tweet has happend
function tweetEvent(tweet) {

  // What's the deal with this tweet?
  var reply_to = tweet.in_reply_to_screen_name;
  var name = tweet.user.screen_name;
  var txt = tweet.text;
  var media = tweet.entities.media;
  var id = tweet.id_str;

  // Is it a reply to me?
  if (reply_to === 'a2zitp') {
    // If there's no image let the tweeter know
    if (media === undefined) {
      var reply = '@' + name + ' I need an image to do something!';
      T.post('statuses/update', {
        status: reply,
        in_reply_to_status_id: id
      }, tweeted);
      // If there is an image, download it!
    } else if (media.length > 0) {
      var img = media[0].media_url;
      downloadFile(img, 'media');
    }
  }

  // Deal with downloading
  function downloadFile(url, filename) {

    console.log('Attemping to download url: ' + url + ' to ' + filename);
    // Make the request
    request.head(url, downloaded);

    // Here's the callback for when it is done
    function downloaded(err, res, body) {

      // Look at what it is
      var type = res.headers['content-type'];

      // Figure out what file extension it should have
      var i = type.indexOf('/');
      var ext = type.substring(i + 1, type.length);
      filename = filename + '.' + ext;

      // Now save it to disk with that filename
      // Put it in the Processing folder
      request(url).pipe(fs.createWriteStream('pointillize/' + filename)).on('close', filed);

      // Ok it's saved to disk
      function filed() {

        // Here is the command to run the Processing sketch
        // You need to have Processing command line installed
        // See: https://github.com/processing/processing/wiki/Command-Line
        var cmd = 'processing-java --sketch=`pwd`/pointillize/ --run ' + filename;
        exec(cmd, processing);

        // Callback for command line process
        function processing(error, stdout, stderr) {

          // I could do some error checking here
          console.log(stdout);

          // Read the file made by Processing
          var b64content = fs.readFileSync('pointillize/output.png', {
            encoding: 'base64'
          })

          // Upload the media
          T.post('media/upload', {
            media_data: b64content
          }, uploaded);

          function uploaded(err, data, response) {
            // Now we can reference the media and post a tweet
            // with the media attached
            var mediaIdStr = data.media_id_string;
            var params = {
                status: '.@' + name + ' #pointillize',
                in_reply_to_status_id: id,
                media_ids: [mediaIdStr]
              }
              // Post tweet
            T.post('statuses/update', params, tweeted);
          };
        }
      }
    }
  }
}

function tweeted(err, success) {
  if (err !== undefined) {
    console.log(err);
  } else {
    console.log('Tweeted: ' + success.text);
  }
}
