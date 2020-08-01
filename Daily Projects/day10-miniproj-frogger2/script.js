// Name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions.
/* global createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, text, mouseX, mouseY, 
          strokeWeight, line,  mouseIsPressed, keyIsPressed, windowWidth, windowHeight, noStroke, keyIsDown, CONTROL
          frameRate, noFill, round, keyCode, loop, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize, W, A, S, D*/

// Collide2D functions:
/* global collideRectCircle */

// Since this example code uses the p5 collide2d library, be sure to remind
// students to load it in. Model how to do this by either connecting a local
// copy (included in the templates), connecting a hosted copy through a CDN, or
// (as a last resort) by pasting it in its entirety in this script as the first
// line.

let backgroundColor,
  winnieX,
  winnieY,
  tiggerX,
  tiggerY,
  scoreWinnie,
  scoreTigger,
  livesWinnie,
  livesTigger,
  winnieImage,
  loadImage,
  image,
  bees,
  beeNumber,
  tiggerImage,
  hunnyImage;

function preLoad() {
  winnieImage = loadImage(
    "https://cdn.glitch.com/3b2a5bc1-4c88-451d-b7c5-a181e1a38168%2Fc94eed56a5e84479a2939c9172434567c0147d4f.jpeg?v=1594993722111"
  );
  hunnyImage = loadImage(
    "https://cdn.glitch.com/3b2a5bc1-4c88-451d-b7c5-a181e1a38168%2Fhunny.jpg?v=1594996007572"
  );
  tiggerImage = loadImage(
    "https://cdn.glitch.com/3b2a5bc1-4c88-451d-b7c5-a181e1a38168%2Ftigger.png?v=1594996017827"
  );
}

function setup() {
  // Canvas & color settings
  createCanvas(500, 500);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 95;
  winnieX = 250;
  winnieY = 480;
  tiggerX = 210;
  tiggerY = 480;
  scoreWinnie = 0;
  scoreTigger = 0;
  livesWinnie = 3;
  livesTigger = 3;
  beeNumber = 5;
  bees = new Array(beeNumber);
  for (let i = 0; i < bees.length; i++) {
    bees[i] = new Bee();
  }
}

function draw() {
  background(backgroundColor);
  fill(60, 80, 80);
  rect(0, 0, width, 50);
  //image(winnieImage, winnieX, winnieY, 20);
  fill(120, 80, 80);
  ellipse(winnieX, winnieY, 20);
  ellipse(winnieX, winnieY, 20);
  fill(130, 80, 80);
  ellipse(tiggerX, tiggerY, 20);

  for (let i = 0; i < bees.length; i++) {
    bees[i].display();
    bees[i].move();
    bees[i].checkCollision();
  }

  keyPressedWinnie();
  keyPressedTigger();
  checkAddPoint();
  checkGameOver();
  displayScores();
}

function keyPressedWinnie() {
  if (keyCode === UP_ARROW) {
    winnieY -= 5;
  }

  if (keyCode === LEFT_ARROW) {
    winnieX -= 5;
  }

  if (keyCode === RIGHT_ARROW) {
    winnieX += 5;
  }

  if (keyCode === DOWN_ARROW) {
    winnieY += 5;
  }
}

function keyPressedTigger() {
  if (keyCode === 87) {
    tiggerY -= 5;
  }
  if (keyCode === 65) {
    tiggerX -= 5;
  }
  if (keyCode === 100) {
    tiggerX += 5;
  }
  if (keyCode === 83) {
    tiggerY += 5;
  }
}

function checkAddPoint() {
  if (winnieY <= 50) {
    scoreWinnie += 1;
    winnieY = 450;
  }
  if (tiggerY <= 50) {
    scoreTigger += 1;
    tiggerY = 450;
  }
}

function checkGameOver() {
  if (
    (livesWinnie <= 0 && livesTigger >= 0) ||
    (scoreWinnie < 5 && scoreTigger >= 5)
  ) {
    textSize(60);
    text("Tigger Wins!", 120, 175);
  }
  if (
    (livesWinnie >= 0 && livesTigger <= 0) ||
    (scoreWinnie >= 5 && scoreTigger < 5)
  ) {
    textSize(60);
    text("Winnie Wins!", 120, 175);
  }
}

function displayScores() {
  textSize(12);
  // Display Lives
  fill(0);
  text(`Winnie's Lives: ${livesWinnie}`, 10, 20);
  text(`Tigger's Lives: ${livesTigger}`, 10, 40);
  // Display Score
  fill(0);
  text(`Winnie's Score: ${scoreWinnie}`, 160, 20);
  text(`Tigger's Score: ${scoreTigger}`, 160, 40);
}

class Bee {
  constructor() {
    this.x = 0;
    this.y = Math.floor(Math.random() * 400) + 50;
    this.v = Math.floor(Math.random() * 4) + 1;
    this.width = 40;
    this.height = 30;
  }

  display() {
    fill(0, 80, 80);
    rect(this.x, this.y, this.width, this.height);
  }

  move() {
    this.x += this.v;
    if (this.x >= 500) {
      this.x = this.width * -1;
    }
  }

  checkCollision() {
    if (
      collideRectCircle(
        this.x,
        this.y,
        this.width,
        this.height,
        winnieX,
        winnieY,
        20
      )
    ) {
      winnieY = 450;
      livesWinnie -= 1;
    }
    if (
      collideRectCircle(
        this.x,
        this.y,
        this.width,
        this.height,
        tiggerX,
        tiggerY,
        20
      )
    ) {
      tiggerY = 450;
      livesTigger -= 1;
    }
  }
}