// Daniel Shiffman
// Programming from A to Z, Fall 2014
// https://github.com/shiffman/Programming-from-A-to-Z-F14

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

  // httpPost(baseUrl + 'token', data, success);
  // function success(response) {
  //   console.log(response);
  //   accessToken = response;
  //   askClarifai();
  // }

  $.ajax(
  {
    'type': 'POST',
    'url': baseUrl + 'token',
    'data': data,
    success: function (response) {
      console.log(response);
      accessToken = response;
      askClarifai();
    },
    error: function (err) {
      console.log(err);
    }
  });


}

function askClarifai() {
  $.ajax({
    url: 'https://api.clarifai.com/v1/tag/',
    type: 'GET',
    beforeSend: function(xhr) {
      xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken.access_token);
    },
    data: {
      url: 'http://shiffman.net/images/dan_shiffman.jpeg'
    },
    success: function (response) {
      console.log(response);
    },
    error: function (err) {
      console.log(err);
    },
  });
}
