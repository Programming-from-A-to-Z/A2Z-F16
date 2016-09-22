// A2Z F16
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F16
// http://shiffman.net/a2z

var clientID = '9XnrhLXdHu1Dg0TSrK6dImCv-7VzCyhNRKJcl86E';
var clientSecret = 'hIqUOlreTW0Zlm0rcPR-v9hkfu1oJo9dmbmR3fDK';
var baseUrl = 'https://api.clarifai.com/v1/';

var accessToken;

function setup() {
  noCanvas();

  var data = {
    'grant_type': 'client_credentials',
    'client_id': clientID,
    'client_secret': clientSecret
  }

  // get authorization token and call askClarifai() on success
  httpPost(baseUrl + 'token', data, "json", success_token, error);

}

function askClarifai() {
  var data = {
    access_token : accessToken.access_token,
    url: 'http://shiffman.net/images/dan_shiffman.jpeg'
  }

  httpGet(baseUrl + 'tag', data, "json", success_tag, error);
}

function success_token (response) {
  console.log("success_token");
  console.log(response);
  accessToken = response;
  askClarifai();
}

function success_tag (response) {
  console.log("success_tag");
  console.log(response);
  results = response["results"];
  tags = results["0"].result.tag.classes
  for (var i = 0; i < tags.length; i++) {
    createP(tags[i]);
  }
}

function error (response) {
  console.log("error");
  console.log(response);
}
