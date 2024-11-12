// Cheesse
// Liam Thorpe
// Oct. 28 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let state = "title";
let grid, cellSize;
const GRID_SIZE = 8;
const BLACK = 1;
const WHITE = 0;
let side = "white";
let babybel, wKing, wQueen, wRook, wKnight, wBishop, wPawn, bKing, bQueen, bRook, bKnight, bBishop, bPawn, spugnebob;
let pieceClicked = false;

let startGrid = [
  ['r','n','b','q','k','b','n','r'],
  ['p','p','p','p','p','p','p','p'],
  [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
  [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
  [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
  [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
  ['p','p','p','p','p','p','p','p'],
  ['r','n','b','q','k','b','n','r']
];

function preload(){
  babybel = loadImage("cheeses/babybel.png");
  spugnebob = loadImage("cheeses/defnotspugneboobcheese.png");

  wKing = loadImage("cheeses/wcheeseking.png");
  wRook = loadImage("cheeses/wcheesemoon.png");
  wPawn = loadImage("cheeses/wcheesepawn.png");
  wQueen = loadImage("cheeses/wpizzacheese.png");
  wKnight = loadImage("cheeses/wskyrimcheesewheel.png");
  wBishop = loadImage("cheeses/wswisscheese.png");

  bQueen = loadImage("cheeses/bpizzacheese.png");
  bKnight = loadImage("cheeses/bskyrimcheesewheel.png");
  bBishop = loadImage("cheeses/bswisscheese.png");
  bKing = loadImage("cheeses/bcheeseking.png");
  bRook = loadImage("cheeses/bcheesemoon.png");
  bPawn = loadImage("cheeses/bcheesepawn.png");
  
}

function setup() {
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth, windowWidth);
  }
  else {
    createCanvas(windowHeight, windowHeight);
  }
  cellSize = height/GRID_SIZE;
  grid = genGrid();
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
      if (grid[y][x] === WHITE) {
        fill("white");
      }

      else if (grid[y][x] === BLACK){
        fill("black");
      }
      square(x*cellSize, y*cellSize, cellSize);
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
  pieceClicked = !pieceClicked;
  if (theX){

  }
}