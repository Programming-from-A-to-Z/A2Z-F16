


function countIt(value, when) {
  setTimeout(count, when);
  function count() {
    createP(value);
  }
}

// function highlight() {
//   this.style('background-color','#AAA');
// }

function highlighter(elt) {
  var a = 10;
  var b = 100;
  var c = 20;
  elt.mouseOver(highlight);
  function highlight() {
    console.log(a);
    elt.style('background-color','#AAA');
  }
}



function setup() {
  noCanvas();

  var p = createP("Look at this.");
  p.attribute('contenteditable', 'true');

  var p1 = createP("test1");
  var p2 = createP("test2");
  highlighter(p1);
  highlighter(p2);

  //p1.mouseOver(highlight);
  //p2.mouseOver(highlight);


  for (var i = 0; i < 10; i++) {
    var p = createP(i + "hello" + random(100));
    highlighter(p);
    //countIt(i, i*500);
    // setTimeout(count, i*500);
    // function count() {
    //   createP(i);
    // }
  }

  // setInterval(count, 250);
}

// var counter = 0;
// function count() {
//   createP(counter);
//   counter++;
// }
