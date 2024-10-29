// Grid Demo
// Oct 22, 2024


let grid;
const GRID_SIZE = 10;
const GROUND = 1;
const AIR = 0;
const PLAYER_TILE = 9;
let cellSize;
let shouldToggleNeighbours = false;
let player = {
  x: 0,
  y: 0,
};
let theSun;
let someWater;

function preload(){
  theSun = loadImage("sun.png");
  someWater = loadImage("water.png");
}

function setup() {
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth, windowWidth);
  }
  else {
    createCanvas(windowHeight, windowHeight);
  }
  cellSize = height/GRID_SIZE;
  grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
  grid[player.y][player.x] = PLAYER_TILE;
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
  displayGrid();
}

function mousePressed() {
  let x = Math.floor(mouseX/cellSize);
  let y = Math.floor(mouseY/cellSize);

  //toggle self
  toggleCell(x, y);

  //toggle neighbours
  if (shouldToggleNeighbours) {
    toggleCell(x + 1, y);
    toggleCell(x - 1, y);
    toggleCell(x, y + 1);
    toggleCell(x, y - 1);
  }
}

function toggleCell(x, y) {
  //make sure the cell you're toggling is in the grid
  if (x >= 0 && y >= 0 && x < GRID_SIZE && y < GRID_SIZE) {
    if (grid[y][x] === 1) {
      grid[y][x] = 0;
    }
    else {
      grid[y][x] = 1;
    }
  }
}

function keyPressed() {
  if (key === "r") {
    grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
  }
  if (key === "e") {
    grid = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
  }
  if (key === "n") {
    shouldToggleNeighbours = !shouldToggleNeighbours;
  }
  if (key === "w"){
    movePlayer(player.x,player.y-1);
  }
  if (key === "a"){
    movePlayer(player.x-1,player.y);
  }
  if (key === "s"){
    movePlayer(player.x,player.y+1);
  }
  if (key === "d"){
    movePlayer(player.x+1,player.y);
  }
}

function movePlayer(x,y){
  if (x>=0 && x<GRID_SIZE && y>=0 && y<GRID_SIZE && grid[y][x] === AIR){
    grid[player.y][player.x] = AIR;
    player.x = x;
    player.y = y;
  
    grid[player.y][player.x] = PLAYER_TILE;
  }

}

function displayGrid() {
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      if (grid[y][x] === 1) {
        // fill("black");
        image(theSun, x*cellSize,y*cellSize,cellSize,cellSize);
      }
      else if (grid[y][x] === 0) {
        // fill("white");
        image(someWater, x*cellSize,y*cellSize,cellSize,cellSize);
      }
      else if (grid[y][x] === PLAYER_TILE){
        fill("red");
        square(x * cellSize, y * cellSize, cellSize);
      }
    }
  }
}

function generateRandomGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      //choose either 0 or 1, each 50% of the time
      if (random(100) < 50) {
        newGrid[y].push(1);
      }
      else {
        newGrid[y].push(0);
      }
    }
  }
  return newGrid;
}

function generateEmptyGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      newGrid[y].push(0);
    }
  }
  return newGrid;
}