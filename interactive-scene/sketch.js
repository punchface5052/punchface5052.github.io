// Interactive Scene
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
}
let arrowX;
let arrowY;
let 
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
}

function charDisp(){
  circle(charX, charY, charD);
  arrowX = charX+1/2*d;
  arrowY = charY;
  leftAngle = atan2(mouseY - arrowY, mouseX - arrowX);
  translate(arrowX, arrowY);
  fill(255);
  ellipse(0, 0, 50, 50);
  rotate(leftAngle);
  fill(0);
  ellipse(d*1.25, 0, 25, 25);
}

function mouseDisp(){
  circle(mouseX,mouseY,mouseD)
}

// function attack(){
//   stroke(0)
//   if (mousePressed&&time===0){
//     line(charX,charY,mouseX,mouseY)


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  moveChar();
  charDisp();
  mouseDisp();
  text("Cheese",windowWidth/2,windowHeight/2);
}