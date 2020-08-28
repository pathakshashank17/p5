let time = 0;
let wave = [];
let div;
const size = 80;

// Create canvas
function setup() {
    createCanvas(1000, 600);
    slider = createSlider(1, 100, 3, 2);
    slider.position(380, 50);
    slider.style('width', '400px');
    div = createDiv(`Number of terms [${slider.value()}]:`);
    div.position(200, 50);
    div.style('color', 'white');
}

// Draws everything, loops over infinitely
function draw() {

    div.html(`<div>Number of terms [${slider.value()}]:`);

    background(0);
    translate(300, 300);

    let x = 0;
    let y = 0;

    for (let i = 0; i < slider.value(); i++) {
        let prevX = x, prevY = y;
        let n = 2 * i + 1;
        let radius = size * (4 / (n * PI));
        x += radius * cos(n * time);
        y += radius * sin(n * time);
        stroke(255, 70);
        noFill();
        ellipse(prevX, prevY, 2 * radius);
        stroke(255, 200);
        line(prevX, prevY, x, y);
    }

    wave.unshift(y);

    line(x, y, 400, wave[0]);
    fill(255);
    ellipse(400, wave[0], 10);
    noFill();

    translate(400, 0);
    
    stroke(0, 255, 0);
    beginShape();
    for (let i = 0; i < wave.length; i++) {
        vertex(i, wave[i]);
    }
    endShape();

    if (wave.length > 500) {
        wave.pop();
    }

    time -= 0.03;
}