// Mouse Data
// Interactive Code Section 4
function setup() {
  createCanvas(100, 100);
  noStroke();
}
function draw() {
  background(126);
  ellipse(16, mouseY, 33, 33);   // Top circle
  ellipse(50, mouseY/2, 33, 33); // Middle circle
  ellipse(84, mouseY*2, 33, 33); // Bottom circle
}

// Interactive Code Section 5 
function setup() {
  createCanvas(100, 100);
  noStroke();
}
function draw() {
  let x = mouseX;
  let y = mouseY;
  let ix = width - mouseX;  // Inverse X
  let iy = height - mouseY; // Inverse Y
  background(126);
  fill(255, 150);
  ellipse(height/2, y, x, x);
  fill(0, 159);
  ellipse(height/2, iy, ix, ix);
}

// Interactive Code Section 6
function draw() {
  background(255);
  frameRate(12);
  text(pmouseY - mouseY, 0, height/4);
}


// Mouse Keys
// Interactive Code Section 2
var c = 0
function setup() {
  createCanvas(100, 100);
  noStroke();
  fill(0);
  colorMode(HSB, 360, 100, 100)
}
function draw() {
  background(204);
  if (mouseButton == LEFT) {
    fill(0, 0, 0);   // Black
  }
  else if (mouseButton == RIGHT) {
    fill(c, 100, 100)
    c += 1
    c = c % 360
  }
  else {
    fill(0, 0, 50); // Gray
  }
  rect(40, 20, 40, 60);
}


// Keyboard Data
// Interactive Code Section 2
let x = 20;
let y = 20
function setup() {
  createCanvas(100, 100);
  strokeWeight(4);
}
function draw() {
  background(204);
  if ((keyIsPressed == true) && ((key == 'w') || (key == 'W'))) { // If the 'W' key is pressed,
    y--;                      // subtract 1 from y.
  }
  else if ((keyIsPressed == true) && ((key == 'a') || (key == 'A'))) { // If the 'A' key is pressed,
    x--;                      // subtract 1 from x.
  }
  else if ((keyIsPressed == true) && ((key == 's') || (key == 'S'))) { // If the 'S' key is pressed,
    y++;                      // add 1 to y.
  }
  else if ((keyIsPressed == true) && ((key == 'd') || (key == 'D'))) { // If the 'D' key is pressed,
    x++;                      // add 1 to x.
  }
  line(x, y, x-60, y+60);
}


// Coded Keys
// Interactive Code Section 2
let angle = 0;
function setup() {
  createCanvas(100, 100);
  stroke(0);
  colorMode(HSB, 360, 100, 100)
}
function draw() {
  background(204);
  if (keyIsPressed === true) {
    if ((keyCode >= 32) && (keyCode <= 126)) {
      // If the key is alphanumeric, // use its value as an angle
      angle = (keyCode - 32) * 3;
      fill(keyCode, 100, 100)
    }
  }
  arc(50, 50, 66, 66, 0, radians(angle));
}


// Mouse Events
// Interactive Code Section 2
let gray = 0;
function setup() {
  createCanvas(100, 100);
  background(0)
}
function mousePressed() {
  gray += 20;
  background(gray)
}
function mouseReleased() {
  background(0)
}


// Wheel Events
let cnv;
let x;
let g;
function setup() {
  cnv = createCanvas(100, 100);
  cnv.mouseWheel(changeSize); // attach listener for activity on canvas only
  x = width / 2;
  g = 100;
}
function draw() {
  background(g);
  ellipse(x, height / 2, 10, 10);
}
// this function fires with mousewheel movement anywhere on screen
function mouseWheel() {
  g = g + 10;
}
// this function fires with mousewheel movement over canvas only
function changeSize(event) {
  if (event.deltaY > 0) {
    x = x + 10;
  }
  else {
    x = x - 10;
  }
}


// Key Events
// Interactive Code Section 2
let drawT = false;
let drawO = false;
function setup() {
  createCanvas(100, 100);
  noStroke();
}
function draw() {
  background(204);
  if (drawT == true) {
    rect(20, 20, 60, 20);
    rect(39, 40, 22, 45);
  }
  else if (drawO == true) {
    ellipse(50, 50, 70, 70);
    fill(204);
    ellipse(50, 50, 35, 35);
    fill(255);
  }
}
function keyPressed() {
  if ((key == 'T') || (key == 't')) {
    drawT = true;
  }
  else if ((key == 'O') || (key == 'o')) {
    drawO = true;
  }
}
function keyReleased() {
  drawT = false;
  drawO = false;
}