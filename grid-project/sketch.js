// Cheesse
// Liam Thorpe
// Oct. 28 2024
//
// Extra for Experts:
// I'm Going to be honest, I couldn't think of how to make this work without class systems or using a bunch of seperate javascript files like the other projects, and I was in way too deep to fully change it to class systems, with no time after learning them...  so I gave up. I know it looks like I didn't do anything, but that's because everytime I did something it didn't work, then everytime you asked me if I was doing good, I thought I knew how to do it, but didn't.
// I know this seems like I'm looking for pity, but I don't deserve it, I genuinely just completely failed at this assignment.

let state = "title";
let backgrid, grid, cellSize;
let firstPawnMove = true;
const GRID_SIZE = 8;
const BLACK = 1;
const WHITE = 0;
let imageMap = new Map();
let turn = "white";
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
      if (backgrid[y][x] === "highlight"){ // highlights selected piece
        fill("yellow")
      }
      // basic background chess board
      else if (backgrid[y][x] === WHITE) {
        fill(240);
      }

      else if (backgrid[y][x] === BLACK){
        fill("black");
      }
      square(x*cellSize, y*cellSize, cellSize);

      if (grid[y][x] === 'move'){ // shows possible moves
        image(babybel, x*cellSize+cellSize/2,y*cellSize+cellSize/2,cellSize,cellSize);
      }
  
      for (let piece of pieces){ // displays pieces
        if (grid[y][x] === piece){
          image(imageMap.get(piece),x*cellSize+cellSize/2,y*cellSize+cellSize/2,cellSize,cellSize);
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
  let prevGrid = backgrid[theY][theX]
  if (pieceClicked ){
    backgrid[theY][theX] = "highlight";
  }
  else{
    backgrid[theY][theX] = prevGrid;
  }
}

function movePiece(theX,theY){ // goes through the processes to move pieces
  x = Math.floor(theX/cellSize);
  y = Math.floor(theY/cellSize);
  if (grid[y][x] !== 0 && !pieceClicked){ 
    pieceClicked = true;
    highlightPiece(x,y);
    dispMoves(x,y);
  }
  else if (pieceClicked && grid[x][y] === 0){
    pieceClicked = false;
  }
}

function dispMoves(aX, aY){ // displays possible moves
  if (grid[aY][aX] === 'wp' && turn === "white"){ // pawn
    if(grid[aY-1][aX] === 0){
      grid[aY-1][aX] = 'move';
    }
    if(grid[aY-2][aX] === 0 && firstPawnMove){
      grid[aY-2][aX] = 'move';
    }
  }
}