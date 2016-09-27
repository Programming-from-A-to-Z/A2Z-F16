// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

Walker w;

void setup() {
  size(640, 360);
  // Create a walker object
  w = new Walker();
  background(255);

  // Run the walker object
  for (int i = 0; i < 100000; i++) {
    w.step();
    w.render();
  }
  save("output.png");

  noLoop();
  exit();
}