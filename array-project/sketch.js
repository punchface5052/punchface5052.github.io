// Arrays and Object Notation Assignment
// Liam Thorpe
// Oct. 8, 2024
//
// Extra for Experts:
// Took inspiration from the "jump on heads" project and used create vector and lerp-ing to create smooth movement, made player and enemy objects, used a enemyArray array for containing enemies and made the game more fun in general.
//
// https://schellenberg.github.io/cs30-exemplar-projects/arrays-and-object-notation-exemplars/jump-on-enemies/ - didn't know lerping existed before looking a this project, so tons of credit to the creator. I pretty much just revised their code into a format that worked for mine not directly stolen per se, just heavily influenced. 

let char;
let state = "title"; 
let highscore = 0;
let enemyArray = [];
let roundKillCount = 0;
let killCount = -1;
let attackSize = 50;
let weaponState = 0;
let direction = "";
let attacking = false;
let lastEnemySpawn = 0;
let lastAttack = 0;
let attackSpeed = 1;
const ATTACK_DUR = 1000;
const WEAPON_1_WAIT = 1000;
const WEAPON_2_WAIT = 2000;
const WEAPON_3_WAIT = 3000;


function setup() {
  createCanvas(windowWidth, windowHeight);
  char = {
    position: createVector(width/2, height/2),
    d: 50,
    speed: 7,
  };
}

// draw loop

function draw() {
  if (state === "title"&& !keyIsDown(32)){ // press space to play on title and restart
    titleState();
    reset();
  }
  else{
    gameState();
  }
  alwaysRunning();
}

// Title state with main text

function titleState(){
  fill(0);
  textAlign(CENTER,CENTER);
  textSize(50);
  text("Press space to begin",width/2,height/2);
  textSize(25);
  text("WASD to move",width/2,height/2+50);
  text("Click to attack",width/2,height/2+80);
  text("Scroll wheel to change weapon",width/2,height/2+110);
}

// resets the game state

function reset(){
  char.position.x = width/2;
  char.position.y = height/2;
  enemyArray = [];d
  killCount = -1;
  roundKillCount = 0;
}

// calls all necessary functions for gameplay and display

function gameState(){
  state = "game";
  strokeWeight(1);
  background(255);
  attack();
  changeWeapon();
  textSize(25);
  fill(0);
  enemyDisp();
  charDisp();
  hitDetec();

}

// function that is always running in draw

function alwaysRunning(){
  fill(0);
  if (killCount !== -1&&killCount>highscore){
    highscore = killCount;
    text("Highscore = " + highscore,100,150);
  }
  else if (killCount!==-1){
    text("Highscore = " + highscore,100,150);
    text("Kill Count = " + killCount,100,100);
  }
  if (state === "game" && killCount === -1){
    killCount = 0;
  }
}

// Character Movement

function moveChar() {
  if ((keyIsDown(87) || keyIsDown(38))&&char.position.y-char.d/2>0) { //w / up arrow
    char.position.y -= char.speed;   
  }
  if ((keyIsDown(83)||keyIsDown(40))&&char.position.y+char.d/2<height) { //s / down arrow
    char.position.y += char.speed;   
  }
  if ((keyIsDown(65)||keyIsDown(37))&&char.position.x>0) { //a / left arrow
    char.position.x -= char.speed;   
  }
  if ((keyIsDown(68)||keyIsDown(39))&&char.position.x+char.d<width) { //d / right arrow
    char.position.x += char.speed;   
  }
}

// character display

function charDisp(){
  moveChar();
  fill(225,225,255);
  circle(char.position.x,char.position.y,char.d);
}

// Character death detection 

function hitDetec() {
  for (let enemy of enemyArray){
    if (dist(char.position.x,char.position.y,enemy.position.x+enemy.size/2,enemy.position.y+enemy.size/2)<char.d/2+enemy.size/2){
      state = "title";
    }
  }
}

// Spawn enemies in a random corner / enemy object creation

