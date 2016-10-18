// Array.prototype.unicorn = function() {
//   console.log("I am not a unicorn, I am an array");
// }

Array.prototype.choice = function() {
  var i = floor(random(this.length));
  return this[i];
}

var arr;

function setup() {
  noCanvas();

  arr = [4,5,6,1,2,3];
  console.log(arr);
  arr.sort();
  console.log(arr);

  //arr.unicorn();

}
