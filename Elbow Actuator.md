# Actuator Development - Wrist/Elbow Actuator

## Abstract

This project is the design of a compact, lightweight quasi-direct drive (QDD) actuator intended for use further out along a robotic arm, where low mass and high dynamic response matter more than raw torque. Building on the lessons learned from the first actuator (a 55 mm diameter unit built around a cycloidal gearbox), this second design trades reduction ratio and torque capacity for speed, responsiveness, and a smaller footprint. My goal was to design an actuator that is lighter, faster, and packaged as a vertical stack rather than a flat disc, so that it slots naturally into the tapering profile of an arm segment.

Because this actuator sits closer to the end effector, it does not need to produce the same continuous torque as a shoulder or hip joint actuator. Instead, the priority shifts to reducing reflected inertia and increasing output speed, while still using a geared transmission to keep the motor operating in an efficient torque/speed range. A two-stage layout was chosen: a frameless brushless motor mounted at the rear, driving a single-stage planetary gearbox at the front, with an output shaft running back down through the centre of the assembly.

Performance Requirements:

Mass: Target significantly lower than the first actuator, due to vertical stacking and reduced structural requirements
Continuous Torque: 10 Nm
Maximum Torque: TBD (testing pending)
Reduction Ratio: ~6:1 (see gearbox section for derivation)
Maximum Output Speed: Higher than first actuator, due to lower ratio
Current Control Bandwidth: TBD
Output Inertia: Lower than first actuator, due to smaller rotor and lighter gearset

# Mechanical Design

## Actuation Choice

As with the previous actuator, a frameless brushless motor was chosen over a fully custom wound motor to reduce cost and complexity. This time the CubeMars RO60 was selected instead of the RO80 used previously. The RO60 has a smaller 73 mm outer diameter, which allows the whole actuator to be narrower - a requirement driven by the vertical stack packaging, since the actuator now has to fit inside the taper of the arm rather than sit as a flat disc at a joint.

The RO60 was chosen for the same reasons as the RO80 in the previous build:

* Integrated Hall sensors for rotor position feedback
* Built-in temperature sensing
* No need to hand-wind a custom stator

Because this joint doesn't need to produce anywhere near the torque of the first actuator, a smaller-diameter motor is an easy trade to make - it directly shrinks the package and reduces mass, which matters more here since the actuator is carried by everything upstream of it in the arm.

## Gearbox

For this actuator, a single-stage planetary gearbox was chosen instead of the cycloidal gearbox used in the first design. This is a deliberate trade-off:

* Planetary gearboxes are lighter and simpler for lower ratios
* Stock gear sets are readily available, avoiding custom cycloidal profile manufacturing
* A single stage keeps the axial length shorter than a cycloidal stage of the same ratio
* Lower ratio suits a joint that needs speed and dynamic response over continuous torque

The gearbox uses stock off-the-shelf gears rather than custom-cut parts, which significantly reduces cost and lead time compared to the first actuator's fully machined cycloidal ring:

* Sun gear, planet gears, and ring gear - stock parts, part number S5OSU20L-0806 (sun/planet/ring set)
* 0.5 module gearset
* 100 tooth ring gear
* 40 tooth planet gears
* 20 tooth sun gear (motor input)
* Needle roller bearings for the planet gears, pressed together rather than machined as a single assembly

**Working out the ratio:**

For a standard planetary stage with the sun as input, the ring gear fixed, and the planet carrier as output, the ratio is:

Ratio = 1 + (Ring Teeth ÷ Sun Teeth)

With a 100 tooth ring and a 20 tooth sun:

Ratio = 1 + (100 ÷ 20) = 1 + 5 = **6:1**

This checks out against the required tooth relationship for a planetary set (Ring = Sun + 2 × Planet): 20 + (2 × 40) = 100, confirming the gear combination is geometrically valid.

A 6:1 ratio is a large drop from the ~40:1 used in the first actuator, which is intentional - at this stage of the arm, the priority is output speed and low reflected inertia rather than maximum continuous torque. The gearbox uses needle rollers on the planet gears and is press-fit together rather than bolted, which keeps the stage compact and removes several fasteners compared to a bolted assembly.

## Packaging - Vertical Stack Design

Unlike the first actuator, which was designed as a flat disc-shaped package to sit directly at a joint, this actuator uses a vertical (in-line) stack:

* Motor at the rear
* Planetary gearbox stage at the front
* Output shaft running back down through the centre of the stack, coaxial with the motor

This layout was chosen because the actuator needs to fit inside the taper of the arm segment rather than at a joint centre, where diameter is more constrained than length. Stacking the motor behind the gearbox, rather than beside it, keeps the outer diameter down to the 73 mm motor envelope, at the cost of extra length.

## Manufacturing Constraints

The vertical stack design means the housing is now a long assembly rather than a single disc, which introduces a new manufacturing constraint: the in-house CNC only has a working travel of 24 mm per segment. As a result, the housing had to be split into multiple shorter sections that bolt together end to end, rather than machined as one long tube.

This carries over the same manufacturing philosophy as the first actuator:

* 3-axis CNC only
* Single-side machining preferred per part
* No undercuts or multi-axis setups

But it also adds a new consideration specific to this design: every housing segment needs to line up concentrically with the next, since the motor, gearbox, and output shaft all share one axis. Register features (spigots/steps) between segments were used to keep the stack aligned during assembly, rather than relying on the bolts alone to hold concentricity.

[Pic of stacked housing segments]

## Motor Control Hardware

The actuator uses an MKS ODrive controller, the same style of open-source ODrive-based controller used on the first actuator, mounted at the rear of the stack behind the motor. As before, rotor position feedback comes from the motor's integrated Hall sensors, supplemented by a magnetic encoder for finer position resolution.

Keeping the same controller family as the first actuator means both designs can share firmware, tuning approach, and control software, which simplifies development across the whole arm rather than treating each joint as a one-off.

## Summary of Trade-offs vs First Actuator

| | First Actuator | Second Actuator |
|---|---|---|
| Location in arm | Shoulder/hip style joint | Near end effector (elbow/wrist) |
| Motor | CubeMars RO80 KV105 | CubeMars RO60 |
| Motor diameter | 80 mm class | 73 mm |
| Gearbox type | Dual-disc cycloidal | Single-stage planetary (stock gears) |
| Ratio | ~40:1 | ~6:1 |
| Continuous torque | 50 Nm | 10 Nm |
| Package shape | Flat disc | Vertical in-line stack |
| Gearbox parts | Fully custom CNC | Stock sun/planet/ring set |

This second actuator is intentionally the "fast and light" counterpart to the first "high torque and durable" actuator - together they represent two ends of the same actuator family, built around the same motor controller and design philosophy, but tuned for very different jobs on the same arm.
