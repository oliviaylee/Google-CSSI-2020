/* global p5 */

// DO NOT EDIT THE FOLLOWING LINE
const p = new p5(() => {});

/*
Today's topics:

+ Variables
+ The draw() loop
+ Conditional statements
+ Hard-coded values

*/ 

let dvdImage, x, y, xVelocity, yVelocity;


// WAS: function setup() { ... }
p.setup = function () {
  p.createCanvas(800, 600);

  // We only want to load the logo once.
  dvdImage = p.loadImage("https://cdn.glitch.com/eaea72a4-ac6d-4777-b76e-f37d75959aa5%2Fdvd.jpeg?1515761833387");
  x = 10;
  y = 50;
  xVelocity = 5;
  yVelocity = 5;
}


// WAS: function draw() { ... }
p.draw = function () {
  p.background(220);
  // Draw the logo at the new position.
  
  if (x >= (800-200) || (x <= 0)) {
    xVelocity = -xVelocity;
  } 
  
  if (y >= (600 - 200) || (y <= 0)) {
    yVelocity = -yVelocity;
  }

  x += xVelocity;
  y += yVelocity;
  p.image(dvdImage, x, y, 200, 150);
}