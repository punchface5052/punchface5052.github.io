// sfx demo

let bg;
let click;

function preload(){
  bg = loadSound("bgmusic.mp3");
  click = loadSound("jameobaa.ogg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  bg.amp(0.3);
  click.amp(1.0);
}

function draw() {
  background(220);
}

function keyPressed(){
  if (!bg.isPlaying()){
    bg.loop();
  }
}

function mousePressed(){
  click.play();
}