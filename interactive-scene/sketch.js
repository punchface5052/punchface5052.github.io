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
let attackWidth = 50;
let attackHeight = 25;
let attackDistance = 1.25;
let speed = 5;
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

function changeWeapon(){
  if (weaponState !== 2 && direction === "up"){
    weaponState++;
  }
  else if(weaponState !== 0 && direction === "down"){
    weaponState--;
  }
  else if(direction === "up"){
    weaponState = 0;
  }
  else if(direction === "down"){
    weaponState = 2;
  }
  if (weaponState === 0){
    attackWidth = 60;
    attackHeight = 20;
    attackDistance = 1.15;
  }
  else if (weaponState === 1){
    attackWidth = 50;
    attackHeight = 50;
    attackDistance = 1.25;
  }
  else if (weaponState === 2){
    attackWidth = 50;
    attackHeight = 100;
    attackDistance = 1.45;
  }
}

function attack(){
  if (weaponState === 0 && mouseIsPressed && millis() > lastAttack + WEAPON_1_WAIT){
    attackSpeed = 4;
    attacking = true;
    lastAttack = millis();
  }
  else if (weaponState === 1 &&mouseIsPressed && millis() > lastAttack + WEAPON_2_WAIT){
    attackSpeed = 2;
    attacking = true;
    lastAttack = millis();
  }
  else if (weaponState === 2 && mouseIsPressed && millis() > lastAttack + WEAPON_3_WAIT){
    attackSpeed = 1;
    attacking = true;
    lastAttack = millis();
  }
  else if (millis() > lastAttack + ATTACK_DUR/attackSpeed){
    attacking = false;
  }
}

function mouseWheel(event){
  if (event.delta > 0){
    direction = "up";
    event.delta = 0;
  }
  else if(event.delta<0){
    direction = "down";
    event.delta = 0;
  }
  return false;
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
  changeWeapon();
  fill(0);
  text("Cheese",windowWidth/2,windowHeight/2);
  charDisp();
}