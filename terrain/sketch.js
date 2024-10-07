// Terrain Generation
// Oct. 7, 2024

let terrain = [];
const NUMBER_OF_RECTS = 1000;

function setup() {
  createCanvas(windowWidth, windowHeight);
  let howWide = width/NUMBER_OF_RECTS;
  generateTerrain(howWide);
}

function draw() {
  background(220);

  for (let aRect of terrain){
    rect(aRect.x,aRect.y,aRect.w,aRect.h);
  }
}

function spawnRect(lS,rH,rW){
  let rectangle = {
    x: lS,
    y: height-rH,
    w: rW,
    h: rH,
  };
  return rectangle;
}

function generateTerrain(aWidth){
  let t = 0;
  let dT = 0.001;
  for (let x = 0;x<width;x+=aWidth){
    let theHeight = noise(t)*height;
    let aRect = spawnRect(x,theHeight,aWidth);
    terrain.push(aRect);
    t += dT;
  }
}