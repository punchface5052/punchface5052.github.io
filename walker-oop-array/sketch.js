// Walker OOP Array Demo
// 11/13/2024

class Walker {
  constructor(x,y,c) {
    this.x = x;
    this.y = y;
    this.s = 7;
    this.r = 3;
    this.c = c;
  }

  disp(){
    fill(this.c);
    circle(this.x,this.y,this.r*2);
  }

  move(){
    let choice = random();
    if (choice<0.25){
      this.y-=this.s;
    }
    else if (choice<0.50){
      this.y+=this.s;
    }
    else if (choice<0.75){
      this.x-=this.s;
    }
    else {
      this.x+=this.s;
    }
  }
}

let nerdArray = [];

function setup() {
  noStroke();
  createCanvas(windowWidth, windowHeight);  
  let nerd = new Walker(width/2,height/2, "green");
  nerdArray.push(nerd);
}

function draw() {
  // background(220);
  for (let theNerd of nerdArray){
    theNerd.move();
    theNerd.disp();
  }
}

function mousePressed(){
  let someNerd = new Walker(mouseX, mouseY, color(random(255),random(255), random(255)));
  nerdArray.push(someNerd);
}