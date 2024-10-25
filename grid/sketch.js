// grid demo
// me
// Oct 22, 2024

let grid;
const GRID_SIZE = 5;
let size;
let badNeighbour = false;
let auto = false;
let renderMult = 5;


function setup() {
  if (windowWidth < windowHeight){
    createCanvas(windowWidth,windowWidth);
  }
  else {
    createCanvas(windowHeight,windowHeight);
  }
  size = width/GRID_SIZE;
  grid = generateRandomGrid(GRID_SIZE,GRID_SIZE);
}

function draw() {
  background(220);
  dispGrid();
  if (auto && frameCount%renderMult === 0){
    grid = updateGrid();
  }
}

function dispGrid(){
  for (let y = 0; y < grid.length; y++){
    for (let x = 0; x < grid[y].length; x++){
      if (grid[y][x]){
        fill("black");
      }
      else {
        fill("white");
      }
      square(x*size,y*size,size);
    }
  }
}

function keyPressed(){
  if (key === "r"){
    grid = generateRandomGrid(GRID_SIZE,GRID_SIZE);
  }
  if (key === "e") {
    grid = genEmpty(GRID_SIZE,GRID_SIZE);
  }
  if (key === "l") {
    grid = [[0,1,0,0,1,0,0,0],
            [0,1,0,0,1,0,1,0],
            [0,1,0,0,1,0,1,0],
            [0,0,0,0,0,0,0,0],
            [1,0,1,0,1,0,0,0],
            [1,0,1,0,1,0,0,0],
            [1,0,1,0,1,0,1,1]];
  }
  if (key === "n") {
    badNeighbour = !badNeighbour;
  }
  if (key === "c") {
    grid = updateGrid();
  }
  if (key === " ") {
    auto = !auto;
  }
}

function updateGrid(){
  let grid2 = genEmpty(GRID_SIZE,GRID_SIZE);
  for (let y = 0; y<GRID_SIZE; y++){
    for (let x = 0; x<GRID_SIZE; x++){
      let neighbours = 0;
      for (let i = -1; i<=1; i++){
        for (let j = -1; j<=1; j++){
          if (y+i>=0 && y+i<GRID_SIZE && x+j >=0 && x+j<GRID_SIZE){
            neighbours += grid[y+i][x+j];
          }
        }
      }
      neighbours -= grid[y][x];

      if (grid[y][x] === 0){
        if (neighbours === 3){
          grid2[y][x] = 1;
        }
        else{
          grid2[y][x] = 0;
        }
      }

      if (grid[y][x] === 1){
        if (neighbours === 2 || neighbours === 3){
          grid2[y][x] = 1;
        }
        else{
          grid2[y][x] = 0;
        }
      }
    }
  }
  return grid2;
}

function windowResized(){
  if (windowWidth < windowHeight){
    resizeCanvas(windowWidth,windowWidth);
  }
  else {
    resizeCanvas(windowHeight,windowHeight);
  }
  size = width/GRID_SIZE;
}

function mousePressed(){
  let x = Math.floor(mouseX/size);
  let y = Math.floor(mouseY/size);
  toggleCell(x,y);
  if (badNeighbour === true){
    toggleCell(x+1,y);
    toggleCell(x-1,y);
    toggleCell(x,y+1);
    toggleCell(x,y-1);
  }
}

function toggleCell(x,y){
  if (x>=0 && y>=0 && x < GRID_SIZE && y<GRID_SIZE){
    grid[y][x] = !grid[y][x];
  }
}



function generateRandomGrid(cols, rows){
  let newGrid = [];
  for (let y = 0; y<rows ;y++){
    newGrid.push([]);
    for (let x = 0; x<cols; x++){
      newGrid[y].push(round(random()));
    }
  }
  return newGrid;
}

function genEmpty(cols,rows){
  let newGrid = [];
  for (let y = 0; y<rows ;y++){
    newGrid.push([]);
    for (let x = 0; x<cols; x++){
      newGrid[y].push(0);
    }
  }
  return newGrid;
}