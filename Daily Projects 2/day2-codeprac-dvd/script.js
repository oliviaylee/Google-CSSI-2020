/* globals p5, createCanvas, background, setup, draw, ellipse, rect, stroke, fill, noFill, strokeWeight, triangle, tint */

// DO NOT EDIT THE FOLLOWING LINE
const p = new p5(() => {});

/*
Today's topics:

+ Variables
+ The draw() loop
+ Conditional statements
+ Hard-coded values

*/ 

let ball, x, y, xVelocity, yVelocity, xVelocity2, yVelocity2, c1, c2, c3;


// WAS: function setup() { ... }
p.setup = function () {
  p.createCanvas(800, 600);
  x = 10;
  y = 50;
  xVelocity = 1;
  yVelocity = 1;
}


// WAS: function draw() { ... }
p.draw = function () {
  p.background(220);
  p.fill(Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255));
  p.tint(Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255));
  p.ellipse(x, y, 50, 50);
  if (x <= 600) {
    yVelocity += 0.5;
  } else {
    yVelocity = 0;
    xVelocity = 0;
  }
  
  if (y >= 300) { // Touch floor
    yVelocity *= 0.93;
    yVelocity *= -1;
  }
  
  x += xVelocity;
  y += yVelocity;
}