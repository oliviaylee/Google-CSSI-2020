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
  
  priorX = 0;
  priorY = 0;
}

p.draw = function () {
  chooseColors();  
  // 1. Have the strokeWeight oscillate between 5 and 15, emulating the stroke of a quill.
  p.strokeWeight(p.random(5, 15));
  p.line(priorX, priorY, p.mouseX, p.mouseY);
  
  priorX = p.mouseX;
  priorY = p.mouseY;
  // 3. Have the color only change when you press certain keys.
  if (p.keyIsPressed && p.key == 'a') {
    /*brushHue += 1;
    if (brushHue >= 360) {
      brushHue = (brushHue + 1) % 360;
      //brushHue = 0;
    }*/
    // 4. Have color change by assigning hue randomly.
    brushHue = p.random(360);
  }
}

//p.keyPressed = function () {
  //p.background(95); 
//}

// 2. Use other shapes in different configurations to create other effects.
p.mousePressed = function () {
  let x = Math.random() * 400;
  p.ellipse(p.mouseX, p.mouseY, 10);
}

function chooseColors() {
  p.stroke(brushHue, 50, 80);
  p.fill(brushHue, 50, 80);
}

/* Let's build off what you learned today with some applied practice!
5. Mess with the saturation, brightness, and background colors to create different color families.
*/