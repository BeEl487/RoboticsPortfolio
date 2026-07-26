# Actuator Development

## Abstract

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



# Mechanical Design:

## Actuation Choice
Most actuators built for commercial purposes use fully or a largly custom components. In order to reduce costs and complexity a off the self framless motor has been selected to provide the magnet array and stator base. The actuator is built around the CubeMars RO80 KV105 frameless brushless motor.

This was selected because aswell as the base actuation hardware it also includes:
* Integrated Hall sensors for rotor position feedback
* Built-in temperature sensing

(https://www.cubemars.com/product/ro80-kv105-standard-with-hall-frameless-torque-motor.html)

<img width="1000" height="780" alt="1711590941730751915" src="https://github.com/user-attachments/assets/a9ca42d6-dfdb-4304-b7f3-7f732a45d9b2" />



## Gearbox

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


<img width="886" height="472" alt="Screenshot 2026-07-19 214139" src="https://github.com/user-attachments/assets/03b0ee56-b704-4b2c-b284-b78aaf6d65b6" />


## Outer Cycloidal Ring Design

The outer ring is a critical part in the actuator, heavily influencing the lifespan capabilities of the gearbox, so as a result several methods were investigated before arriving at the final design.

**First Concept**

The initial concept incorporated an aluminium housing, a press-fit steel outer race. The steel would reduce wear directly contacting the cycloidal disks while allowing the magority of the gearbox housing to remain aluminium. The outer race would be created using a wire EDM-manufactured profile due to its tall and thin features. This approach would have provided excellent wear resistance but required expensive wire EDM machining.

**Second Concept**

The second design replaced the wire EDM profile with individual dowel pins to reduce machining complexity. Due to tight spaces and machining constrainsts locator slots had to be removed for the dowl pins. The design then pivoted to rely on the outward radial forces generated the cycloidal disks to hold them in place.




However upon testing, it was realised as the cycloidal discs rotated, friction generated radial forces that caused the dowel pins to rotate within their holes. This led to a force moving the pins outside of their designated slot/hole locking the gearbox.


**Final Design**

The final design adopted a fully CNC-machined steel outer ring. Although this solution resulted in a slight increase in weight, it provided several significant advantages, including lower manufacturing cost, simpler assembly, improved structural rigidity, elimination of loose components, and reduced overall machining complexity. The integrated design also improves reliability by removing interfaces between separate wear components, resulting in a more robust and manufacturable gearbox.


## Manufacturing Constraints

Manufacturability was considered throughout the design process.

The project utilised in house CNC facilities, which introduced the following limitations:
* Limited to 3 axis cnc
* Single side machined parts are preffered

Although restrictive, this requirement also mirrors commercial machining practices where reducing setups significantly lowers manufacturing cost.

As a result, every aluminium component was designed to:

* Eliminate undercuts and multi-axis operations
* Minimise tool changes
* Require only standard end mills

This allows the complete actuator housing to be manufactured on a conventional 3-axis CNC machine.

The same design philosophy also reduces manufacturing costs when outsourcing production.

Pic of machined parts



## Motor Control Hardware

The chosen control device is the open source clone of the ODrive S1, the XDrive Mini motor controller. This controller provides a low-cost alternative to commercial ODrive hardware while supporting field-oriented control of brushless motors. Rotor position feedback is provided by the motor's Hall sensors together with a diametric encoder magnet mounted at the rear of the actuator. 

Incorparating the motor controller directly on the actuator allows for a complete actuation package to be used with minimal setup and integration.


