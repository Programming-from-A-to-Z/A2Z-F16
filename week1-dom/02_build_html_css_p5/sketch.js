// A2Z F16
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F16
// http://shiffman.net/a2z

function setup() {
  noCanvas();

  createElement('h1','Welcome to this page.');

  var p1 = createP('This is a paragraph, the CSS class is apple.');
  p1.class('apple');

  var p2 = createP('This is a paragraph, the CSS class is pear.');
  p2.class('pear');

  var p3 = createP('This is another paragraph, the CSS class is also apple.');
  p3.class('apple');

  var p4 = createP('This is another paragraph, the CSS class is also apple, but now there is also an id set to orange.');
  p4.class('apple');
  p4.id('orange');

}
