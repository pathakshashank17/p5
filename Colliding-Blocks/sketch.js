// Shashank Pathak
// This sketch attempts to calculate PI using number of collisions (elastic) between a system of two blocks and a wall. 
// References
//   1. Dan Shiffman (Coding Train) - https://www.youtube.com/watch?v=PoW8g67XNxA
//   2. Grant Sanderson (3b1b) - https://www.youtube.com/watch?v=HEfHFsfGXjs

let b1, b2;
let collisions = 0;
let timeStep = 1000000;
let digits;
let count, digitSlider;

function restart() {
  collisions = 0;
  digits = digitSlider.value();
  b1.x = 25;
  b1.v = 0;
  b2.x = 400;
  b2.v = -1/timeStep;
  b2.m = pow(100, digits - 1);
}

function preload() {
  clack = loadSound('clack.wav');
}

function setup() {
  createCanvas(600, 400);
  
  digitSlider = createSlider(1, 5, 3, 1);
  digits = digitSlider.value();
  
  b1 = new Block(25, 50, 1, 0);
  b2 = new Block(200, 100, pow(100, digits - 1), -1/timeStep);
  
  count = createDiv(`First ${digits} digit(s) of PI = ` + collisions);
  count.position(10, 10);
  count.style('font-size', '32px');
}

function draw() {
  if (digitSlider.value() != digits) {
    restart();
  }
  
  background(220);
  for (let i = 0; i < timeStep; i++) {
    // Inter Block Collision
    if (b1.doesCollideWith(b2)) {
      let v1 = b1.collide(b2);
      let v2 = b2.collide(b1);
      
      b1.v = v1;
      b2.v = v2;
      collisions++;
      clack.play();
    }
    
    // Collision With Wall
    if (b1.hitWall()) {
      b1.reverse();
      collisions++;
      clack.play();
    }
    
    // Update positions
    b1.update();
    b2.update();
  }
  
  b1.show();
  b2.show();
  
  count.html(`First ${digits} digit(s) of PI = ` + collisions);
}