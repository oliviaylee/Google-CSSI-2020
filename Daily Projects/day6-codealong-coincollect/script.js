/* global p5 */

let p = new p5(() => {});

let brushHue, backgroundColor, coinX, coinY, score, time, gameIsOver, hit;

p.setup = function () {
  // Canvas & color settings
  p.createCanvas(400, 400);
  p.colorMode(p.HSB, 360, 100, 100);
  brushHue = 0;
  backgroundColor = 95;
  coinX = p.random(p.width);
  coinY = p.random(p.height);
  time = 1000;
  gameIsOver = false;
}

p.draw = function () {
  p.background(backgroundColor);
  handleCollision();
  p.ellipse(coinX, coinY, 20);
  p.ellipse(p.mouseX, p.mouseY, 20);
  p.text(`Time remaining: ${time}`, 20, 40);
  handleTime(); 
}

function handleCollision() {
  if (p.mouseX == coinX && p.mouseY == coinY) {
    coinX = p.random(p.width);
    coinY = p.random(p.height);
  }
}

function handleTime() {
  if (time > 0) {
    time -= 1;
  } else {
    gameIsOver = true;
    p.text('Game over', 20, 60);
  }
}