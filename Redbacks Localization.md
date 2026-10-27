# Redbacks localization

VEX robots have no GPS, and wheel encoders drift. **lillet** is the C++ library I wrote so our robot always knows where it is.

**My role**

* Wrote the whole library: odometry, particle filter, motion controller.
* Built the browser simulator and the docs site.
* Wired it into the robot's code.

<ul class="glance"><li><b>200</b><span>pose guesses tracked</span></li><li><b>20</b><span>simulator tests passing</span></li><li><b>0.22 in</b><span>mean error in simulation</span></li><li><b>40 ms</b><span>localisation loop</span></li></ul>

* [lillet library docs](https://beel487.github.io/lillet/docs.html)
* [AMCL localisation simulator](https://beel487.github.io/lillet/Sim.html)

## How it works

Three layers, each fixing the last one's weakness.

* **Odometry:** a tracking wheel and IMU. Fast, but it drifts.
* **Distance sensors:** four sensors read the field walls. Accurate, but noisy.
* **Particle filter:** keeps 200 guesses of the robot's pose. Guesses that match the sensors survive. The rest die out.

## Watch it work

The simulator lets me test the filter before the robot moves.

<div class="fig-grid tall"><figure><img src="images/redbacks-code/sim-converged.jpg" alt="The green cloud of guesses has collapsed onto the robot" loading="lazy" /><figcaption>The green cloud of guesses has collapsed onto the robot</figcaption></figure><figure><img src="images/redbacks-code/sim-kidnap.jpg" alt="I pick the robot up and move it: the guesses scatter" loading="lazy" /><figcaption>I pick the robot up and move it: the guesses scatter</figcaption></figure><figure><img src="images/redbacks-code/sim-recovered.jpg" alt="Within a few updates the cloud finds it again" loading="lazy" /><figcaption>Within a few updates the cloud finds it again</figcaption></figure></div>

## Driving with it

* **Motion controller:** the robot chases a point just ahead of itself, so paths curve smoothly. A locked-sign turn profile stops it spinning back and forth near 180 degrees.
* **Autonomous planner:** click waypoints in the simulator, then copy them out as robot code.

<figure class="fig"><img src="images/redbacks-code/sim-auton-path.jpg" alt="A planned autonomous path running in the simulator." loading="lazy" /><figcaption>A planned autonomous path running in the simulator.</figcaption></figure>

## The code

<div class="fig-grid tall"><figure><img src="images/redbacks-code/code-09-mcl-update-sensor-likelihood.png" alt="Scoring each guess against the sensor readings" loading="lazy" /><figcaption>Scoring each guess against the sensor readings</figcaption></figure><figure><img src="images/redbacks-code/code-10-mcl-resample-and-estimate.png" alt="Resampling and the final pose estimate" loading="lazy" /><figcaption>Resampling and the final pose estimate</figcaption></figure></div>

**Source:** [github.com/BeEl487/Redbacks-optimal-vex-code](https://github.com/BeEl487/Redbacks-optimal-vex-code)
