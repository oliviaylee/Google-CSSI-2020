/* global p5 */

// DO NOT DELETE THIS LINE
const p = new p5(() => {});

let backgroundColor, frogX, frogY, score, lives, carNumber, cars;

p.setup = function () {
  // Canvas & color settings
  p.createCanvas(500, 500);
  p.colorMode(p.HSB, 360, 100, 100);
  backgroundColor = 95;
  frogX = p.random(p.width);
  frogY = 480;
  score = 0;
  lives = 3;
  carNumber = 5;
  
  cars = new Array(carNumber);
  for (let i = 0; i< carNumber; i++) {
    cars[i] = new Car();
  }
}

p.draw = function () {
  p.background(backgroundColor);
  // Code for gold goal line
  p.fill(60, 80, 80);
  p.rect(0, 0, p.width, 50);
  // Code to display Frog
  p.fill(120, 80, 80);
  p.ellipse(frogX, frogY, 20);
  
  for (let i = 0; i<cars.length; i++) {
    cars[i].drawCar();
    cars[i].moveCar();
    cars[i].checkCollision();
  }
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

function checkWin() {
  // If the frog makes it into the yellow gold zone, increment the score
  // and move the frog back down to the bottom.
  if (frogY <= 50) {
    score++;
    frogX = p.random(p.width);
    frogY = 480;
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
  if (lives<=0 || score == 5) {
    p.text("GAME OVER", 100,p.height/2);    
    p.noLoop();
  }
}

class Car {
  constructor() {
    this.width = 40;
    this.height= 30;
    this.carType = p.floor(p.random(0,2));
    if (this.carType == 0) {
      this.carX = 0;
      this.carV = p.random(1, 5);
    } else if (this.carType == 1) {
      this.carX = p.width;
      this.carV = p.random(1, 5) * -1;
    }
    this.carY = p.random(6, 40) * 10;
    this.c1 = p.random(360);
    this.c2 = p.random(100);
    this.c3 = p.random(100)
  }
  
  drawCar() {
    p.fill(this.c1, this.c2, this.c3);
    p.rect(this.carX, this.carY, this.width, this.height);
  }
  
  moveCar() {
    this.carX += this.carV; 
    // Reset if it moves off screen
    if (this.carX >= p.width) {
      this.carX = 0;   
    } else if (this.carX <= 0) {
      this.carX = p.width; 
    }
  }
  
  checkCollision() {
    let hit = p.collideRectCircle(this.carX, this.carY, this.width, this.height, frogX, frogY ,40);
    if (hit) {
      lives--;
      frogX = p.random(p.width);
      frogY = 480;
      p.ellipse(frogX, frogY, 20);
      if (this.carType == 0) {
        this.carX = 0; 
        this.carV = p.random(1, 5);
      } else if (this.carType == 1) {
        this.carX = p.width; 
        this.carV = p.random(1, 5) * -1;
      }
      this.carY = p.floor(p.random(6, 40)) * 10;
    }
  }
}