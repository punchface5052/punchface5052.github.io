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
let side = "white";
let babybel, wKing, wQueen, wRook, wKnight, wBishop, wPawn, bKing, bQueen, bRook, bKnight, bBishop, bPawn, spugnebob;
let pieceClicked = false;
let pieces = ['br','bn','bb','bq','bk','bp','wp','wq','wk','wb','wn','wr'];
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
  babybel = loadImage("sprites/babybel.png");
  spugnebob = loadImage("sprites/defnotspugnebobcheese.png");

  wk = loadImage("sprites/wcheeseking.png");
  wr = loadImage("sprites/wcheesemoon.png");
  wp = loadImage("sprites/wcheesepawn.png");
  wq = loadImage("sprites/wpizzacheese.png");
  wn = loadImage("sprites/wskyrimcheesewheel.png");
  wb = loadImage("sprites/wswisscheese.png");

  bq = loadImage("sprites/bpizzacheese.png");
  bn = loadImage("sprites/bskyrimcheesewheel.png");
  bb = loadImage("sprites/bswisscheese.png");
  bk = loadImage("sprites/bcheeseking.png");
  br = loadImage("sprites/bcheesemoon.png");
  bp = loadImage("sprites/bcheesepawn.png");
  
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
  background(220);
  dispGrid();
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
        fill(230);
      }

      else if (backgrid[y][x] === BLACK){
        fill("black");
      }
      square(x*cellSize, y*cellSize, cellSize);
      for (let piece of pieces){
        if (grid[y][x] === piece){
          image(piece,x*cellSize+cellSize/2,y*cellSize+cellSize/2,cellSize,cellSize);
        }
      }
      if (grid[y][x]==='wp'){
        image(wPawn,x*cellSize+cellSize/2,y*cellSize+cellSize/2,cellSize,cellSize);
      }
      if (grid[y][x]==='bp'){
        image(bPawn,x*cellSize+cellSize/2,y*cellSize+cellSize/2,cellSize,cellSize);
      }
      if (grid[y][x]==='wr'){
        image(wRook,x*cellSize+cellSize/2,y*cellSize+cellSize/2,cellSize,cellSize);
      }
      if (grid[y][x]==='br'){
        image(bRook,x*cellSize+cellSize/2,y*cellSize+cellSize/2,cellSize,cellSize);
      }
      if (grid[y][x]==='wn'){
        image(wKnight,x*cellSize+cellSize/2,y*cellSize+cellSize/2,cellSize,cellSize);
      }
      if (grid[y][x]==='bn'){
        image(bKnight,x*cellSize+cellSize/2,y*cellSize+cellSize/2,cellSize,cellSize);
      }
      if (grid[y][x]==='wb'){
        image(wBishop,x*cellSize+cellSize/2,y*cellSize+cellSize/2,cellSize,cellSize);
      }
      if (grid[y][x]==='bb'){
        image(bBishop,x*cellSize+cellSize/2,y*cellSize+cellSize/2,cellSize,cellSize);
      }
      if (grid[y][x]==='wq'){
        image(wQueen,x*cellSize+cellSize/2,y*cellSize+cellSize/2,cellSize,cellSize);
      }
      if (grid[y][x]==='bq'){
        image(bQueen,x*cellSize+cellSize/2,y*cellSize+cellSize/2,cellSize,cellSize);
      }
      if (grid[y][x]==='wk'){
        image(wKing,x*cellSize+cellSize/2,y*cellSize+cellSize/2,cellSize,cellSize);
      }
      if (grid[y][x]==='bk'){
        image(bKing,x*cellSize+cellSize/2,y*cellSize+cellSize/2,cellSize,cellSize);
      }
    }
  }
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


"Hello World" = Hello World