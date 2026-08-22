# Python Projects

A collection of smaller Python projects I built outside of robotics, mostly focused on algorithms and simulations. I wrote them from scratch to understand how they actually work instead of relying on existing libraries.

These were built before I started using AI tools, so I had to figure things out myself through documentation, searching online, and a lot of debugging.

All of the projects below were run directly from the source in this repository to produce the screenshots shown.

## Path Tracer

<img src="images/python-projects/raytracer.png" alt="Path tracer render of three spheres and a light source" width="500" />

A CPU path tracer built from first principles: ray-sphere intersection, diffuse reflection via random hemisphere sampling, and light accumulation over multiple bounces (8 bounces, 150 samples per pixel). No rendering libraries - just vector math, a `PIL` image buffer, and Monte Carlo sampling. The visible noise is characteristic of path tracing at a finite sample count; more samples would converge to a cleaner image at the cost of render time (this 500x300 render took about a minute on CPU).

## Flappy Bird - NEAT Neural Network

<img src="images/python-projects/flappy-bird-neuralnet.png" alt="Screenshot of the Flappy Bird NEAT AI mid-flight" width="500" />

A NEAT-style (NeuroEvolution of Augmenting Topologies) neural network learns to play Flappy Bird from scratch. A generation of birds, each controlled by its own small neural network, plays simultaneously in a `pygame` window; birds that die are removed, and the survivors' networks are bred and mutated to produce the next generation. Over successive generations, average fitness (distance survived) increases as the population learns to time its jumps against incoming pipes.

<video width="500" controls preload="none" poster="images/python-projects/flappy-bird-best-poster.jpg">
  <source src="images/python-projects/flappy-bird-best.mp4" type="video/mp4" />
</video>

Recording of the best-performing bird from a later generation, navigating several pipes in a row.

## A* Pathfinding Visualizer

<img src="images/python-projects/pathfinder.png" alt="A* pathfinding grid showing explored nodes and the final path" width="500" />

An interactive `pygame` grid where the user places a start point, end point, and barriers with the mouse, then watches A* search the grid live. Red cells are nodes the algorithm has visited and closed off, and the purple line is the reconstructed shortest path once the end node is reached. The heuristic is Manhattan distance, appropriate since movement is restricted to four directions (no diagonals).

## Neural Network From Scratch

<img src="images/python-projects/nnet-training.png" alt="From-scratch neural network fitting a sine curve" width="500" />

A small neural network library built without any machine learning framework - just `numpy` for the matrix math. Weights are trained using numerical (finite-difference) gradient descent rather than backpropagation: each weight is nudged slightly, the change in cost is measured, and the resulting slope is used to update it. It's a much slower way to train a network than analytic backprop, but a useful way to confirm the cost function and forward pass are correct before implementing anything more complex. The chart above shows the network's output curve after training against a target `sin(2x)` curve.

## Tic-Tac-Toe Minimax AI

Two versions of a Tic-Tac-Toe AI, both built around exhaustively searching the game tree rather than any learned heuristic:

- An early version that searches move sequences by breadth (expanding all boards one ply at a time) and scores completed games as wins, losses, or draws for the computer.
- A cleaner rewrite using classic recursive minimax, alternating between maximizing and minimizing players at each depth of the tree.

Both play from the console. Testing surfaced real bugs in each version's edge-case handling (an unhandled empty-results case in the first, and a recursive call missing an argument when re-prompting for an invalid move in the second) - left as-is here as an honest record of where the logic still needs hardening, rather than quietly patched for the screenshot.

## Tic-Tac-Toe Neural Network

A from-scratch neural network (reusing the same `Layer`/`Network` structure as the sine-fitting project above) applied to Tic-Tac-Toe instead of minimax search, exploring what it takes to get a network to evaluate board positions directly rather than searching them.

## Wave Function Collapse (prototype)

An early-stage prototype of the wave function collapse procedural generation algorithm. Currently it only builds the initial grid of "all possibilities" per cell (each cell starts able to be either of two tile types); the actual entropy-based collapse and constraint propagation steps aren't implemented yet. Included here as a work-in-progress rather than a finished algorithm.

## VEX IQ Score Calculator

A small command-line utility that tallies a VEX IQ match score from raw match stats (cubes scored, red cubes knocked over, uniform bonus, lowest level reached, robots partially parked) - built to quickly check scores during my own VEX IQ season without doing the arithmetic by hand.

## MazeRush - Raycasted Maze Racer (Small Basic)

The one project on this page not written in Python - a two-player, first-person maze racing game called **MazeRush**, built in Microsoft Small Basic for a Year 9 Computer Science game dev assignment. The whole first-person 3D view is rendered by a raycasting engine I wrote myself in Small Basic, a language with no built-in 3D graphics at all.

<video width="500" controls preload="none" poster="images/python-projects/maze-generation-poster.jpg">
  <source src="images/python-projects/maze-generation.mp4" type="video/mp4" />
</video>

**Maze generation** uses a randomised depth-first-search "backtracker" algorithm: a cursor walks the grid carving a path into unvisited cells, pushing each new position onto a stack, and popping back off the stack to backtrack whenever it paints itself into a corner. A neighbour-count check (skip a cell if it already has more than one carved neighbour) stops the walk from carving loops back into itself, so the result is a single connected path with no cycles - a proper perfect maze, not just noise. Once the maze is carved, a key tile is spawned next to the walked path, which the player has to find and touch to unlock the exit door before the clock runs out.

**Rendering** is a simple ray-marching approach rather than true DDA: for each of 70 rays across a 90-degree field of view, the ray steps forward in small fixed increments along its angle until it lands on a non-empty map tile, and the distance travelled becomes that ray's wall-slice height on screen (closer walls -> taller slices). Each of the 70 rays draws one vertical strip, and the strips together produce the corridor-and-wall first-person view - the same core idea behind Wolfenstein 3D's renderer, just written from scratch in a language built for teaching, not games.

<video width="500" controls preload="none" poster="images/python-projects/maze-rush-gameplay-poster.jpg">
  <source src="images/python-projects/maze-rush-gameplay.mp4" type="video/mp4" />
</video>

The final version pivoted away from the original plan (placing pickup "charges" that would boost speed or visibility) after the projection math for object placement didn't come together in the assignment's time limit - it became a straight time-based two-player race through the maze instead, with a key-and-door unlock mechanic and a persistent leaderboard written to a local scores file.

*Music by Zack Lam.*
