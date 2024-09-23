// Image Demo
// Sept. 23, 2024

let steve;

function preload(){
  steve = loadImage("Steve.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  image(steve,mouseX-250,mouseY-250,500,500)
  text("I... am Steve",mouseX-50,mouseY-250)
}
