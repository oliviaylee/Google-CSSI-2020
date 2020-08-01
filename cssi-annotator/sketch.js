let colorPicker, btn, penOn;
//let startX, startY, endX, rectWidth;

var s = function(sketch) {
  sketch.setup = function() {
    document.body.style['userSelect'] = 'none';
    let canvas = sketch.createCanvas(sketch.windowWidth, document.body.clientHeight);
    sketch.clear();
    sketch.colorMode(sketch.HSB, 360, 100, 100);
    color = sketch.color(0);
  }

  sketch.draw = function() {
    sketch.stroke(color);
    sketch.strokeWeight(4);
    if (sketch.mouseIsPressed && penOn) {
      sketch.line(sketch.mouseX, sketch.mouseY, sketch.pmouseX, sketch.pmouseY);
      /* RECTANGLE HERE
      let rectColor = sketch.color(120, 100, 100, 10);
      sketch.fill(rectColor);
      sketch.rect(sketch.mouseX, sketch.mouseY, 10, 20);*/
    }
    rectWidth = endX - startX;
    let rectColor = sketch.color(240, 50, 50);
    rectColor.setAlpha(0.5);
    sketch.fill(rectColor);
    sketch.noStroke();
    sketch.rect(startX, startY, rectWidth, 20);
  }

  /*
  if (sketch.mouseIsPressed) {
    console.log('testpress');
    startX = sketch.mouseX;
    startY = sketch.mouseY;
  }
  if (sketch.mouseIsReleased) {
    console.log('testrelease');
    endX = sketch.mouseX;
  }
  rectWidth = endX - startX;
  let rectColor = sketch.color(240, 50, 50);
  rectColor.setAlpha(0.5);
  sketch.fill(rectColor);
  sketch.noStroke();
  sketch.rect(startX, startY, rectWidth, 20);*/
}

var myp5 = new p5(s);

// COLOR PICKER & UI //

var p = function(pop) {
  pop.setup = function() {
    let popCanvas = pop.createCanvas(200, 10);
    colorPicker = pop.createColorPicker('#ed225d');
    colorPicker.position(0, 0);
    colorPicker.input(setColor);

    btn = pop.createButton('toggle pen');
    btn.position(50, 0);
    btn.mousePressed(togglePen);

    pop.colorMode(pop.HSB, 360, 100, 100);
  }

  function setColor() {
    color = colorPicker.color();
  }

  function togglePen() {
    penOn = !penOn;
  }
}

var myp5_p = new p5(p);
