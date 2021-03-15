// Shashank Pathak

// Implementation of Monte Carlo method of calculating π

// What this does is draw a bunch of random points on the canvas
// and count the number of points falling inside the circle.
// The ratio of the number points inside the circle with the total number of points
// is equal to the ratio of the area of circle with the area of the canvas i.e π / 4

const width = 500;
const height = width;
let slider;
let pi = 0;
let points = 5000;
let itrs = 1;
let inCircle = 0;
let X = [];
let Y = [];

function setup() {
  createCanvas(width, height);
  slider = createSlider(100, 25000, points, 100);
  slider.position(750, 50);
  slider.style('width', '400px');
  div = createDiv(`Number of points [${slider.value()}]:`);
  div.position(550, 50);
  div.style('color', 'white');
  init();
}

function init() {
  pi = 0;
  itrs = 1;
  inCircle = 0;
  X = [];
  Y = [];
}

function draw() {
  background("black");
  div.html(`<div>Number of points [${slider.value()}]:`);

  // Take data from slider
  let newPoints = slider.value();
  if (points !== newPoints) {
    points = newPoints;
    init();
  }

  // Draw the circle
  stroke("white");
  noFill();
  circle(width / 2, height / 2, width);

  // Main ingredient
  for (let i = 0; i <= 500; i++) {
    if (itrs <= points) {
      let randX = random(width),
        randY = random(height);
      X.push(randX);
      Y.push(randY);

      // If the random point lies within circle, inCircle++
      if (Math.pow(randX - width / 2, 2) + Math.pow(randY - height / 2, 2) <= width * width / 4) {
        inCircle++;
      }
      itrs++;
    }
  }

  // Draw all the previous points
  for (var i = 0; i < X.length; i++) {
    if (Math.pow(X[i] - width / 2, 2) + Math.pow(Y[i] - height / 2, 2) <= width * width / 4) {
      stroke("red");
    } else {
      stroke("yellow");
    }
    circle(X[i], Y[i], 1);
  }

  // Refresh the value of π & display it
  pi = 4 * (inCircle / points);
  textSize(26);
  fill("white");
  text(`π = ${pi}`, 10, 30);
}