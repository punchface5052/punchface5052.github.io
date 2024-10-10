// Bubble Object Demo
// Object Deletion
// 10, Oct. 2024 

let bubbles = [];
let deathLocations = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  for (let i=0;i<5;i++){
    spawnBubbles();
  }
  window.setInterval(spawnBubbles,500);
}

function draw() {
  background(255);
  // randMovement();
  noisyRandMovement();
  dispBubbles();
  displayGraves();
}

function noisyRandMovement(){
  for (let bubble of bubbles){
    bubble.x = noise(bubble.tX)*width;
    bubble.y = noise(bubble.tY)*height;

    bubble.tX += bubble.deltaTime;
    bubble.tY += bubble.deltaTime;
  }
}

function randMovement(){
  for(let bubble of bubbles){
    let choice = random(100);
    if (choice<50){
      bubble.y -= bubble.s;
    }
    else if (choice<65){
      bubble.y += bubble.s;
    }
    else if (choice<75){
      bubble.x += bubble.s;
    }
    else{
      bubble.x -= bubble.s;
    }
  }
}

function dispBubbles(){
  for (let bubble of bubbles){
    fill(bubble.r,bubble.g,bubble.b,bubble.a)
    circle(bubble.x,bubble.y,bubble.d);
  }
}

function spawnBubbles(){
  let aBubble = {
    x: random(0,width),
    y: height + random(0,50),
    s: random(2,5),
    d: random(40,100),
    r: random(255),
    g: random(255),
    b: random(255),
    a: random(255),
    tX: random(100000000),
    tY: random(100000000),
    deltaTime: 0.008,
  };
  bubbles.push(aBubble);
}


function mousePressed(){
  for (let bubble of bubbles){
    if (clickedOnBubble(mouseX,mouseY,bubble)){
      let theIndex = bubbles.indexOf(bubble);
      bubbles.splice(theIndex,1);
      undertaker(bubble.x,bubble.y);
    }
  }
}

function displayGraves(){
  for (let grave of deathLocations){
    textAlign(CENTER,CENTER);
    fill("red");
    text("X",grave.x,grave.y);
  }
}

function clickedOnBubble(x,y,bubble){
  return dist(x,y,bubble.x,bubble.y)<bubble.d/2;
}

function undertaker(aX,aY){
  let grave = {
    x: aX,
    y: aY,
  };
  deathLocations.push(grave);
}