/* global p5 */
//https://glitch.com/edit/#!/grave-steadfast-horesradish?path=script.js%3A4%3A0
//Change color of snake
//Power ups
//Obstacles spawn a certain dist away from the snake so it doesn't spawn on top of you and you die
//Time sensitive apples

let p = new p5(() => {});

let backgroundColor, playerSnake, currentApple, currentObstacle, score, lives, gameIMG;
let isGameOver;
let baseFrameRate = 5;
let highScore = 0;
let c1 = p.random(360);
let c2 = p.random(100);
let c3 = p.random(100);

const spacebar = 32; //32 is the keyCode for the spacebar!

p.setup = function () {
  // Canvas & color settings
  p.createCanvas(400, 400);
  p.colorMode(p.HSB, 360, 100, 100);
  backgroundColor = 95;
  p.frameRate(baseFrameRate); //original was 12, made slower for testing
  playerSnake = new Snake();
  currentApple = new Apple();
  currentObstacle = new Obstacle();
  score = 0;
  lives = 3;
  isGameOver = false;
  gameIMG = p.loadImage("https://cdn.glitch.com/a6a6051b-2fd7-4ef8-9848-6e94ef934e0c%2Fgameo.jpg?v=1595380192494");
}

p.draw = function() {
  console.log("game over? " + isGameOver);
  p.background(backgroundColor);
  // The snake performs the following four methods:
  playerSnake.moveSelf();
  playerSnake.showSelf();
  playerSnake.checkCollisions();
  playerSnake.checkApples();
  playerSnake.checkObstacles();
  if(!isGameOver) {
  // The apple needs fewer methods to show up on screen.
  currentApple.showSelf();
  //obstacle
  currentObstacle.showSelf();
  }
  // We put the score in its own function for readability.
  displayInfo();
  levelUp();
  if (lives <= 0) {
    gameOver();
  }
}


function displayInfo() {
  p.fill(0);
  p.text(`Score: ${score}`, 20, 20);
  p.text(`High Score: ${highScore}`, 20, 40);
  p.text(`Lives: ${lives}`, 20, 60);
  //p.textFont('MonsterGame-EjB9.ttf');
  // p.fontRegular = MonsterGame-EjB9.ttf('assets/Regular.otf');
}

function levelUp() {
  let level = p.floor(score / 5);
  p.frameRate(baseFrameRate + 3 * level);
  console.log("you are on level " + level + "!");
}

function restartGame() {
  isGameOver = false;
  score = 0;
  playerSnake = new Snake();
  currentApple = new Apple();
  p.loop();
}

function gameOver() {
  isGameOver = true;
  p.background(220);
  p.image(gameIMG, 100, 100, 300, 250);
  if (score > highScore) {
    highScore = score;
  }
  p.noLoop();
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
    this.tail.unshift(new TailSegment(this.x, this.y));
    this.tail.pop();
  }

  showSelf() {
    p.stroke(240, 100, 100);
    p.fill(c1, c2, c3);
    p.rect(this.x, this.y, this.size, this.size);
    for (let i = 0; i < this.tail.length; i++) {
      this.tail[i].showSelf();
    }
    c1 += 1;
    c2 += 1;
    c3 += 1;
  }

  checkApples() {
    // If the head of the snake collides with the apple...
    if (p.collideRectRect(this.x, this.y, this.size, this.size, currentApple.x, currentApple.y, currentApple.size, currentApple.size)) {
      // Make a new apple, increment the score, and extend the tail.
      for (let i = 0; i < (currentApple.type+1); i++) {
        score += 1;
        this.extendTail();
      }
      currentApple = new Apple();
    }
  }
  
  checkObstacles() {
    let hit = p.collideRectCircle(this.x, this.y, this.size, this.size, currentObstacle.x, currentObstacle.y, currentObstacle.size);
    if (hit) {
      lives -= 1;
      currentObstacle.x = p.round(p.random(p.width - 10));
      currentObstacle.y = p.round(p.random(p.height - 10));
    }
  }

  checkCollisions() {
    if (this.x < 0 || this.x >= p.width) {
       gameOver();
    } else if (this.y < 0 || this.y >= p.height) {
      gameOver();
    } else if (this.tail.length > 2) {
      for (let i=1; i < this.tail.length; i++) {
        if (this.x == this.tail[i].x && this.y == this.tail[i].y) {
          gameOver();
        }
        // This helper text will show the index of each tail segment.
        // text(i, this.tail[i].x, this.tail[i].y)
      }
    } 
  }

  extendTail() {
    // Add a new segment by duplicating whatever you find at the end of the tail.
    let lastTailSegment = this.tail[this.tail.length - 1];
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
    this.type = p.round(p.random(2));
  }

  showSelf() {
    if (this.type == 0) {
      p.fill(0, 80, 80);
    } else if (this.type == 1) {
      p.fill(120, 80, 80);
    } else if (this.type == 2) {
      p.fill(240, 80, 80);
    }
    p.rect(this.x, this.y, this.size, this.size);
  }
}

class Obstacle {
  constructor() {
    this.x = p.round(p.random(p.width - 10));
    this.y = p.round(p.random(p.height - 10));
    this.size = 20;
  }

  showSelf() {
    p.fill(0, 80, 80);
    p.ellipse(this.x, this.y, this.size, this.size);
  }
}

p.keyPressed = function () {
  console.log("key pressed: ", p.keyCode);
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