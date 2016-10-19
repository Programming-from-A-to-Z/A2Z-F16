function setup() {
    createCanvas(100, 100);
    for (var i = 0; i < 10000; i++) {
        setSpanTime(i);
    }
}

function setSpanTime(val) {
    setTimeout(makeSpan, val * 1);

    function makeSpan() {
        var span = createSpan(val + " ");
        span.mouseOver(highlight);
    }
}

function highlight() {
  this.style('background-color', "#AAA");
}

function draw() {
    background(0);
    stroke(255);
    line(frameCount % width, 0, frameCount % width, height);
}
