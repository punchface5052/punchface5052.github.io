// rectangle grid
// 2d array demo

const CELL_SIZE = 25;
let grid;
let rows;
let cols;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = Math.floor(width/CELL_SIZE);
  rows = Math.floor(height/CELL_SIZE);
  grid = genGrid(cols,rows);
}

function draw() {
  background(220);
  dispGrid();
}

function dispGrid(){
  for (y = 0; y<rows; y++){
    for (x=0; x<cols; x++){
      if(grid[y][x]){
        fill("black");
      }
      else {
        fill("white");
      }
      square(x*CELL_SIZE,y*CELL_SIZE,CELL_SIZE);
    }
  }
}

function genGrid(cols,rows){
  let grid2 = [];
  for (let y = 0; y<=rows; y++){
    grid2.push([]);
    for (let x = 0; x<=cols; x++){
      grid2[y][x] = Math.round(random());
    }
  }
  return grid2;
}