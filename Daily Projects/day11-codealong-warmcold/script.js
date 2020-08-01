/* global p5 */
// https://glitch.com/edit/#!/beaded-sturdy-koala?path=script.js%3A5%3A14
let p = new p5(() => {});

let backgroundColor, spherePosition, rectPosition

p.setup = function () {
  // Canvas & color settings
  p.createCanvas(500, 400);
  p.colorMode(p.HSB, 360, 100, 100);
  backgroundColor = 95;
  // This variable contains a JSON object
  spherePosition = {
    "x": 100,
    "y": 100
  }
  rectPosition = {
    "x": 130,
    "y": 140
  }
}

p.draw = function () {
  p.background(backgroundColor);
  p.ellipse(spherePosition.x, spherePosition.y, 20, 20);
  p.rect(rectPosition.x, rectPosition.y, 20, 20);
  //p.line(spherePosition.x, spherePosition.y, rectPosition.x, rectPosition.y);
  let distance1 = computeDistance(spherePosition, rectPosition);
  //let roundedDistance = p.round(distance1);
  //let outputText = "They are " + roundedDistance + " apart.";
  //p.text(outputText, 20, 40);
  p.text(`The circle and sphere are ${p.round(distance1)} units apart.`, 20, 40);
  let mousePosition = {
   "x": p.mouseX,
   "y": p.mouseY
  }
  let distance2 = computeDistance(spherePosition, mousePosition);
  let distanceDescription = computeCategoryOfDistance(spherePosition, mousePosition);
  p.text(`The circle and your mouse are ${p.round(distance2)} apart; you're ${distanceDescription}`, 20, 60)
  
}

function computeDistance(point1, point2) {
  let deltaX = point1.x - point2.x;
  let deltaY = point1.y - point2.y;
  let distance = p.sqrt((deltaX **2) + (deltaY **2));
  return distance;
}

function computeCategoryOfDistance(point1, point2) {
  let distance = computeDistance(point1, point2);
  if (distance > 200) {
    backgroundColor = p.color(240,10, 100);
    return "cold";
  } else if (distance > 50) {
    backgroundColor = p.color(120, 10, 100);
    return "warmer";
  } else {
    backgroundColor = p.color(0, 10, 100);
    return "red hot";
  }
  
}

p.mousePressed = function () {
  spherePosition.x = p.random(p.width);
  spherePosition.y = p.random(p.height);
}