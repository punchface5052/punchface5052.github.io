// Cheesse
// Liam Thorpe
// Oct. 28 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let grid;
const GRID_SIZE = 8;
const BLACK = 1;
const WHITE = 0;
let cellSize;

function preload(){
  loadImage("cheeses/cheeseking.jpg");
  loadImage("cheeses/cheesemoon.jpg");
  loadImage("cheeses/cheesepawn.jpg");
  loadImage("cheeses/defcheesenotspugnebob.jpg");
  loadImage("cheeses/cheesepizza.webp");
  loadImage("cheeses/skyrimcheesewheel.png");
  loadImage("cheeses/swisscheese.jpg");
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