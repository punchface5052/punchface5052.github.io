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
let state = "title"
let arrowX;
let arrowY;
let leftAngle;
let charX = 50;
let charY = 50;
let charD = 100;
let enemyState = "";
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
let enemySpeed = 1;
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

function spawnEnemy(){
  enemyState = "alive";
  enemyLR = round(random(1,2));
  if (enemyLR === 1){
    enemyX = 0;
  }
  else {
    enemyX = width-enemyS;
  }
  enemyUD = round(random(1,2));
  if (enemyUD === 1){
    enemyY = 0;
  } 
  else{
    enemyY = height-enemyS;
  }
  killCount++;
}

function enemyMovement(){
  if ((enemyX+enemyS/2)-(charX+charD/2) > 0){
    enemyX-=enemySpeed;
  }
  else if ((enemyX+enemyS/2)-(charX+charD/2)<0){
    enemyX +=enemySpeed;
  }
  if ((enemyY+enemyS/2)-charY > 0){
    enemyY-=enemySpeed;
  }
  else if ((enemyY+enemyS/2)-charY < 0){
    enemyY+=enemySpeed;
  }
}

function hitDetec() {
  if (dist(charX+charD/2,charY,enemyX+enemyS/2,enemyY+enemyS/2)<charD/2+enemyS/2){
    state = "title";
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
  fill(255);
  if (state === "game"&&enemyState!="dead"&&enemyState!="alive"){
    enemyState = "dead";
  }
  if (enemyState === "dead"){
    spawnEnemy();
  }
  else{
    enemyMovement();
    square(enemyX,enemyY,enemyS); 
  }
}

function charDisp(){
  moveChar();
  arrowX = charX+charD/2;
  arrowY = charY;
  leftAngle = atan2(mouseY - arrowY, mouseX - arrowX);
  translate(arrowX, arrowY);
  fill(255);
  circle(0, 0, charD);
  rotate(leftAngle);
  if (attacking){
    fill(0);
    ellipse(charD*attackDistance, 0, attackWidth, attackHeight);
    if ((arrowX < charD*attackDistance + attackWidth)&&(enemyY<arrowY*attackDistance+height)){
      enemyState = "dead"
    }
    fill(255);
  }
  else{
    fill(255);
    ellipse(charD*attackDistance, 0, attackWidth, attackHeight);
  }
}
function titleState(){
  fill(0);
  textAlign(CENTER,CENTER)
  textSize(50);
  text("Click to begin",width/2,height/2);
  textSize(25);
  text("WASD to move",width/2,height/2+50)
  text("Click to attack",width/2,height/2+80)
  text("Scroll wheel to change weapon",width/2,height/2+110);
}
function reset(){
  charX = width/2
  charY = height/2
  enemyState = "dead";
}

function gameState(){
  state = "game";
  strokeWeight(1)
  background(255);
  attack();
  changeWeapon();
  textSize(11);
  fill(0);
  text("Cheese",width/2,height/2);
  enemyDisp();
  charDisp();
  hitDetec();
}

function draw() {
  if (state === "title"&& !mouseIsPressed){
    titleState();
    reset();
  }
  else{
    gameState();
  }
}
