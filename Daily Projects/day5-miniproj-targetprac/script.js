/* global p5, createCanvas, colorMode, noStroke, setInterval, HSB, background, fill, rect, ellipse, mouseY, keyIsPressed, color, random, text, textSize, keyCode, noLoop */

// const p = new p5(() => {});

var width, height, objWidth, objHeight, bulletWidth, bulletHeight, c1, c2, c3, bulletVelocity, bulletX, bulletY, targetX, targetY, obstacleVelocity, obstacleX, obstacleY, score, timer;

function setup() {
  width = 600;
  height = 400;
  objWidth = 60;
  objHeight = 60;
  bulletWidth = 10;
  bulletHeight = 10;
  score = 0;
  timer = 30;
  
  createCanvas(width, height);
  colorMode(HSB, 360, 100, 100);
  noStroke();
  c1 = 0;
  c2 = 0;
  c3 = 0;
  bulletVelocity = 15;
  bulletX = objWidth;
  targetX = width-objWidth;
  targetY = objHeight;
  obstacleVelocity = 5;
  obstacleX = width / 2 ;
  obstacleY = 0;
  setInterval(moveTarget, 1000);
  setInterval(decreaseTimer, 1000);
}

function moveTarget() {
  targetY = Math.floor(Math.random() * height);
}

function decreaseTimer() {
  timer -= 1;
}

function draw() {
  background(95);
  bulletY = mouseY + (objHeight/2);
  
  // Score Tracker
  fill(0, 0, 0)
  textSize(15)
  text("Score: ", 20, 20);
  text(score, 70, 20);
  
  // Timer
  textSize(15)
  text("Timer: ", 20, 40);
  text(timer, 70, 40);
  
  // Instructions
  textSize(20)
  text("Press the spacebar to shoot", width/2 - 125, 30);
  
  // Shooter
  fill(c1, c2, c3);
  rect(0, mouseY, objWidth, objHeight);
  
  // Color changing of shooter
  c1 += 1
  c2 += 1
  c3 += 1
  if (c1 >= 360) {
    c1 = (c1 + 1) % 360;
  }
  if (c2 >= 100) {
    c2 = (c2 + 1) % 100;
  }
  if (c3 >= 100) {
    c3 = (c3 + 1) % 100;
  }
  
  // Bullets fired by pressing spacebar
  if (keyIsPressed && keyCode == 32) {
    bulletX += bulletVelocity;
    if (bulletX >= width) {
      bulletX = objWidth;
    }
    fill(color(0));
    rect(bulletX, bulletY, bulletWidth, bulletHeight);
  }
  
  // Target
  fill(0, 100, 100);
  ellipse(targetX, targetY, objWidth, objHeight);
  fill(0, 0, 100);
  ellipse(targetX, targetY, 0.6 * objWidth, 0.6 * objHeight);
  fill(0, 100, 100);
  ellipse(targetX, targetY, 0.36 * objWidth, 0.36 * objHeight);
  
  // Obstacle
  fill(0, 0, 0);
  ellipse(obstacleX, obstacleY, objWidth, objHeight);
  obstacleY += obstacleVelocity;
  if (obstacleY <= 0 || obstacleY >= height) {
    obstacleVelocity *= -1;
  }
  
  // Score increases by hitting target
  if (bulletX >= (targetX-0.3*objWidth) && bulletX <= (targetX+0.3*objWidth) && bulletY >= (targetY-0.3*objHeight) && bulletY <= (targetY+0.3*objHeight)) {
    score += 1;
  }
  
  // Score decreases by hitting obstacle
  if (bulletX >= (obstacleX-0.3*objWidth) && bulletX <= (obstacleX+0.3*objWidth) && bulletY >= (obstacleY-0.3*objHeight) && bulletY <= (obstacleY+0.3*objHeight)) {
    score -= 1;
  }
  
  // End game when time runs out
  if (timer == 0) {
    noLoop();
    fill(0, 0, 0);
    textSize(50);
    text("GAME OVER!", width/2 - 165, height/2 + 25);
  }
}


