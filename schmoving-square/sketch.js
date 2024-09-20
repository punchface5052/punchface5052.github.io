// Schmoving Square
// Liam Thorpe
// Sept. 19, 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let x = 0;
let y = 0;
let squareSize = 50;
let speed = 5;
let state = "right";

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  moveSquare();
  displaySquare();
}

function moveSquare() {
  if (state === "right") {
    x += speed;
    if (x >= width - squareSize) {
      state = "down";
    }
  }
  
  if (state === "down") {
    y += speed;
    if (y >= height - squareSize) {
      state = "left";
    }
  }
  
  if (state === "left") {
    x -= speed;
    if (x <= 0) {
      state = "up";
    }
  }
  
  if (state === "up") {
    y -= speed;
    if (y <= 0) {
      state = "right";
    }
  }
}

function displaySquare() {
  fill(0);
  square(x, y, squareSize);
}