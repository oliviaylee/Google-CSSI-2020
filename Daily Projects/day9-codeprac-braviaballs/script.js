// https://glitch.com/edit/#!/burnt-plucky-channel?path=script.js%3A6%3A0

/* global p5 */

// DO NOT EDIT THE FOLLOWING LINE
const p = new p5 (() => {});


let dots, dotNumber, backgroundColor;

p.setup = function () {
  p.createCanvas(p.windowWidth - 20, p.windowHeight - 20);
  p.colorMode(p.HSB, 360, 100, 100);
  backgroundColor = 0;
  dots = [];
  dotNumber = 10;
  //dots = new Array(dotNumber);
  for (let i=0; i<dotNumber; i++) {
    let x = new BouncyDot();
    dots.push(x);
  }
}

p.draw = function () {
  backgroundColor += 1;
  if (backgroundColor >= 360){
    backgroundColor = 0
  }
  p.background(backgroundColor, 50, 50);
  
  // example with one dot
  for (let i=0; i<dots.length; i++) {
    dots[i].move();
    dots[i].display();
  }
  
  handleCollision();
}

function mousePressed() {
  // We'll use this for console log statements only.
  for (let i=0; i<dots.length; i++) {
    console.log(dots[i].x);
  } 
}

function handleCollision() {
  for (let i=0; i<dots.length; i++) {
    for (let j=i+1; j<dots.length; j++){
      let dot1 = dots[i];
      let dot2 = dots[j];
      let hit = p.collideCircleCircle(dot1.x, dot1.y, dot1.r*2, dot2.x, dot2.y, dot2.r*2);
      if (hit) {
        if (dot1.x > dot2.x && dot1.xVelocity < 0) {  
          dot1.xVelocity *= -1;
        } else if (dot1.x > dot2.x && dot1.xVelocity > 0) {  
          dot2.xVelocity *= -1;
        } else if (dot1.x < dot2.x && dot2.xVelocity < 0) {  
          dot2.xVelocity *= -1;
        } else if (dot1.x < dot2.x && dot1.xVelocity > 0) {  
          dot1.xVelocity *= -1;
        }
        
        if (dot1.y > dot2.y && dot1.yVelocity < 0) {  
          dot1.yVelocity *= -1;
        } else if (dot1.y > dot2.y && dot1.yVelocity > 0) {  
          dot2.yVelocity *= -1;
        } else if (dot1.y < dot2.y && dot2.yVelocity < 0) {  
          dot2.yVelocity *= -1;
        } else if (dot1.y < dot2.y && dot1.yVelocity > 0) {  
          dot1.yVelocity *= -1;
        }
      }
    }
  }
}


class BouncyDot {
  constructor() {
    // Randomly generate position
    this.x = p.random(p.width);
    this.y = p.random(p.height);
    // Randomly generate radius
    this.r = p.random(10, 15);
    // Randomly generate color
    this.color = p.random(360);
    // Randomly generate a master velocity (broken into components)...
    this.masterXvelocity = p.random(1, 3);
    this.masterYvelocity = p.random(1, 3);
    // ...and use those as starting velocities.
    this.xVelocity = this.masterXvelocity;
    this.yVelocity = this.masterYvelocity;
  }

  move() {
    this.x += this.xVelocity;
    this.y += this.yVelocity;
    // Standard bounce code - like the DVD logo, but for spheres.
    if (this.x + this.r > p.width) {
      this.xVelocity = -1 * this.masterXvelocity;
    }
    if (this.x - this.r < 0) {
      this.xVelocity = this.masterXvelocity;
    }
    if (this.y + this.r > p.height) {
      this.yVelocity = -1 * this.masterYvelocity;
    }
    if (this.y - this.r < 0) {
      this.yVelocity = this.masterYvelocity;
    }
  }

  display() {
    p.fill(this.color, 80, 70);
    p.noStroke();
    p.ellipse(this.x, this.y, this.r * 2);
  }
}

/* As stretch goals today, take a look at ways you can improve some of our programs:
* This code still has some literals that might be called “magic numbers” in it. Find them and refactor them.
* Go back to the raindrops activity from yesterday - refactor it with arrays and for loops.
*/