//bouncing balls
//Oct. 3, 2024

let ballArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i<20; i++){
    spawnBall(width/2, height/2);
  }
}

function draw() {
  background(255);

  for(let someBall of ballArray){
    someBall.x+=someBall.dx;
    someBall.y+=someBall.dy;
    if (someBall.x >= width - someBall.r||someBall.x <= 0+someBall.r){
      if(someBall.x >= width/2+someBall.r){
        someBall.dx = random(1,10);
      }
      else{
        someBall.dx = random(-10,-1);
      }
      someBall.dx *= -1;
      someBall.red = random(1,255);
      someBall.green = random(1,255);
      someBall.blue = random(1,255);
      someBall.alphamale = random(1,255);
    }
      
    if (someBall.y >= height-someBall.r||someBall.y <= 0+someBall.r){
      if(someBall.y >= height/2+someBall.r){
        someBall.dy = random(1,10);
      }
      else{
        someBall.dy = random(-10,-1);
      }
      someBall.dy *= -1;
      someBall.red = random(1,255);
      someBall.green = random(1,255);
      someBall.blue = random(1,255);
      someBall.alphamale = random(1,255);
    }
    
    noStroke;
    fill(someBall.red,someBall.green,someBall.blue,someBall.alphamale);
    circle(someBall.x,someBall.y,someBall.r*2);
  }
}

function mousePressed(){
  spawnBall(mouseX,mouseY);
}

function spawnBall(theX,theY){
  let ball = {
    x: theX,
    y: theY,
    r: random(1,100),
    dx: random(-10,10),
    dy: random(-10,10),
    red: random(1,255),
    green: random(1,255),
    blue: random(1,255),
    alphamale: random(1,255),
  };
  ballArray.push(ball);
}