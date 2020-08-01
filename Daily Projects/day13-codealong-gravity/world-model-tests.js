/* globals Planetoid, World, Vector2D */

function TestWorldModel(assert) {
  suite("WorldModel", () => {
    suite("Planetoid", () => {
      test("ApplyForce (F=ma)", () => {
        let p = new Planetoid({ x: 0, y: 0, mass: 10 });
        let force = new Vector2D(20, -30);
        p.ApplyForce(force);
        assert.equal(p.velocity.x, 2);
        assert.equal(p.velocity.y, -3);
      });

      test("UpdatePosition (torus)", () => {
        let p = new Planetoid({ x: 40, y: 80, vx: -70, vy: 60 });
        let w = new World(50, 100, [p]);
        p.UpdatePosition(w);
        assert.equal(p.position.x, 20);
        assert.equal(p.position.y, 40);
      });

      test("Gravity is attractive at distance", () => {
        let p1 = new Planetoid({ x: 0, y: 500, radius: 10, mass: 1 });
        let p2 = new Planetoid({ x: 1000, y: 0, radius: 10, mass: 1 });
        let f = p2.GravitationalForceOf(p1);
        assert.isBelow(f.x, 0);
        assert.isAbove(f.y, 0);
      });

      test("Gravity is repulsive (slightly rotated) for overlapping planetoids", () => {
        let p1 = new Planetoid({ x: 0, y: -3, radius: 100, mass: 1 });
        let p2 = new Planetoid({ x: 1, y: 0, radius: 100, mass: 1 });
        let f = p2.GravitationalForceOf(p1);
        let angle = f.angle();
        assert.isBelow(Math.abs(angle), Math.PI / 2);
      });

      test("Friction opposes velocity (slightly)", () => {
        let p = new Planetoid({
          x: 0,
          y: 0,
          vx: 1000,
          vy: 1000,
          radius: 100,
          mass: 1
        });
        let f = p.FrictionalForce();
        assert.isBelow(f.x, 0);
        assert.isBelow(f.y, 0);
      });
    });

    suite("World", () => {
      // TODO(cssi-class): refactor for testabilty, (if we have time)
      test("AdvanceTime");
    });
  });
}