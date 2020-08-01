class Vector2D {
  // constructs 2d vector from x, y components
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  // the length of the vector (pythagoras)
  magnitude() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  // The angle, in radians of this vector relative to x-axis.
  angle() {
    return Math.atan2(this.y, this.x);
  }

  // adds another ector to "this", scaled by given factor
  add_scaled(other, scale = 1) {
    this.x += other.x * scale;
    this.y += other.y * scale;
  }

  // rotates "this" by given angle, in radians
  rotate(angle) {
    let x = this.x * Math.cos(angle) - this.y * Math.sin(angle);
    let y = this.x * Math.sin(angle) + this.y * Math.cos(angle);
    this.x = x;
    this.y = y;
  }

  // keeps the x and y components in the bounds of space.width
  // and space.height"
  modulus(space) {
    this.x %= space.width;
    this.y %= space.height;
    if (this.x < 0) this.x += space.width;
    if (this.y < 0) this.y += space.height;
  }

  // creates a new vectore the represents the position
  // of "this" relative to "other"
  NewRelativeVector(other) {
    return new Vector2D(this.x - other.x, this.y - other.y);
  }
  
  // Returns a zero vector
  static NewZero() {
    return new Vector2D(0, 0);
  }
}