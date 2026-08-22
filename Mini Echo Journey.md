# Mini Echo: Iterative Quadruped Robot Development

## Overview

I wanted to build a small quadruped robot that could move around my house at a useful walking speed while remaining compact, lightweight, and inexpensive to build. Rather than designing the final robot immediately, I treated the project as an iterative engineering process. Each version was used to identify limitations in the previous design and inform the next.

The project progressed through three major prototypes, taking me from basic servo control and electronics to inverse kinematics, gait generation, mechanical optimisation, and integrated robot control.

---

# Version 1 — Prototyping the Concept

My first quadruped used inexpensive micro servos and AA batteries. The goal was not to build a high-performance robot immediately, but to establish whether I could create a functional walking mechanism.

<img width="900" alt="V1 prototype — micro servos and AA battery pack" src="images/mini-echo/v1-hero.jpeg" />

The first prototype quickly exposed several problems.

The micro servos were lightweight and inexpensive, but they had limited torque. The AA battery pack also could not deliver enough power to operate the servos effectively, particularly when multiple joints were moving simultaneously. I also found that the mechanical design was relatively inefficient, with unnecessary mass and poor mechanical advantage.

This version taught me an important lesson: **the performance of a robot is not determined by any single component. The motors, power system, mechanical structure, and control system all have to be designed as one system.**

The failures of the first prototype gave me the requirements for the next version.

---

# Version 2 — Servos, Inverse Kinematics and Walking

For the second prototype, I moved to more powerful **bus servos**. Unlike the previous servos, these could be connected through a daisy-chain communication system, significantly simplifying the electronics and allowing me to control a larger number of joints.

I redesigned the body and legs around the new actuators and built another fully 3D-printed quadruped.

This was also where the software side of the project became substantially more challenging.

To make the robot walk rather than simply move individual servos, I taught myself **inverse kinematics** and the trigonometry required to calculate joint angles from the desired position of each foot.

Instead of directly commanding each joint, I could specify where I wanted a foot to be and mathematically determine the corresponding joint configuration.

I then used these calculations to develop walking gaits, coordinating the movement of multiple legs to produce stable forward motion.

This prototype was a major step forward because I was no longer just assembling a robot. I was beginning to design the mathematical and control systems that allowed the robot to behave as a coordinated machine.

However, the mechanical design still had significant limitations. The robot worked, but it carried too much unnecessary weight in the legs and did not make efficient use of the available actuator torque.

---

# Version 3 — Mechanical Optimisation

The third version focused heavily on **mechanical efficiency**.

I redesigned the robot around a proper lithium-ion battery, reducing the limitations of the previous AA battery system while improving the overall power-to-weight ratio.

One of the largest mechanical changes was moving the actuators higher into the body and using linkages to transmit their motion to the legs.

<img width="900" alt="V3 bare mechanical frame — bus servos and linkages" src="images/mini-echo/v3-bare-frame.jpeg" />

This meant that the motors did not have to move as much mass as part of the leg itself. Reducing the distal mass of the legs improved the robot's mechanical efficiency and made faster movement possible without requiring proportionally larger actuators.

The entire robot remained **3D printed**, allowing me to rapidly iterate the geometry and test different mechanical configurations without requiring complex manufacturing.

This version became the foundation for what I eventually called **Mini Echo**.

---

# Mini Echo — Integrated System

Mini Echo was the result of the lessons from the previous prototypes.

<img width="900" alt="Mini Echo — final integrated quadruped" src="images/mini-echo/mini-echo-hero.jpeg" />

Rather than focusing on a single subsystem, I integrated the mechanical, electrical, and software improvements into one complete robot.

The final design incorporated:

* Lightweight 3D-printed mechanical structures
* Higher-mounted actuators with mechanical linkages
* Lithium-ion power
* Bus-connected servos
* Voltage and power monitoring
* An integrated power button
* A display for system information
* Wireless/controller-based operation
* Inverse-kinematics-based leg control
* Tuned walking gaits

<img width="900" alt="Mini Echo, alternate angle" src="images/mini-echo/mini-echo-alt.jpeg" />

The controller allowed me to operate the robot while the inverse kinematics system handled the underlying joint calculations.

As I continued tuning the gait, I was able to improve the coordination and consistency of the robot's walking motion significantly. The final system was capable of being controlled as a complete quadruped rather than as a collection of independently controlled servos.

---

# What I Learned

This project taught me how strongly mechanical design, electronics, and software interact in robotics.

The first version showed me that insufficient power and inefficient mechanics can make otherwise functional hardware unusable. The second taught me how mathematical modelling and inverse kinematics can transform individual actuators into a coordinated robotic system. The third pushed me to think more critically about **mass distribution, mechanical advantage, power-to-weight ratio, and system integration**.

Most importantly, I learned to approach robotics through iteration.

Each prototype had limitations, but those limitations became engineering requirements for the next version. Rather than trying to make the first design perfect, I used each failure to identify what needed to change.

The result was not just a robot dog, but a progression from basic servo experimentation to a more complete understanding of **robot kinematics, gait generation, power systems, actuator selection, mechanical optimisation, and iterative engineering design**.
