// https://glitch.com/edit/#!/dwhipp-cssi-gravity?path=world_model_tests.js%3A6%3A22
/* globals Vector2D */

function TestMathStuff(assert) {
  suite("Vector2D", () => {
    test("zero", () => {
      assert.equal((new Vector2D).magnitude(), 0);
      assert.equal(Vector2D.NewZero().magnitude(), 0);
    });

    test("magnitude", () => {
      assert.equal(new Vector2D(3, 4).magnitude(), 5);
    });

    test("angle", () => {
      let v = new Vector2D(Math.sqrt(3 / 4), Math.sqrt(1 / 4));
      assert.approximately(v.angle(), Math.PI / 6, 1e-6);
    });

    test("add_scaled", () => {
      let base = new Vector2D(3, 7);
      let other = new Vector2D(1, 2);
      base.add_scaled(other, -2);
      assert.equal(base.x, 1);
      assert.equal(base.y, 3);
    });

    test("rotate", () => {
      let v = new Vector2D(Math.sqrt(3 / 4), Math.sqrt(1 / 4));
      v.rotate((Math.PI * 2) / 3);
      assert.approximately(v.x, -Math.sqrt(3 / 4), 1e-6);
      assert.approximately(v.y, Math.sqrt(1 / 4), 1e-6);
    });

    test("modulus positive", () => {
      let v = new Vector2D(27, 14);
      v.modulus({ width: 10, height: 5 });
      assert.equal(v.x, 7);
      assert.equal(v.y, 4);
    });
    
    test("modulus negative", () => {
      let v = new Vector2D(-27, -14);
      v.modulus({ width: 10, height: 5 });
      assert.equal(v.x, 3);
      assert.equal(v.y, 1);
    });

    test("NewRelativeVector", () => {
      let start = new Vector2D(2, 5);
      let end = new Vector2D(7, 3);
      let v = end.NewRelativeVector(start);
      assert.equal(v.x, 5);
      assert.equal(v.y, -2);
    });
  });
}