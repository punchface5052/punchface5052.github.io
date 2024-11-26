// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const PARTICULATE_NUMB = 100;

class Particulate {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dx = random(-5, 5);
    this.dy = random(-5, 5);
    this.size = 5;
    this.r = 255;
    this.g = 0;
    this.b = 0;
    this.alpha = 255;
  }
  display(){
    fill(this.r,this.g,this.b,this.alpha);
    circle(this.x,this.y,this.size);
  }
  update(){
    this.x += this.dx;
    this.y += this.dy;
    this.alpha -= 1;
  }
  isDead(){
    return this.alpha <= 0;
  }
}

let theFireworks = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  background(0);
  if(mouseIsPressed){
    for (let i = 0; i<PARTICULATE_NUMB; i++){
      let someParticle = new Particulate(mouseX, mouseY);
      theFireworks.push(someParticle);
    }
  }
  for (let firework of theFireworks){
    if (firework.isDead()){
      theFireworks.splice(theFireworks.indexOf(firework),1);
    }
    firework.update();
    firework.display();
  }
}

function mousePressed(){
  // if(mouseIsDown){
  //   for (let i = 0; i<50; i++){
  //     let someParticle = new Particulate(mouseX, mouseY);
  //     theFireworks.push(someParticle);
  //   }
  // }
}