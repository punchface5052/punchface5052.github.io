// Walker OOP Dem
// 11/13/2024

class Walker {
  constructor(x,y,c) {
    this.x = x;
    this.y = y;
    this.s = 6;
    this.r = 13;
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

let nerd;
let michaelangelo;

function setup() {
  noStroke();
  createCanvas(windowWidth, windowHeight);  
  nerd = new Walker(width/2,height/2, "red");
  michaelangelo = new Walker(300, 200, "blue");
}

function draw() {
  // background(220);
  nerd.move();
  michaelangelo.move();
  nerd.disp();
  michaelangelo.disp();
}
