# RoboticsPortfolio

## Actuator Development

# Abstract

This project is the design of a compact, low-cost quasi-direct drive (QDD) actuator built to be practical to manufacture, assemble, and repair. My goal was to create an actuator that uses readily available components, requires minimal machining, and can be produced without expensive manufacturing processes. The final design combines a frameless brushless motor with a custom cycloidal gearbox inside a package approximately 55 mm in diameter.

The primary objective was to create a high-quality actuator capable of being reused across multiple robotics projects rather than producing a low-cost disposable mechanism, however the intended purpose is for a general purpose humanoid. Unlike many hobby actuators that rely heavily on plastic components, the entire structural assembly was designed from aluminium and steel to maximise service life, and resistance to wear.

Performance Requirements:

Mass:
Continuous Torque: 50nm
Maximum Torque: 90nm
Maximum Output Speed  rad/s volts
Maximum Output Power +/ − 
Current Control Bandwidth
Output Inertia



## Mechanical Design:

# Actuation Choice
Most actuators built for commercial purposes use fully or a largly custom components. In order to reduce costs and complexity a off the self framless motor has been selected to provide the magnet array and stator base. The actuator is built around the CubeMars RO80 KV105 frameless brushless motor.

This was selected because aswell as the base actuation hardware it also includes:
* Integrated Hall sensors for rotor position feedback
* Built-in temperature sensing

(https://www.cubemars.com/product/ro80-kv105-standard-with-hall-frameless-torque-motor.html)

<img width="1000" height="780" alt="1711590941730751915" src="https://github.com/user-attachments/assets/a9ca42d6-dfdb-4304-b7f3-7f732a45d9b2" />



# Gearbox

A cycloidal gearbox was selected instead of a planetary gearbox after comparing both mechanisms.

The target output torque required approximately a 40:1 reduction ratio, while fitting inside the limited diameter of the actuator.

Cycloidal drives provide several advantages:

* Higher torque density
* Greater shock resistance
* Longer service life
* Better load distribution

Unlike planetary gears where only a small portion of each tooth is loaded, cycloidal gearboxes distribute force across many lobes simultaneously. This significantly reduces contact stress and increases lifespan under repeated loading.

The gearbox uses:

Dual cycloidal discs
6 mm thick discs for increased strength
Hardened steel output pins
Steel outer ring
