// Arrays and Object Notation Assignment
// Liam Thorpe
// Oct. 8, 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(windowWidth, windowHeight);
}
let state = "title";
let highscore = 0;
let charX = 50;
let charY = 50;
let charD = 50;
let enemyArray = [];
let enemyState = "";
let roundKillCount = 0;
let enemyNumber = 0;
let enemyS = 50;
let enemyLR;
let enemyUD;
let killCount = -1;
let attackSize = 50;
let speed = 5;
const enemySpeed = 2;
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

function moveChar() {
  if (keyIsDown(87)&&charY-charD/2>0) { //w
    charY -= speed;   
  }
  if (keyIsDown(83)&&charY+charD/2<height) { //s
    charY += speed;   
  }
  if (keyIsDown(65)&&charX>0) { //a
    charX -= speed;   
  }
  if (keyIsDown(68)&&charX+charD<width) { //d
    charX += speed;   
  }
}

function spawnEnemies(){
  enemyLR = random();
  enemyUD = random();
  let enemy = {
    x: 0,
    y: 0,
    isLiving: true,
  };
  if (enemyLR < 0.5){
    enemy.x = 0;
  }
  else{
    enemy.x = width - enemyS; 
  }
  if (enemyUD < 0.5){
    enemy.y = 0;
  }
  else{
    enemy.y = height + enemyS; 
  }
  if (millis()>lastEnemySpawn+5000){
    enemyArray.push(enemy);
    lastEnemySpawn = millis();
  }
}

function enemyMovement(){
  for (let enemy of enemyArray){
    if (enemy.x+enemyS/2-charX > 0){
      enemy.x-=enemySpeed;
    }
    else if (enemy.x+enemyS/2-charX<0){
      enemy.x +=enemySpeed;
    }
    if (enemy.y+enemyS/2-charY > 0){
      enemy.y-=enemySpeed;
    }
    else if (enemy.y+enemyS/2-charY < 0){
      enemy.y+=enemySpeed;
    }
  }
}

function hitDetec() {
  for (let enemy of enemyArray){
    if (dist(charX,charY,enemy.x+enemyS/2,enemy.y+enemyS/2)<charD/2+enemyS/2){
      state = "title";
    }
  }
}

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
  mouseAttack();
}

function mouseAttack(){
  if (attacking){
    fill(0);
    circle(mouseX,mouseY,attackSize);
    for (let enemy of enemyArray){
      if (dist(enemy.x+enemyS/2,enemy.y+enemyS/2,mouseX,mouseY)<enemyS/2+attackSize/2){
        enemy.isLiving = false;
        enemyArray.pop();
      }
    }
  }
  else{
    fill(255);
    circle(mouseX,mouseY,attackSize);
  }
}

function mouseWheel(event){
  if (event.delta<0){
    direction = "up";
  }
  else if(event.delta>0){
    direction = "down";
  }

}

function enemyDisp(){
  for (let enemy of enemyArray){
    fill(255);
    enemyMovement();
    square(enemy.x,enemy.y,enemyS); 
  }
  if (enemyArray.length === 1){
    spawnEnemies();
  }
}

function charDisp(){
  moveChar();
  fill(255);
  circle(charX,charY,charD);
}

function titleState(){
  fill(0);
  textAlign(CENTER,CENTER);
  textSize(50);
  text("Click to begin",width/2,height/2);
  textSize(25);
  text("WASD to move",width/2,height/2+50);
  text("Click to attack",width/2,height/2+80);
  text("Scroll wheel to change weapon",width/2,height/2+110);
}
function reset(){
  charX = width/2;
  charY = height/2;
  // for (let enemy of enemyArray){
  //   enemy.isLiving = false;
  // }
  killCount = -1;
}

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

function alwaysRunning(){
  if (killCount !== -1&&killCount>highscore){
    highscore = killCount;
    text("Highscore = ",100,150);
    text(highscore,200,150);
  }
  else if (killCount!==-1){
    text("Highscore = ",100,150);
    text(highscore,200,150);
    text("Kill Count = ",100,100);
    text(killCount,200,100);
  }
}

function draw() {
  if (state === "title"&& !mouseIsPressed){
    titleState();
    reset();
  }
  else{
    gameState();
  }
  alwaysRunning();
}