function spawnEnemies(){
  let enemyLR;
  let enemyUD;
  enemySpawn = round(random(1,4));
  if (enemySpawn === 1){
    enemyUD = 0;
    enemyLR = width;
  }
  else if (enemySpawn === 2){
    enemyUD = 0;
    enemyLR = 0;
  }
  else if (enemySpawn === 3){
    enemyUD = height;
    enemyLR = 0;
  }
  else{
    enemyUD = height;
    enemyLR = width;
  }
  let enemy = {
    position: createVector(enemyLR, enemyUD),
    speed: 5,
    size: 50,
  }
  enemyArray.push(enemy);
}

// enemy display with incorperated round based enemy spawning

function enemyDisp(){
  for (let enemy of enemyArray){
    fill("red");
    enemyMovement();
    square(enemy.position.x,enemy.position.y,enemy.size); 
  }
  if (enemyArray.length < roundKillCount+1 && lastEnemySpawn + 1000 < millis()){ // if 1 sec has passed, will spawn enemies according to the amount of enemies killed + 1, everytime you kill an enemy, total amount of possible enemies increases by 1
    for (let i = roundKillCount; i<roundKillCount+1; i++){
      spawnEnemies();
    }
    lastEnemySpawn = millis();
  }
}

// Enemy movement

function enemyMovement(){
  for (let i = 0; i < enemyArray.length; i ++) {

    let lerpAmount = enemyArray[i].speed/enemyArray[i].position.dist(char.position);
    enemyArray[i].position.lerp(char.position, lerpAmount/enemyArray.length);
  }
}

// check enemy hit detec with attack hit detec

function enemyHitDetec(){
  if (attacking){
    fill(0);
    circle(mouseX,mouseY,attackSize);
    for (let enemy of enemyArray){
      if (dist(enemy.position.x+enemy.size/2,enemy.position.y+enemy.size/2,mouseX,mouseY)<enemy.size/2+attackSize/2){
        enemyArray.splice(enemyArray.indexOf(enemy),1);
        roundKillCount += 1;
        killCount += 1;
      }
    }
  }
  else{
    fill(255);
    circle(mouseX,mouseY,attackSize);
  }
}

// change between 3 weapons, the larger, the slower

function changeWeapon(){
  if (weaponState !== 2 && direction === "up"){
    weaponState++;
    direction = "";
  }
  else if(weaponState !== 0 && direction === "down"){
    weaponState--;
    direction = "";
  }
  else if(direction === "up"){
    weaponState = 0;
    direction = "";
  }
  else if(direction === "down"){
    weaponState = 2;
    direction = "";
  }
  if (keyIsDown(49)){
    weaponState = 0;
  }
  else if (keyIsDown(50)){
    weaponState = 1;
  }
  else if (keyIsDown(51)){
    weaponState = 2;
  }
  if (weaponState === 0){
    attackSize = 50;
  }
  else if (weaponState === 1){
    attackSize = 100;
  }
  else if (weaponState === 2){
    attackSize = 150;
  }
}

// change weapon depending on mouse up or down

function mouseWheel(event){
  if (event.delta<0){
    direction = "up";
  }
  else if(event.delta>0){
    direction = "down";
  }
}

// Set attack display and calculate last attack

function attack(){
  if (weaponState === 0 && mouseIsPressed && millis() > lastAttack + WEAPON_1_WAIT){
    attackSpeed = 10;
    attacking = true;
    lastAttack = millis();
  }
  else if (weaponState === 1 &&mouseIsPressed && millis() > lastAttack + WEAPON_2_WAIT){
    attackSpeed = 8;
    attacking = true;
    lastAttack = millis();
  }
  else if (weaponState === 2 && mouseIsPressed && millis() > lastAttack + WEAPON_3_WAIT){
    attackSpeed = 5;
    attacking = true;
    lastAttack = millis();
  }
  else if (millis() > lastAttack + ATTACK_DUR/attackSpeed){
    attacking = false;
  }
  enemyHitDetec();
}



