# Vision-guided robot hand

A hand that looks at an object, traces its outline, and places each finger against it. It grips the shape it actually sees.

**My role**

* Designed the whole pipeline: detection, outline, grasp planner, finger kinematics.
* Built the MuJoCo simulation and the desktop app.
* Wrote the tests and the decision log.

<ul class="glance"><li><b>4</b><span>fingers, 8 servos</span></li><li><b>~4,500</b><span>object names YOLOE knows</span></li><li><b>2</b><span>grasp planners</span></li><li><b>Dry run</b><span>no real hand yet</span></li></ul>

## How it works

Four short steps from camera to fingers.

1. **Find the object.** YOLOE draws a box around it and names it.
2. **Trace the outline.** An edge detector runs inside that box only, so the background is ignored.
3. **Plan the grasp.** Contact points are scored for force closure, then turned into finger angles.
4. **Move the fingers.** Positions are smoothed so the grasp stays steady.

<figure class="fig"><img src="images/robot-hand/overview-crop.jpg" alt="The pipeline run on real photos (three of 22 shown). Green is the outline, orange is a hole, dots are fingertip contacts." loading="lazy" /><figcaption>The pipeline run on real photos (three of 22 shown). Green is the outline, orange is a hole, dots are fingertip contacts.</figcaption></figure>

## From one picture to a plan

One test on a cup. The camera picture goes in, a grasp plan comes out.

<div class="fig-grid "><figure><img src="images/robot-hand/cup_raw.png" alt="1. The camera picture" loading="lazy" /><figcaption>1. The camera picture</figcaption></figure><figure><img src="images/robot-hand/cup_outline.png" alt="2. The outline found inside the box" loading="lazy" /><figcaption>2. The outline found inside the box</figcaption></figure><figure><img src="images/robot-hand/cup_plan.png" alt="3. Planned thumb and finger contacts" loading="lazy" /><figcaption>3. Planned thumb and finger contacts</figcaption></figure></div>

## Holes and awkward shapes

Holes are kept. A donut's middle, a mug handle and scissors' finger loops all count as edges the fingers can use.

<div class="fig-grid tall"><figure><img src="images/robot-hand/doughnut-edges.jpg" alt="Edge methods compared on a doughnut" loading="lazy" /><figcaption>Edge methods compared on a doughnut</figcaption></figure><figure><img src="images/robot-hand/scissors-boxes.jpg" alt="Scissors: every box the detector finds" loading="lazy" /><figcaption>Scissors: every box the detector finds</figcaption></figure><figure><img src="images/robot-hand/scissors-plan.jpg" alt="Scissors: the finger plan" loading="lazy" /><figcaption>Scissors: the finger plan</figcaption></figure></div>

## Keeping hold when the hand covers the object

When the hand covers the object, the outline disappears. A tracker keeps the last good outline so the grasp stays steady.

<figure class="fig"><img src="images/robot-hand/scissors_1_strip.png" alt="Scissors tracked as the hand covers them, left to right." loading="lazy" /><figcaption>Scissors tracked as the hand covers them, left to right.</figcaption></figure>

## Simulation

The hand and a palm camera run in MuJoCo using Pollen Robotics' model. The camera matches the real Arducam (70 degrees, 1280 x 800).

<div class="fig-grid "><figure><img src="images/robot-hand/vision_plane_control.png" alt="The vision plan drives the simulated fingers" loading="lazy" /><figcaption>The vision plan drives the simulated fingers</figcaption></figure><figure><img src="images/robot-hand/hand_workspace.png" alt="Where the fingers can reach" loading="lazy" /><figcaption>Where the fingers can reach</figcaption></figure></div>

## Using it

The plan is worked out on every picture, but the fingers never move by themselves. Press **Space** to save the grasp and move the fingers to it. After one second the servos close to finish the grasp. Let go and it returns to live pictures. This has only been run on the simulated hand, as a dry run.

## Where it stands

* The pipeline, planner and kinematics work, with an automated test suite.
* **Not tried on a real hand yet.** The hands are on order.
* **No grasp lifts an object in simulation yet.** The simulation proves the pipeline end to end, nothing more.
* Every decision, number and failure is logged in `DECISIONS.md`.

**Source:** [github.com/BeEl487/RobotHand](https://github.com/BeEl487/RobotHand)
