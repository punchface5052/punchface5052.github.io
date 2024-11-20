// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let monoColour = false;
let points = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  spawnPoint(width/2, height/2);
}

function draw() {
  background(0);
  for (let point of points){
    point.update(points);
  }
  for (let point of points){
    point.disp();
  }
  if(mouseIsPressed){
    spawnPoint(mouseX,mouseY);
  }
}

function mousePressed(){
  // spawnPoint(mouseX,mouseY);
}

function spawnPoint(x,y){
  let aPoint = new MovingPoint(x,y);
  points.push(aPoint);
}

class MovingPoint {
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.speed = 5;
    this.radius = 15;
    this.colour = color(random(255),random(255),random(255));
    this.xTime = random(1000);
    this.yTime = random(1000);
    this.dTime = 0.01;
    this.reach = 150;
    this.MIN_RADIUS = 15;
    this.MAX_RADIUS = 50;
  }
  disp() {
    noStroke();
    fill(this.colour);
    circle(this.x, this.y, this.radius * 2);
  }
  update(daPoints){
    this.move();
    this.wrapScreen();
    this.checkDist(daPoints);
    this.mouseDist();
  }
  move(){
    let dx = noise(this.xTime);
    let dy = noise(this.yTime);
    
    this.dx = map(dx, 0, 1, -this.speed, this.speed);
    this.dy = map(dy, 0, 1, -this.speed, this.speed);

    this.x += this.dx;
    this.y += this.dy;

    this.xTime += this.dTime;
    this.yTime += this.dTime;
  }
  wrapScreen() {
    if (this.x < 0){
      this.x = width;
    }

    if (this.x > width){
      this.x = 0;
    }
    
    if (this.y < 0){
      this.y = height;
    }

    if (this.y > height){
      this.y = 0;
    }
  }
  checkDist(pointsArray){
    for (let otherPoint of pointsArray){
      if(this !== otherPoint && dist(this.x, this.y, otherPoint.x, otherPoint.y)){
        stroke(this.colour);
        line(otherPoint.x,otherPoint.y,this.x,this.y);
      }
    }
  }
  mouseDist(){
    let mouseDistance = dist(mouseX,mouseY,this.x,this.y); 
    if (mouseDistance<this.reach){
      let size = map(mouseDistance,0,this.reach,this.MAX_RADIUS,this.MIN_RADIUS);
      this.radius = size;
    }
    else{
      this.radius = this.MIN_RADIUS;
    }
  }
  switchColour(){
    if()
  }
}

function keyPressed() {
  if (key === '1'){
    monoColour = "blue"
  }
}