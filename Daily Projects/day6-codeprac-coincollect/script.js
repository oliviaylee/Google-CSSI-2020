/* global createCanvas, background, colorMode, HSB, random, width, height,
   ellipse, mouseX, mouseY, text, textSize, collideCircleCircle, keyCode, RETURN, fill */

// let p = new p5(() => {});

let brushHue, backgroundColor, coinX, coinY, score, time, gameIsOver, hit, coins;
let highScore = 0;

function setup() {
  width = 400;
  height = 400
  createCanvas(width, height);
  colorMode(HSB, 360, 100, 100);
  brushHue = 0;
  backgroundColor = 95;
  coinX = random(width);
  coinY = random(height);
  score = 0;
  time = 500;
  gameIsOver = false;
  
  coins = new Array(5);
  for (let i=0; i<coins.length; i++) {
    coins[i] = new Coin();
  }
}

function draw() {
  background(backgroundColor);
  text('Time remaining: ', 20, 40);
  text(time, 120, 40);
  text('Score: ', 70, 60);
  text(score, 120, 60);
  text('High Score: ', 42, 80);
  text(highScore, 120, 80);
  ellipse(mouseX, mouseY, 20);
  
  for (let i=0; i<coins.length; i++) {
    coins[i].draw();
  }
  
  if (time > 0) {
    time -= 1;
    
    for (let i=0; i<coins.length; i++) {
      if (coins[i].colliding()) {
        coins[i].handleCollision();
      }
    }
  } else {
    gameIsOver = true;
    textSize(20);
    text(`Game over. Press SPACE to restart.`, 40, 200);
    textSize(12);
  }
  
  if (score > highScore) {
    highScore = score;
    text(`New High Score!`, 20, 100);
  }
  
  keyPressed();
}
  
function keyPressed() {
  if (keyCode==32 && gameIsOver==true) {
    setup();
  }
}

class Coin {
  constructor() {
    this.width = 20;
    this.height = 20;
    this.coinX = random(width);
    this.coinY = random(height);
    this.coinType = Math.round(Math.random());
  }
  
  handleCollision() {
    score += 1;
    if (this.coinType==0) score += 5;
    else if (this.coinType==1) score += 50;
    this.move();
  }
  
  draw() {
    if (this.coinType==0) fill(0, 100, 100);
    else if (this.coinType==1) fill(220, 100, 100);
    ellipse(this.coinX, this.coinY, this.width, this.height);
    fill(0);
  }
  
  colliding() {
    return collideCircleCircle(this.coinX, this.coinY, 20, mouseX, mouseY, 20);
  }
  
  move() {
    this.coinX = random(width);
    this.coinY = random(height);
    this.coinType = Math.round(Math.random());
  }
}