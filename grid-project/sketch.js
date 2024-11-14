// Cheesse
// Liam Thorpe
// Oct. 28 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let state = "title";
let backgrid, grid, cellSize;
const GRID_SIZE = 8;
const BLACK = 1;
const WHITE = 0;
let imageMap = new Map();
let side = "white";
let pieceClicked = false; 
let pieces = ['br','bn','bb','bq','bk','bp','wp','wq','wk','wb','wn','wr']; // list all pieces to go through each one in a for loop
let startGrid = [
  ['br','bn','bb','bq','bk','bb','bn','br'],
  ['bp','bp','bp','bp','bp','bp','bp','bp'],
  [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
  [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
  [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
  [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
  ['wp','wp','wp','wp','wp','wp','wp','wp'],
  ['wr','wn','wb','wq','wk','wb','wn','wr']
];

function preload(){

  // Load all images
  babybel = loadImage("sprites/babybel.png");
  spugnebob = loadImage("sprites/defnotspugnebobcheese.png");

  wk = loadImage("sprites/wcheeseking.png"); // White King
  wr = loadImage("sprites/wcheesemoon.png"); // White Rook
  wp = loadImage("sprites/wcheesepawn.png"); // White Pawn
  wq = loadImage("sprites/wpizzacheese.png"); 
  wn = loadImage("sprites/wskyrimcheesewheel.png");
  wb = loadImage("sprites/wswisscheese.png");

  bq = loadImage("sprites/bpizzacheese.png");
  bn = loadImage("sprites/bskyrimcheesewheel.png");
  bb = loadImage("sprites/bswisscheese.png");
  bk = loadImage("sprites/bcheeseking.png");
  br = loadImage("sprites/bcheesemoon.png");
  bp = loadImage("sprites/bcheesepawn.png");

  // Set a map to get rid of the repetitive if statements for loading the images
  imageMap.set("wp", wp);
  imageMap.set("wr", wr);
  imageMap.set("wn", wn);
  imageMap.set("wb", wb);
  imageMap.set("wq", wq);
  imageMap.set("wk", wk);
  imageMap.set("bp", bp);
  imageMap.set("br", br);
  imageMap.set("bn", bn);
  imageMap.set("bb", bb);
  imageMap.set("bq", bq);
  imageMap.set("bk", bk);  
}

function setup() {
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth, windowWidth);
  }
  else {
    createCanvas(windowHeight, windowHeight);
  }
  cellSize = height/GRID_SIZE;
  backgrid = genGrid();
  grid = startGrid;
  imageMode(CENTER);
}

function windowResized() {
  if (windowWidth < windowHeight) {
    resizeCanvas(windowWidth, windowWidth);
  }
  else {
    resizeCanvas(windowHeight, windowHeight);
  }
  cellSize = height/GRID_SIZE;
}

function draw() {
  if (state === "title"){
    dispTitle();
  }
  if (state === "game"){
    background(10);
    dispGrid();
  }
}

function genGrid(){
  let newGrid = [];
  for (let y = 0; y < GRID_SIZE; y++) {
    newGrid.push([]);
    for (let x = 0; x < GRID_SIZE; x++) {
      if (x % 2 !== 0 && y % 2 === 0) {
        newGrid[y].push(BLACK);
      }
      else if (x % 2 === 0 && y% 2 !== 0){
        newGrid[y].push(BLACK);
      }
      else {
        newGrid[y].push(WHITE);
      }
    }
  }
  return newGrid;
}


function dispGrid() {
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      if (backgrid[y][x] === WHITE) {
        fill(240);
      }

      else if (backgrid[y][x] === BLACK){
        fill("black");
      }
      square(x*cellSize, y*cellSize, cellSize);
      for (let piece of pieces){
        if (grid[y][x] === piece){
          image(imageMap.get(piece),x*cellSize+cellSize/2,y*cellSize+cellSize/2,cellSize,cellSize);
        }
      }
    }
  }
}

function dispTitle(){
  background(10);
  fill("white");
  textAlign(CENTER);
  text("Cheesse", width/2, height/2);
}

function mousePressed(){
  if (state === "title"){
    state = "game";
  }

  else if (state === "game"){
    movePiece(mouseX,mouseY);
  }
}

function movePiece(theX,theY){
  x = Math.floor(theX/cellSize);
  y = Math.floor(theY/cellSize);
  console.log(grid[y][x]);
}

