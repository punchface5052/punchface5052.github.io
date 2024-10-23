// grid demo
// me
// Oct 22, 2024

let grid;
let size;
let badNeighbour = false;
let conway = false;

function setup() {
  if (windowWidth < windowHeight){
    createCanvas(windowWidth,windowWidth);
  }
  else {
    createCanvas(windowHeight,windowHeight);
  }
  size = width/20;
  grid = generateRandomGrid(size,size);
}

function draw() {
  background(220);
  dispGrid();
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
    grid = generateRandomGrid(size,size);
  }
  if (key === "e") {
    grid = genEmpty(size,size);
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
    conway = !conway;
  }
}

function windowResized(){
  if (windowWidth < windowHeight){
    resizeCanvas(windowWidth,windowWidth);
  }
  else {
    resizeCanvas(windowHeight,windowHeight);
  }
  size = width/20;
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
  if (x>=0 && y>=0 && x < size && y<size){
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