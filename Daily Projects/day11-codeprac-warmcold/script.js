/* global p5 */
// https://glitch.com/edit/#!/delicate-deep-bread?path=script.js%3A4%3A0

let p = new p5(() => {});

let width, height, backgroundColor, spherePosition, rectPosition, obstacleNo, wallNo, obstacles, walls, lives, wallX, wallY, wallWidth, wallHeight;

p.setup = function () {
  // Canvas & color settings
  width = 500;
  height = 400
  p.createCanvas(width, height);
  p.colorMode(p.HSB, 360, 100, 100);
  backgroundColor = 95;
  // This variable contains a JSON object
  spherePosition = {
    "x": 15,
    "y": p.height / 2
  }
  lives = 3;
  obstacleNo = 10;
  wallNo = 5;
  obstacles = new Array(obstacleNo);
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i] = new Obstacle();
  } 
  walls = new Array(wallNo);
  walls[0] = new Wall(145, 0, 50, 300);
  walls[1] = new Wall(300, 200, 50, 300);
  walls[2] = new Wall(50, 200, 50, 200);
  walls[3] = new Wall(400, 0, 50, 370);
  walls[4] = new Wall(230, 0, 130, 130);
}

p.draw = function () {
  p.background(backgroundColor);
  
  p.fill(0, 0, 0);
  p.ellipse(spherePosition.x, spherePosition.y, 20, 20);
  
  p.keyPressed = function() {
    if (p.keyCode === p.LEFT_ARROW){
      spherePosition.x -= 5;
    } else if (p.keyCode === p.RIGHT_ARROW){
       spherePosition.x += 5;
    } else if (p.keyCode === p.UP_ARROW){
       spherePosition.y -= 5;
    } else if (p.keyCode === p.DOWN_ARROW){
       spherePosition.y += 5;
    }
  }

  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].checkCollision();
    let distance = computeDistance(spherePosition, obstacles[i]);
    let distanceDescription = computeCategoryOfDistance(spherePosition, obstacles[i]);
    let y_pos = 20 + 10*i;
    p.textSize(10);
    p.text(`${p.round(distance)} from obstacle: ${distanceDescription}`, 5, y_pos);
  }
  p.text(`Lives Left: ${lives}`, 5, 20 + 10*(obstacles.length+1));

  for (let i = 0; i < walls.length; i++) {
    walls[i].display();
    walls[i].checkCollision();
  }
  
  // Endpoint marker for maze
  p.fill(0, 100, 100);
  p.rect(455, 0, 40, 40);
}

function computeDistance(point1, point2) {
  let deltaX = point1.x - point2.x;
  let deltaY = point1.y - point2.y;
  let distance = p.sqrt((deltaX **2) + (deltaY **2));
  return distance;
}

function computeCategoryOfDistance(point1, point2) {
  let distance = computeDistance(point1, point2);
  if (distance > 200) {
    backgroundColor = p.color(240,10, 100);
    return "Cold";
  } else if (distance > 50) {
    backgroundColor = p.color(120, 10, 100);
    return "Warm";
  } else {
    backgroundColor = p.color(0, 10, 100);
    return "Red Hot";
  }  
}

class Obstacle {
  constructor() {
    this.x = p.random(width);
    this.y = p.random(height);
    this.width = 20;
    this.height = 20;
  }
  
  checkCollision() {
    let hit = p.collideRectCircle(this.x, this.y, this.width, this.height, spherePosition.x, spherePosition.y, 20);
    if (hit) {
      lives = lives - 1; 
      p.fill(0, 0, 0);
      p.textSize(20);
      p.text(`You hit an obstacle. You have ${lives} lives left.`, 40, 100);
      spherePosition.x = 15;
      spherePosition.y = p.height / 2;
    }
  }
}

class Wall {
 constructor(wallX, wallY, wallWidth, wallHeight) {
   this.x = wallX;
   this.y = wallY;
   this.width = wallWidth;
   this.height = wallHeight;
 }
 display() {
  p.fill(0, 0, 0);
  p.rect(this.x, this.y, this.width, this.height);
 }
 checkCollision() {
   if (p.collideRectCircle(this.x, this.y, this.width, this.height, spherePosition.x, spherePosition.y, 20)) {
      let priorX = spherePosition.x-0.1;
      let priorY = spherePosition.y-0.1;
      spherePosition.x = priorX;
      spherePosition.y = priorY;
   }
 }
}