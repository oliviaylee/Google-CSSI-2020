/* global p5 */
//https://glitch.com/edit/#!/necessary-responsible-horse?path=script.js%3A3%3A25

let p = new p5(() => {});

let backgroundColor, playerSnake, currentApple, score

const spacebar = 32;

p.setup = function() {
  // Canvas & color settings
  p.createCanvas(400, 400);
  p.colorMode(p.HSB, 360, 100, 100);
  backgroundColor = 95;
  p.frameRate(12);
  playerSnake = new Snake();
  currentApple = new Apple();
  score = 0;
}

p.draw = function () {
  p.background(backgroundColor);
  // The snake performs the following four methods:
  playerSnake.moveSelf();
  playerSnake.showSelf();
  playerSnake.checkCollisions();
  playerSnake.checkApples();
  // The apple needs fewer methods to show up on screen.
  currentApple.showSelf();
  // We put the score in its own function for readability.
  displayScore();
}

function displayScore() {
  //TODO: Add code to display the score
  p.fill(0);
  p.text(`Score: ${score}`, 20, 30);
}

class Snake {
  constructor() {
    this.size = 10;
    this.x = p.width/2;
    this.y = p.height - 10;
    this.direction = 'N';
    this.speed = 12;
    this.tail = [new TailSegment(this.x, this.y)];
  }
  
  // This method moves the Snake around.
  moveSelf() {
    if (this.direction === "N") {
      this.y -= this.speed;
    } else if (this.direction === "S") {
      this.y += this.speed;
    } else if (this.direction === "E") {
      this.x += this.speed;
    } else if (this.direction === "W") {
      this.x -= this.speed;
    } else {
      console.log("Error: invalid direction");
    }
  }

  showSelf() {
    p.stroke(240, 100, 100);
    p.noFill();
    p.rect(this.x, this.y, this.size, this.size);
    p.noStroke();
    for (let i=0; i < this.tail.length; i++) {
      this.tail[i].showSelf();
    }
  }

  checkApples() {
    //If the head of the snake collides with an apple...
    if (p.collideRectRect(this.x, this.y, this.size, this.size,
         currentApple.x, currentApple.y, currentApple.size, currentApple.size)) {
      // Make a new apple, increment the score.
      score += 1;
      currentApple = new Apple();
      this.extendTail();
    }
  }

  checkCollisions() {
    if (this.x < 0 || this.x >= p.width) {
       gameOver();
    } else if (this.y < 0 || this.y >= p.height) {
      gameOver();
    } else {
      // Nothing to do here.
    }
  }

  extendTail() {
    // Add a new segment by duplicating whatever you find at the end of the tail.
    let lastTailSegment = this.tail[this.tail.length -1];
    // Push a new tail segment to the end, using the same position as the
    // current last segment of the tail.
    this.tail.push(new TailSegment(lastTailSegment.x, lastTailSegment.y));
  }
}

class TailSegment {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 10;
  }

  showSelf() {
    p.fill(0);
    p.rect(this.x, this.y, this.size, this.size);
  }
}

class Apple {
  constructor() {
    this.x = p.round(p.random(p.width - 10));
    this.y = p.round(p.random(p.height - 10));
    this.size = 10;
  }

  showSelf() {
    p.fill(0, 80, 80);
    p.rect(this.x, this.y, this.size, this.size);
  }
}

p.keyPressed = function () {
  console.log("key pressed: ", p.keyCode)
  if (p.keyCode === p.UP_ARROW && playerSnake.direction != 'S') {
    playerSnake.direction = "N";
  } else if (p.keyCode === p.DOWN_ARROW && playerSnake.direction != 'N') {
    playerSnake.direction = "S";
  } else if (p.keyCode === p.RIGHT_ARROW && playerSnake.direction != 'W') {
    playerSnake.direction = "E";
  } else if (p.keyCode === p.LEFT_ARROW && playerSnake.direction != 'E') {
    playerSnake.direction = "W";
  } else if (p.keyCode === spacebar) {
    restartGame();
  } else {
    console.log("wrong key");
  }
}

function restartGame() {
  score = 0;
  playerSnake = new Snake();
  currentApple = new Apple();
  p.loop();
  console.log('Better luck next time.');
}

function gameOver() {
  p.stroke(0);
  p.text("GAME OVER (Sorry, Dave)", 50, 50);
  p.noLoop();
}