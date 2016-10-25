
var count = 0;

function setup() {
  noCanvas();
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA-VyZJOZVqXZj82wvVMkfJedDEhqXcIh8",
    authDomain: "a2zitp-6519b.firebaseapp.com",
    databaseURL: "https://a2zitp-6519b.firebaseio.com",
    storageBucket: "a2zitp-6519b.appspot.com",
    messagingSenderId: "363965061200"
  };
  firebase.initializeApp(config);
  var database = firebase.database();

  var s = createInput('test');
  var b = createButton('submit');

  b.mousePressed(saveData);

  function saveData() {
    var data = {
      word: s.value()
    }
    firebase.database().ref('phrases/'+count).set(data);
    count++;
  }

}
