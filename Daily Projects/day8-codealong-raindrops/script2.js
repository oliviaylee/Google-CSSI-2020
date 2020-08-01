/* global p5 */

// DO NOT EDIT THE FOLLOWING LINE
const p = new p5(() => {});

let drops, dropNumber, windSpeed, height, width;
let c1 = p.random(360), c2 = p.random(100), c3 = p.random(100);

p.setup = function () {
  height = 500;
  width = 500;
  p.createCanvas(height, width);
  p.colorMode(p.HSB, 360, 100, 100);
  dropNumber = 50;
  windSpeed = p.random(-5, 5);
  // Remember, the argument/parameter order is: x, y, d, fallSpeed
  // If we don't want to specify x and y, we could make those random.  
  drops = new Array(dropNumber);
  for (let i=0; i<drops.length; i++) {
    drops[i] = new RainDrop(p.random(width), p.random(height), p.random(5, 15), p.random(1, 10));
  }

}

p.draw = function () {
  p.background(0, 0, 95);
  p.fill(c1, c2, c3);
  p.textSize(20);
  p.textFont("Courier New");
  p.text("Make it RAIN!", 160, 50);
  p.text("Cloudy With A Slight Chance of Wind", 40 , 270);
  
  // TODO: move and show Droplet2 and other drops you create!
  for (let i=0; i<drops.length; i++) {
    drops[i].show();
    drops[i].drip();
    drops[i].reset();
  }
  
  c1 += 0.5;
  c2 += 0.5;
  c3 += 0.5;
  
  if (p.keyIsPressed && p.keyCode == 32) {
    p.noLoop();
  }
}

class RainDrop {
  // The constructor will be called whenever you run `new RainDrop()`
  constructor(x, y, d, fallSpeed) {
    this.x = x; // x coordinate of raindrop
    this.y = y; // y coordinate of raindrop
    this.d = d; // diameter of the circle
    this.fallSpeed = fallSpeed;
  }

  show() {
    // TODO: draw your raindrop
    // hint: start with a circle
    p.noStroke();
    p.fill(c1, c2, c3);
    p.triangle(this.x, this.y-this.d, this.x-0.5*this.d, this.y-2, this.x+0.5*this.d, this.y-2);
    p.ellipse(this.x, this.y, this.d);
  }
  
  drip() {
    // TODO: move your raindrop in this function instead and call it in draw()
    // why? code simplicity - if the action is the same for all raindrops, we
    // can keep the logic in this function
    this.x += windSpeed;
    this.y += this.fallSpeed;
  }
  
  reset() {
    if (this.y >= height) { // if we reach the end of the screen - reset to a new position
      this.y = 0;
      this.x = p.random(width);
      c1 = p.random(360);
      c2 = p.random(100);
      c3 = p.random(100);
    }
  }
}

// Group Code: https://glitch.com/edit/#!/omniscient-fabulous-rhythm