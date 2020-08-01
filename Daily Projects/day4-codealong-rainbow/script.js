/* global p5 */

// DO NOT DELETE THE FOLLOWING LINE
const p = new p5(() => {});

/*
Today's topics:

+ keyPressed() and mousePressed()
+ More HSB color mode
+ Mouse input data
+ random() function

*/


let brushHue, priorX, priorY;

p.setup = function () {
  // Canvas & color settings
  p.background(95);
  p.createCanvas(400, 400);
  p.colorMode(p.HSB, 360, 100, 100);
  brushHue = 0;
  p.strokeWeight(6);
  
  //priorX = 0;
  //priorY = 0;
  // Without this, priorX and priorY have undefined/null values. 
  // For JavaScript, this is ok.
  // For other programming languages, attempitng to use a variable that hasn't been initialized yet 
  // could be catastrophic. Leads to a bug in the code.
}

p.draw = function () {
  chooseColors();
  //p.rect(p.mouseX, p.mouseY, 15, 15); // Gives chunky lines
  
  //p.strokeWeight(p.random(10));
  //if (p.mouseIsPressed) {
  p.line(priorX, priorY, p.mouseX, p.mouseY);
  //}
  
  priorX = p.mouseX;
  priorY = p.mouseY;
  brushHue += 1;
  if (brushHue >= 360) {
    brushHue = (brushHue + 1) % 360;
    //brushHue = 0;
  }
}

p.keyPressed = function () {
  p.background(95);
}

p.mousePressed = function () {
  let x = Math.random() * 400;
  p.ellipse(p.random(400), p.random(400), 10);
}

function chooseColors() {
  p.stroke(brushHue, 50, 80);
  p.fill(brushHue, 50, 80);
}