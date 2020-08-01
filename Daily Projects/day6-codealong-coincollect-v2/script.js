/* global createCanvas, background, colorMode, HSB, random, width, height,
   ellipse, mouseX, mouseY, text, collideCircleCircle, keyCode, RETURN, fill */

// let p = new p5(() => {});

let brushHue, backgroundColor, coinX, coinY, score, time, gameIsOver, hit;

function setup() {
  // Canvas & color settings
  width = 400;
  height = 400
  createCanvas(width, height);
  colorMode(HSB, 360, 100, 100);
  brushHue = 0;
  backgroundColor = 95;
  coinX = random(width);
  coinY = random(height);
  score = 0;
  time = 1000;
  gameIsOver = false;
}

function draw() {
  background(backgroundColor);
  ellipse(coinX, coinY, 20);
  ellipse(mouseX, mouseY, 20);
  text(`Time remaining: ${time}`, 20, 40);
  handleTime(); 
  
  hit = collideCircleCircle(coinX, coinY, 20, mouseX, mouseY, 20);
  if (hit) {
    handleCollision();
  }
}

function handleCollision() {
  if (!gameIsOver) {
    coinX = random(width);
    coinY = random(height);
    score += 1
  }
}

function handleTime() {
  if (time > 0) {
    time -= 1;
  } else {
    gameIsOver = true;
    text('Game over', 20, 60);
  }
}