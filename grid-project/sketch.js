// Cheesse
// Liam Thorpe
// Oct. 28 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let state = "title";
let grid;
const GRID_SIZE = 8;
const BLACK = 1;
const WHITE = 0;
let cellSize;
let side = "white";
let babybel;
let pieceClicked = false;
let piece = {
  x: 0,
  y: 0,
  size: cellSize/2,
  pieceType: "pawn",
};

function preload(){
  babybel = loadImage("cheeses/babybel.png");
  loadImage("cheeses/cheeseking.png");
  loadImage("cheeses/cheesemoon.png");
  loadImage("cheeses/cheesepawn.png");
  loadImage("cheeses/defnotspugneboobcheese.png");
  loadImage("cheeses/pizzacheese.png");
  loadImage("cheeses/skyrimcheesewheel.png");
  loadImage("cheeses/swisscheese.png");
  
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
    let x = Math.floor(mouseX/cellSize);
    let y = Math.floor(mouseY/cellSize);
    toggleCell(x,y);
  }
}

function toggleCell(x,y){
  if (x>=0 && y>=0 && x < GRID_SIZE && y<GRID_SIZE){
    piece.pieceType = "babybel";
  }
}

function movePiece(theX,theY){
  pieceClicked = !pieceClicked;
  piece.x = theX;
  piece.y = theY;
}