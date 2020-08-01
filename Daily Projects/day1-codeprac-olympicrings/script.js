/* globals createCanvas, background, setup, draw, ellipse, rect, stroke, fill, noFill, strokeWeight, triangle */

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
  background(250);
  
  fill(250, 0, 0);
  stroke(250, 0, 0);
  triangle(20, 25, 100, 25, 60, 55);
  triangle(35, 75, 60, 0, 85, 75);
  
  fill(250, 250, 250);
  stroke(250, 250, 250);
  triangle(35, 75, 60, 55, 85, 75);
  
  fill(250, 0, 0);
  stroke(250, 0, 0);
  rect(0, 80, 40, 40);
  
  fill(95, 230, 90);
  stroke(95, 230, 90);
  rect(40, 80, 40, 40);
  
  fill(32, 225, 232);
  stroke(32, 225, 232);
  rect(0, 120, 40, 40);
  
  fill(255, 200, 20);
  stroke(255, 200, 20);
  rect(40, 120, 40, 40);
  

}