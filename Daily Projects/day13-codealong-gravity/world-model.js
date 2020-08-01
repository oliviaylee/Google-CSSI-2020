/* globals Vector2D */

const kGravitationalConstant = 0.07;
const kFrictionCoeff = 0.01;
const kRepulsionThresholdDistance = 1.7;
const kRepusionRotationAngle = Math.PI * (1 - 1 / 3);

class Planetoid {
  // Constructs a "Planetoid" from a configuration dictionary that
  // contains:
  //
  // "x", "y" -- initial position
  // "radius", "mass" 
  //
  // Optionally: "vx", "vy" to specify initial velocity.
  //
  // Stores the configuration dictionary itself as the
  // "config" property of the planetoid
  constructor(config) {
    this.config = config;

    this.position = new Vector2D(config.x, config.y);
    this.radius = config.radius;
    this.mass = config.mass;

    if (config.vx != null && config.vy != null) {
      this.velocity = new Vector2D(config.vx, config.vy);
    } else {
      this.velocity = new Vector2D(0, 0);
    }
  }

  // On every timestep this is called to add this planetoid's velocity
  // vector to its position vector.
  //
  // The "world" arg should have properties "width" and "height" to
  // snap the position to a size so that objects that leave one
  // side appear on the other
  UpdatePosition(world) {
    this.position.add_scaled(this.velocity, 1.0);
    this.position.modulus(world);
  }

  // Newton's second law: f = ma. The function computes acceleration of
  // this planetoid as a result of the force and adds it to velocity.
  ApplyForce(force_vector) {
    this.velocity.add_scaled(force_vector, 1 / this.mass);
  }

  // calcualtes gravitation force on this planetoid of another
  //
  // The the "fake physics" of this simulation, gravity is an attractive
  // force that depends on mass of both
  //
  // At short distances it becomes repiulsive so that planetoids avoid
  // each other.
  GravitationalForceOf(other) {
    const vector_from_other = other.position.NewRelativeVector(this.position);
    const distance = vector_from_other.magnitude();

    let force = new Vector2D(0, 0);
    if (distance > 1 /* avoid division by zero */) {
      // F = GmM/r (not r-squared, because only 2d)
      let strengh =
        (kGravitationalConstant * this.mass * other.mass) / distance;
      force.add_scaled(vector_from_other, strengh / distance);
      if (distance / kRepulsionThresholdDistance < this.radius + other.radius) {
        force.rotate(kRepusionRotationAngle);
      }
    }
    return force;
  }

  // Frictional foces prevents velocity from becoming too high: force
  // increases as speed increases; but points in opposite direction
  FrictionalForce() {
    let speed = this.velocity.magnitude();
    let friction = speed ** 2 * this.radius * kFrictionCoeff;
    let force = new Vector2D(0, 0);
    force.add_scaled(this.velocity, -friction);
    return force;
  }
}

class World {
  // CTOR
  constructor(width, height, planetoids) {
    this.width = width;
    this.height = height;
    this.planetoids = planetoids;
  }

  // Calculation Gravitational interactions, includes Newton's third law:
  // the force on each objects equals the force it sends to the other.
  ComputeGravitationalInteractions(forces){
    const count = forces.length;
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        let force = this.planetoids[i].GravitationalForceOf(this.planetoids[j]);
        forces[i].add_scaled(force, 1.0);
        forces[j].add_scaled(force, -1.0);
      }
    }
  }

  // On each time step we:
  //
  // * compute gravitational effect of each plantoid on all others
  // * compute frictial force that slows them down
  // * computes accekerations of this resultant force and adds to 
  //   velocty
  // * updates position with velocity
  AdvanceTime() {
    const count = this.planetoids.length;
    let forces = this.planetoids.map(Vector2D.NewZero);

    this.ComputeGravitationalInteractions(forces)

    // Add friction to avoid velocities blowing up
    for (let i = 0; i < count; i++) {
      forces[i].add_scaled(this.planetoids[i].FrictionalForce(), 1);
    }

    for (let i = 0; i < count; i++) {
      this.planetoids[i].ApplyForce(forces[i]);
    }

    for (let i = 0; i < count; i++) {
      this.planetoids[i].UpdatePosition(this);
    }
  }
}