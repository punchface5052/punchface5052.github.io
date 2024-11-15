// Cheesse
// Liam Thorpe
// Oct. 28 2024
//
// Extra for Experts:
// I tried to make this work without knowing oop, and it just didn't work

let state = "title";
let backgrid, grid, cellSize;
let firstPawnMove = true;
const GRID_SIZE = 8;
const BLACK = 1;
const WHITE = 0;
let moveArray = [];
let imageMap = new Map();
let turn = "white";
let selectedPiece = '';
let selectTime = 0;
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

  wp = loadImage("sprites/wcheesepawn.png"); // White Pawn
  wn = loadImage("sprites/wskyrimcheesewheel.png"); // White Knight
  wb = loadImage("sprites/wswisscheese.png"); // White Bishop
  wr = loadImage("sprites/wcheesemoon.png"); // White Rook
  wq = loadImage("sprites/wpizzacheese.png"); // White Queen
  wk = loadImage("sprites/wcheeseking.png"); // White King

  bp = loadImage("sprites/bcheesepawn.png"); // Black Pawn
  bn = loadImage("sprites/bskyrimcheesewheel.png"); // Black knight
  bb = loadImage("sprites/bswisscheese.png"); // Black Bishop
  br = loadImage("sprites/bcheesemoon.png"); // Black Rook
  bq = loadImage("sprites/bpizzacheese.png"); // Black Queen
  bk = loadImage("sprites/bcheeseking.png"); // Black King

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
  noStroke();
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

function genGrid(){ // generates generic chess grid
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


function dispGrid() { // draws the images and background grid
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      // basic background chess board
      if (backgrid[y][x] === WHITE) {
        fill(240);
      }
      else if (backgrid[y][x] === BLACK){
        fill("black");
      }
      square(x*cellSize, y*cellSize, cellSize);
  
      if(pieceClicked && Math.floor(mouseX/cellSize) === x && Math.floor(mouseY/cellSize) === y){
        fill('yellow');
        square(x*cellSize,y*cellSize,cellSize);
      }
      for (let piece of pieces){ // displays pieces
        if (grid[y][x] === piece){
          image(imageMap.get(piece),x*cellSize+cellSize/2,y*cellSize+cellSize/2,cellSize,cellSize);
        }
      }
      for (let i = 0; i < moveArray.length; i++){
        for (let j = 0; j<moveArray[i].length; j++){
          image(babybel, moveArray[i][j]*cellSize, moveArray[i][j]*cellSize, cellSize, cellSize);
        }
      }
    }
  }
}

function dispTitle(){ // title screen
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

function highlightPiece(theX,theY){
  if (pieceClicked){
    fill('yellow');
    square(theX*cellSize,theY*cellSize,cellSize);
  }
}

function movePiece(theX,theY){ // goes through the processes to move pieces
  x = Math.floor(theX/cellSize);
  y = Math.floor(theY/cellSize);
  if (x>=0 && x<GRID_SIZE && y>=0 && y<GRID_SIZE && grid[y][x] !== 0 && grid[y][x][0] === turn[0] && !pieceClicked){ 
    pieceClicked = true;
    highlightPiece(x,y);
    dispMoves(x,y);
  }
  else if (pieceClicked && grid[x][y] === 0){
    pieceClicked = false;
  }
}

function dispMoves(aX, aY){ // sets up for displaying possible moves
  pieceClicked = true;
  selectTime = millis()+100;
  if (selectTime > millis()){
    if (grid[aY][aX] === 'wp' && aY+1 > 0 && grid[aY+1][aX] === 0){
      selectedPiece = 'wp';
      moveArray.push(aY);
      moveArray.push(aX);
      console.log(moveArray);
    }
    if (grid[aY][aX] === 'wr'){
      selectedPiece = 'wr';
      for (let i = -GRID_SIZE; i < GRID_SIZE; i++){
        if (aY+i>=0 && aY+i<GRID_SIZE && i!== 0){
          moveArray.push(aY+i);
          moveArray.push(aX);
        }
      }
      for (let j = -GRID_SIZE; j < GRID_SIZE; j++){
        if(aX+j>=0 && aX+j<GRID_SIZE && j!== 0){
          moveArray.push(aY);
          moveArray.push(aX+j);
        }
      }
    }
    if (mouseIsPressed){
      selectTime -= 1000;
    }
  }
  else{
    grid[aY][aX] = selectedPiece;
    if (turn === 'white'){
      turn = 'black';
    }
    else if (turn === 'black'){
      turn = 'white';
    }
    moveArray = [];
  }
}

