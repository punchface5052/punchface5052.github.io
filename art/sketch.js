// Gen art demo
// Oct. 4, 2024

const TILE_SIZE = 100;
let tileArray = [];

let lastSwap = 0;
let swapTime = 1000;
let r;
let g;
let b;

function setup() {
  createCanvas(windowWidth, windowHeight);
  strokeWeight(1);
}

function draw() {
  if (millis()>lastSwap+swapTime){
    background(255);
    for (let x = 0; x< width; x+=TILE_SIZE){
      for (let y=0;y<height;y+=TILE_SIZE){
        stroke(r,g,b);
        let someTile = spawnTile(x,y);
        tileArray.push(someTile);
      }
      for (let myTile of tileArray){
        r = random(1,255);
        g = random(1,255);
        b = random(1,255);
        stroke(r,g,b);
        line(myTile.x1,myTile.y1,myTile.x2,myTile.y2);
        lastSwap = millis();
      }
    }
  }
}

function spawnTile(x,y){
  let tile;
  let posneg;
  posneg = random(1);
  if (posneg < 0.5){  
    tile = {
      x1: x-TILE_SIZE/2,
      y1: y-TILE_SIZE/2,
      x2: x+TILE_SIZE/2,
      y2: y+TILE_SIZE/2,
    };

  }
  else{
    tile = {
      x1: x-TILE_SIZE/2,
      y1: y+TILE_SIZE/2,
      x2: x+TILE_SIZE/2,
      y2: y-TILE_SIZE/2,
    };
  }

  return tile;
}