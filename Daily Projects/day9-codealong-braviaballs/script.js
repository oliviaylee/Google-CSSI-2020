/* global p5 */

// DO NOT EDIT THE FOLLOWING LINE
const p = new p5 (() => {});


let dot1;

p.setup = function () {
  p.createCanvas(p.windowWidth - 20, p.windowHeight - 20);
  p.colorMode(p.HSL, 360, 100, 100);
  
  
  dot1 = new BouncyDot();
  
  // TODO: add more dots!
}

p.draw = function () {
  p.background(220, 0, 80);
  
  // example with one dot
  dot1.float();
  dot1.display();
  
  // TODO: use a for loop or a while loop to move and show all the dots
  // hint: when you create the dots, storing them in a way that is easy to
  // loop through can help here
}

function mousePressed() {
  // We'll use this for console log statements only.
  console.log(dot1.x);
}

class BouncyDot {
  constructor() {
    // Randomly generate position
    this.x = p.random(p.width);
    this.y = p.random(p.height);
    // Randomly generate radius
    this.r = p.random(5, 12);
    // Randomly generate color
    this.color = p.random(360);
    // Randomly generate a master velocity (broken into components)...
    this.masterXvelocity = p.random(0.5, 3);
    this.masterYvelocity = p.random(0.5, 3);
    // ...and use those as starting velocities.
    this.xVelocity = this.masterXvelocity;
    this.yVelocity = this.masterYvelocity;
  }

  float() {
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