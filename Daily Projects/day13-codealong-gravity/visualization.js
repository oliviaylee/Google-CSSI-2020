/* globals p5, World, Planetoid */

let width = 700;
let height = 500;

let world1 = new World(width, height, [
  new Planetoid({
    x: width * 0.5,
    y: height * 0.5,
    radius: 40,
    mass: 2000,
    color: "green"
  }),
  new Planetoid({
    x: width * 0.7,
    y: height * 0.2,
    radius: 20,
    mass: 1000,
    color: "red"
  }),
  new Planetoid({
    x: width * 0.3,
    y: height * 0.4,
    radius: 15,
    mass: 500,
    color: "yellow"
  }),
  new Planetoid({
    x: width * 0.3,
    y: height * 0.6,
    radius: 15,
    mass: 500,
    color: "yellow"
  })
]);

let fixup_edges = true;

function MakeVisualization(world, scale) {
  return (p) => {
    p.setup = function() {
      p.createCanvas(world.width * scale, world.height * scale);
      p.ellipseMode(p.CENTER);
    };

    p.draw = function() {
      world.AdvanceTime();
      p.scale(scale);
      p.background(0, 0, 0, 70);

      for (let planetoid of world.planetoids) {
        const x = planetoid.position.x;
        const y = planetoid.position.y;
        const r = planetoid.radius;

        p.fill(planetoid.config.color);
        p.ellipse(x, y, r * 2);

        if (fixup_edges) {
          // The world is a torus; sometimes we need to show objects
          // that are patially on both, or many, sides of the canvas.
          const width = world.width;
          const height = world.height;
          if (x < r) {
            p.ellipse(x + width, y, r * 2);
          }
          if (y < r) {
            p.ellipse(x, y + height, r * 2);
          }
          if (x > width - r) {
            p.ellipse(x - width, y, r * 2);
          }
          if (y > height - r) {
            p.ellipse(x, y - height, r * 2);
          }
        }
      }
    };
  };
}

let p5_object = new p5(MakeVisualization(world1, 1.1), "id1");

// Debug Stuff

function Stop() {
  p5_object.noLoop();
}
function Start() {
  p5_object.loop();
}
function Once() {
  p5_object.redraw();
}
