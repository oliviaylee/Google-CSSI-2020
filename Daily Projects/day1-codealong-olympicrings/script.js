/* globals createCanvas, background, setup, draw, ellipse, rect, stroke, fill, noFill, strokeWeight */

/*
Today's topics:

+ JavaScript functions
+ p5 library & coordinate system
+ Using reference documentation
+ RGB color theory
+ setup(), draw(), ellipse(), rect(), stroke(), fill(), noFill(), strokeWeight()

*/


/*
Content between slashes and stars are multi-line comments. Use these
when you need to explain something complex to someone reading your code.
*/

// Content behind double slashes is a single-line comment. Use it for plain
// English notes, or for code that you want to temporarily disable.

function setup(){
  // Code here runs only once
  createCanvas(800, 600);
}

function draw(){
  // Code here runs continuously
  background(220);
  
  //
  noFill();
  strokeWeight(5);
  
  
  stroke(0, 190, 255);
  ellipse(50, 50, 50, 50);
  
  stroke(0, 0, 0);
  ellipse(110, 50, 50, 50);
  
  stroke(250, 0, 0);
  ellipse(170, 50, 50, 50);
  
  stroke(250, 220, 0);
  ellipse(80, 75, 50, 50);
  
  stroke(90, 250, 0);
  ellipse(140, 75, 50, 50);
}