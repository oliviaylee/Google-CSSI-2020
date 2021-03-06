/* global p5 */

// DO NOT EDIT THE FOLLOWING LINE
const p = new p5(() => {});

/*
Today's topics:

+ Review variables, conditionals, static variables
+ Named functions
+ HSB color scheme
+ Dynamic variables: mouseX and mouseY

*/ 

let backgroundColor, color1, color2, textColor, width, height, rectWidth, rectHeight, rectColor1, rectColor2, rectColor3, rectColor4;


p.setup = function () {
  // Canvas & color settings
  width = 600;
  height = 600;
  rectWidth = 100;
  rectHeight = 80;
  p.createCanvas(width, height);
  p.colorMode(p.HSB, 360, 100, 100);
  p.noStroke();
  
  // When used with only one argument, the color mode is greyscale.
  // 0 is black and 100 is white.
  backgroundColor = p.color(95);
  textColor = p.color(20);
  
  // When used with three arguments, the function takes, in this order:
  // HUE - 0 to 360 degrees on a color wheel - 0 is red, 120 is green and 240
  //       is blue.
  // SATURATION - 0 is no color (greyscale), and 100 is as bold as possible.
  // BRIGHTNESS - 0 is no light (black), and 100 is as bright as possible.
  color1 = p.color(0, 60, 60);
  color2 = p.color(200, 60, 60);
  rectColor1 = p.color(Math.floor(Math.random() * 360), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100));
  rectColor2 = p.color(Math.floor(Math.random() * 360), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100));
  rectColor3 = p.color(Math.floor(Math.random() * 360), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100));
  rectColor4 = p.color(Math.floor(Math.random() * 360), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100));
}


// WAS: function draw() { ... }
p.draw = function () {
  p.background(backgroundColor);
  // Call the drawCenterLine function here to run the three lines of code
  // contained in that function.

  // The red and blue circles:
  p.fill(color1);
  p.ellipse(0.25 * width, 0.5 * height, 50);
  p.fill(color2);
  p.ellipse(0.75 * width, 0.5 * height, 50);

  // The grey circle and the text:
  p.fill(textColor);
  p.ellipse(p.mouseX, p.mouseY, 50);
  p.text("Flip the Switch", 20, 20);
  drawCenterLine();
  
  // Rectangles
  p.fill(rectColor1);
  p.rect(0, 0, rectWidth, rectHeight);
  
  p.fill(rectColor2);
  p.rect((width-rectWidth), 0, rectWidth, rectHeight);
  
  p.fill(rectColor3);
  p.rect(0, (height-rectHeight), rectWidth, rectHeight);
  
  p.fill(rectColor4);
  p.rect((width-rectWidth), (height-rectHeight), rectWidth, rectHeight);
  
  if (p.mouseX < width/2) {
    dayMode();
  } else {
    nightMode();
  }
  
  // 1. Build in another toggle that responds to vertical movement across the center of the screen.
  if (p.mouseY < height/2) {
    upperHalf();
  } else {
    lowerHalf();
  }
  
  //2. Build a painting app with colored rectangles in the corners. 
  //Each time you move your mouse to a corner, have the background change to match that color.
  
  if (p.mouseX >= 0 && p.mouseX <= rectWidth && p.mouseY >= 0 && p.mouseY <= rectHeight) {
    backgroundColor = rectColor1;
  } else if (p.mouseX >= (width-rectWidth) && p.mouseX <= width && p.mouseY >= 0 && p.mouseY <= rectHeight) {
    backgroundColor = rectColor2;
  } else if (p.mouseX >= 0 && p.mouseX <= rectWidth && p.mouseY >= (height-rectHeight) && p.mouseY <= height) {
    backgroundColor = rectColor3;
  } else if (p.mouseX >= (width-rectWidth) && p.mouseX <= width && p.mouseY >= (height-rectHeight) && p.mouseY <= height) {
    backgroundColor = rectColor4;
  }
}

function drawCenterLine() {
  // This function will turn stroke on, draw the line, and then turn stroke
  // back off.
  // Remember a line segment in p5.js has four arguments: x1, y1, x2, y2
  p.stroke(textColor);
  p.line(width / 2, 0, width / 2, height);
  p.noStroke();
}

function nightMode() {
  // This function will change the background color to black when on the
  // right side of the screen.
  backgroundColor = p.color(20);
  textColor = p.color(20);
  color1 = p.color(0, 60, 60);
  color2 = p.color(200, 60, 60);
}

function dayMode() {
  // This function will change the background color to white when on the
  // left side of the screen.
  backgroundColor = p.color(95);
  textColor = p.color(20);
  color1 = p.color(0, 60, 60);
  color2 = p.color(200, 60, 60);
}

function upperHalf() {
  // This function will change the saturation and brightness of both circles
  // to the max when the cursor is in the upper half of the screen
  color1 = p.color(0, 100, 100);
  color2 = p.color(200, 100, 100);
}

function lowerHalf() {
  // This function will lower the saturation and brightness of both circles
  // when the cursor is in the upper half of the screen
  color1 = p.color(0, 40, 40);
  color2 = p.color(200, 40, 40);
}