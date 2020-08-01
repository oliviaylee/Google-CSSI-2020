/* global p5 */

// DO NOT DELETE THIS LINE
const p = new p5(() => {});

let backgroundColor, frogX, frogY, score, lives, gameIsOver, car1X, car1Y, car1V;

p.setup = function () {
  // Canvas & color settings
  p.createCanvas(500, 500);
  p.colorMode(p.HSB, 360, 100, 100);
  backgroundColor = 95;
  frogX = p.random(p.width);
  frogY = p.random(p.height);
  score = 0;
  lives = 3;
  gameIsOver = false;
  car1X = 0;
  car1Y = 100;
  car1V = 5;
}

p.draw = function () {
  p.background(backgroundColor);
  // Code for gold goal line
  p.fill(60, 80, 80);
  p.rect(0, 0, p.width, 50);
  // Code to display Frog
  p.fill(120, 80, 80);
  p.ellipse(frogX, frogY, 20);
  moveCars();
  drawCars();
  checkCollisions();
  checkWin();
  displayScores();
}

function keyPressed() {
  if (p.keyCode === p.UP_ARROW) {
    frogY -= 10;
  }
  if (p.keyCode === p.DOWN_ARROW) {
    frogY += 10;
  }
  if (p.keyCode === p.LEFT_ARROW) {
    frogX -= 10;
  }
  if (p.keyCode === p.RIGHT_ARROW) {
    frogX += 10;
  }
}

function moveCars() {
  // Move the car
  car1X += car1V;
  // Reset if it moves off screen
  if (car1X >= p.width) {
    car1X = 0;
  }
}

function drawCars() {
  // Code for car 1
  p.fill(0, 80, 80);
  p.rect(car1X, car1Y, 40, 30);
  // Code for additional cars
}

function checkCollisions() {
  // If the frog collides with the car, reset the frog and subtract a life.
  let hit = p.collideRectCircle(car1X, car1Y,40,30, frogX,frogY,40);
  if (hit) {
    lives--;
    frogX = p.random(p.width);
    frogY = p.random(car1Y,p.height);
    p.ellipse(frogX, frogY, 20);
  }

}

function checkWin() {
  // If the frog makes it into the yellow gold zone, increment the score
  // and move the frog back down to the bottom.
  if (frogY <= 50) {
    score++;
    frogX = p.random(p.width);
    frogY = p.random(car1Y, p.height);
  }
}

function displayScores() {
  p.textSize(12);
  p.fill(0);
  // Display Lives
  p.text(`Lives: ${lives}`, 10, 20);
  // Display Score
  p.text(`Score: ${score}`, 10, 40);
  // Display game over message if the game is over
  p.textSize(50);
  p.fill(360,100,100);
  if (lives<=0) {
    p.text("GAME OVER", 100,p.height/2);    
    p.noLoop();
  }
}