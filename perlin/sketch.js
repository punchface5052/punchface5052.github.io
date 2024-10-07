// Perlin Noise Ball Demo (Random+ pro max ultra super)
// Oct. 7 2024

let x;
let y;
let d = 50;
let time = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width/2;
  y = height/2;
}

function draw() {
  background(220);


  x = noise(time)*width;
  y = noise(time+1500)*height;
  circle(x,y,d);

  time+=0.05;
}
