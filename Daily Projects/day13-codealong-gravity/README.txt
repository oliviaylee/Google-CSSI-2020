    A simulation of "planetoids" interacting under the
    gravitational laws of a "fake" 2D physics.

It's organized as three parts:


visualization.js

draws the screen using p5 library

concepts: shapes, colors, position. time

this file alo configures the inital conditions


world_model.js

implements the "laws of physics" of the simulation

concepts:
"planetoids"; position, velocity, radius, mass
forces: gravity, friction



math_stuff.js

mathematical foundations I found useful for the physics implementation


concepts: 2d vectors: adding, scaling, rotatin
 cartesian and polar coodinates