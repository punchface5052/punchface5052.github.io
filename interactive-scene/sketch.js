// Interactive Scene
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(400, 400);
}

let mouseD = 50;
let charX = 50;
let charY = 50;
let charD = 100;
let speed = 5;
let time = 0;

function moveChar() {
  if (keyIsDown(87)) { //w
    charY -= speed;   
  }
  if (keyIsDown(83)) { //s
    charY += speed;   
  }
  if (keyIsDown(65)) { //a
    charX -= speed;   
  }
  if (keyIsDown(68)) { //d
    charX += speed;   
  }
  circle(charX, charY, charD);
}

function mouseDisp(){
  circle(mouseX,mouseY,mouseD)
}

// function attack(){
//   stroke(0)
//   if (mousePressed&&time===0){
//     line(charX,charY,mouseX,mouseY)
    
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  moveChar()
  mouseDisp()
  text("Cheese",windowWidth/2,windowHeight/2)
}