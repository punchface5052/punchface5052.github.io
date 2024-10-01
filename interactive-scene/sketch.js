// Interactive Scene
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
}
let arrowX;
let arrowY;
let leftAngle;
let mouseD = 10;
let charX = 50;
let charY = 50;
let charD = 100;
let enemyState = "dead";
let enemyX;
let enemyY;
let enemyS = 50;
let enemyLR;
let enemyUD;
let killCount = -1;
let attackWidth = 50;
let attackHeight = 25;
let attackDistance = 1.25;
let speed = 5;
let enemySpeed = 0;
let weaponState = 0;
let direction = "";
let attacking = false;
let lastAttack = 0;
let attackSpeed = 1;
const ATTACK_DUR = 1000;
const WEAPON_1_WAIT = 1000;
const WEAPON_2_WAIT = 2000;
const WEAPON_3_WAIT = 3000;




function moveChar() {
  if (keyIsDown(87)) { //w
    charY -= speed;   
  }
  if (keyIsDown(83)) { //s
    charY += speed;   
  }
  if (keyIsDown(65)) { //a
    charX -= speed;   
  }
  if (keyIsDown(68)) { //d
    charX += speed;   
  }
}

function spawnEnemy(){
  enemyState = "alive";
  // enemyLR = random(1,2);
  // if (enemyLR === 1){
  //   enemyX = random(0,10);
  // }
  // else {
  //   enemyX = random(width-10,width);
  // }
  // enemyUD = random(1,2);
  // if (enemyUD === 1){
  //   enemyY = random(0,10);
  // } 
  // else{
  //   enemyY = random(height-10,height);
  // }
  enemyX = width/2;
  enemyY = height/2;
  killCount++;
}

function enemyMovement(){
  if (enemyX > charX){
    enemyX-=enemySpeed;
  }
  else if (enemyX<charX){
    enemyX +=enemySpeed;
  }
  if (enemyY > charY){
    enemyY+=enemySpeed;
  }
  else if (enemyY < charY){
    enemyY-=enemySpeed;
  }

}


// function hitDetec() {
//   if (dist(charD*attackDistance,charD*attackDistance,enemyX,enemyY)>charD*attackDistance+20){
//     enemyState = "dead";
//   }
// }

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
    attackWidth = 100;
    attackHeight = 10;
    attackDistance = 1.05;
  }
  else if (weaponState === 1){
    attackWidth = 75;
    attackHeight = 75;
    attackDistance = 1.5;
  }
  else if (weaponState === 2){
    attackWidth = 50;
    attackHeight = 200;
    attackDistance = 2;
  }
}

function attack(){
  if (weaponState === 0 && mouseIsPressed && millis() > lastAttack + WEAPON_1_WAIT){
    attackSpeed = 10;
    attacking = true;
    lastAttack = millis();
  }
  else if (weaponState === 1 &&mouseIsPressed && millis() > lastAttack + WEAPON_2_WAIT){
    attackSpeed = 5;
    attacking = true;
    lastAttack = millis();
  }
  else if (weaponState === 2 && mouseIsPressed && millis() > lastAttack + WEAPON_3_WAIT){
    attackSpeed = 3;
    attacking = true;
    lastAttack = millis();
  }
  else if (millis() > lastAttack + ATTACK_DUR/attackSpeed){
    attacking = false;
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
  square(enemyX,enemyY,enemyS);
  enemyMovement();
}

function charDisp(){
  arrowX = charX+1/2*charD;
  arrowY = charY;
  leftAngle = atan2(mouseY - arrowY, mouseX - arrowX);
  translate(arrowX, arrowY);
  fill(255);
  circle(0, 0, charD);
  rotate(leftAngle);
  if (attacking){
    fill(0);
    ellipse(charD*attackDistance, 0, attackWidth, attackHeight);
    fill(255);
  }
  else{
    fill(255);
    ellipse(charD*attackDistance, 0, attackWidth, attackHeight);
  }
}

function draw() {
  background(255);
  moveChar();
  attack();
  if (enemyState === "dead"){
    spawnEnemy();
  }
  else{
    enemyDisp();
    console.log(enemyX);
    enemyX++
  }
  fill(0);
  changeWeapon();
  text("Cheese",windowWidth/2,windowHeight/2);
  charDisp();
}