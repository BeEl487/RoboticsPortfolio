# Mechanical Hand Motion Capture for Sign Language Interpretation

**A Low-Cost Kinematic Tracking System Using Potentiometer-Based Joint Sensing**

*Engineering Research Portfolio*

<img width="563" height="472" alt="Screenshot 2026-07-20 210409" src="https://github.com/user-attachments/assets/6665b4e0-3471-4a97-ae93-dc076aa4909a" />

## Abstract

## 1. Introduction and Motivation


This project presents the design and development of a low-cost, accurate, and reliable mechanical hand-tracking system. Unlike conventional camera-based or IMU-based tracking methods, the system measures finger joint rotation directly using a mechanical exoskeleton with potentiometers, eliminating issues such as occlusion, lighting sensitivity, and sensor drift.

The system captures 15 channels of analogue joint-angle data through a custom ESP32-based PCB with analogue multiplexers, transmits the data wirelessly to a browser, and reconstructs a real-time 3D hand model using a kinematic pipeline. The project demonstrates how reliable hand tracking can be achieved using inexpensive, readily available components.



### 1.1 Success Criteria

**Primary objectives**
- Reliably collect high-quality joint tracking data
- Reconstruct a full kinematic structure of a person's hand from that data

**Secondary objectives**
- Reliably detect multiple distinct hand positions
- Automatically translate sign language gestures into text output

---

## 2. Background Research: Comparing Motion Capture Approaches

Three broad categories of hand-tracking technology were evaluated before settling on a design direction:

| Method | Strengths | Weaknesses |
|---|---|---|
| **Vision-based tracking** | No hardware worn on the hand | Requires an external camera rig; difficult to calibrate; highly sensitive to lighting conditions and occlusion; not portable |
| **IMU-based tracking** | Compact, wearable, no external rig needed | Accumulates drift over time; requires complex, repeated calibration to stay accurate |
| **Mechanical linkage tracking** | Measures joint angles directly; no drift; simple calibration; portable | Physically worn/attached hardware; more mechanically complex to build |

Vision systems were ruled out primarily due to portability and calibration overhead. IMU-based gloves were ruled out because sensor drift compounds over a session, and the complex calibration routines needed to counteract it would work against the goal of a simple, reliable data-collection tool.

Mechanical tracking was chosen because it **directly measures joint angles** rather than inferring them, which trades off some mechanical complexity for a large gain in reliability and ease of calibration.

### 2.1 Design Inspiration

The core geometric idea for the tracking arm was borrowed from robotics: an articulated robotic arm can determine a 3D end-effector position using just three rotational measurements — at the waist, shoulder, and elbow. This project applies the same principle at a much smaller scale, using a small tracking arm mounted above each finger to measure the equivalent rotations and derive an XYZ endpoint for the fingertip.

---

## 3. Sensor Selection

Three rotational sensing technologies were considered for measuring joint angle at each articulation point:

- **Magnetic (diametric) encoders** — accurate, but require dedicated per-axis electronics, which would significantly increase circuit complexity and part count across 16 sensing points.
- **Incremental encoders** — measure direction and speed of rotation via pulse counting, but the physical sensor packages (typically >10 mm) are too large to fit into a compact finger-mounted design.
- **Potentiometers** — measure rotation as a change in resistance. Sub-7mm diameter potentiometers exist, making them small enough to embed directly into the finger tracking hardware. Critically, potentiometers are **absolute** encoders: once calibrated, they retain their position reference without needing continuous recalibration, unlike incremental approaches.

Potentiometers were selected as the joint sensor for every articulation point in the final design.

---

## 4. Electronics and PCB Design

### 4.1 Why a Custom PCB

With 16 individual sensors requiring wiring, a custom PCB was designed rather than hand-wiring the circuit. This decision was driven by three factors:

1. **Footprint** — a custom board packages all electronics into a much smaller physical space than a hand-wired equivalent.
2. **Reliability** — soldered board connections are significantly less failure-prone than loose hand-soldered joints, which matters for a device that will be worn and flexed repeatedly.
3. **Wiring complexity** — routing 16 independent sensor channels by hand becomes unmanageable quickly; a PCB collapses this into a manageable, repeatable layout.

### 4.2 Microcontroller Choice: ESP32

The ESP32 was selected over a more conventional Arduino-class board for three reasons directly relevant to this project:

- **Low power consumption**, which supports the goal of an eventually portable, battery-powered device.
- **Built-in Wi-Fi**, enabling wireless transmission of tracking data to an offboard processing computer without a tethered data cable.
- **Abundant GPIO**, which is necessary groundwork even though the pin count problem was ultimately solved with multiplexing (see below).

### 4.3 Solving the Pin-Count Problem: Multiplexing

15 analog sensors need to report fingertip endpoint data, but wiring all 15 directly into the ESP32 would consume most of its available analog input pins and constrain which ESP32 variant could be used going forward. Instead, a multiplexer board sits between the sensors and the microcontroller, allowing a small number of ESP32 pins to selectively address and read from any of the 15 sensor channels in sequence.

### 4.4 Planned Additional Features

Time-permitting, two further features were scoped for the board:
- An **onboard voltage regulator** to support battery-powered operation.
- An **onboard IMU** to provide overall hand/wrist rotation data, complementing the finger-level joint data from the potentiometers.

### 4.5 Hardware Debugging

Two hardware issues surfaced during PCB assembly and were resolved through direct board rework:

- One of the ESP32's 3.3V supply pins had been mislabeled as ground on the board layout, which caused significant issues during initial testing. This was fixed by cutting the offending copper trace to disconnect the incorrect ground connection.
- Several ESP32 pins used for multiplexer communication turned out to be restricted to either input-only or output-only operation, which conflicted with the original wiring plan. This required additional patch wiring — cutting traces and manually rerouting connections — to get the multiplexer and ESP32 communicating correctly.

---

## 5. Firmware and Data Transmission

The ESP32 firmware was deliberately kept simple: its only job is to **cycle through the multiplexer's addresses, sample each sensor, and transmit the resulting joint data** — it does no kinematic computation itself. This is a conscious architectural choice:

- Offloading computation to an external device frees up the ESP32's limited processing power and keeps its role lightweight, which helps with both response speed and power draw.
- Processing logic is easier to iterate on, inspect, and modify on a full computer than on embedded firmware.

Data is transmitted over Wi-Fi to a companion website for real-time monitoring and visualization, avoiding the need for a wired connection during data collection.

---

## 6. Visualization and Kinematic Reconstruction

### 6.1 Website and 3D Model

The visualization frontend was built using JavaScript and HTML, and renders a 3D model of a human hand that updates live based on incoming sensor data. Key features include:

- IMU-driven rotation of the whole hand model in space.
- Manual controls for individual joint angles (useful for testing and debugging independent of live sensor data).
- A connection interface for pairing with the ESP32 over its IP address.
- A pose-estimation menu for distinguishing between different recorded hand signs.

### 6.2 Two-Stage Kinematic Pipeline

Because the ESP32 reports raw joint data from the *mechanical* linkage rather than the human finger itself, that data has to be translated into actual human finger joint angles before it means anything. This is done in two stages:

1. **Forward kinematics** is applied first, using the known geometry of the mechanical tracking linkage to calculate the XYZ endpoint position that the armature is currently reporting.
2. **Inverse kinematics** is then applied to that endpoint, substituting in standard human finger segment lengths, to back-calculate the corresponding human hand pose. This reconstructed pose is what drives the 3D hand model.

### 6.3 CCD Inverse Kinematics for the Virtual Armature

An additional, more direct approach was used to keep the virtual model visually matched to the real device: a virtual replica of the mechanical armature was built inside the website, positioned to mirror the physical device, with the real-world data driving the virtual copy. The endpoints of both the real fingers and the virtual armature are displayed as red reference points.

A **CCD (Cyclic Coordinate Descent) inverse kinematics solver** was then used to iteratively adjust the virtual finger joints until its endpoints matched the red target points from the mechanical data. This approach was chosen deliberately over a hard-coded IK equation, because a human hand has many degrees of freedom, which makes closed-form IK solutions difficult to set up and highly error-prone. CCD instead solves the problem iteratively and generalizes much better across the hand's joint complexity.

---

## 7. Calibration

Two calibration procedures were developed to make the raw sensor data usable:

1. **Angle conversion calibration** — converts raw potentiometer resistance readings into meaningful angular joint values. Once this calibration routine was built for one joint, it could be reused across all joints in the system.
2. **Homing sequence** — establishes the mechanical zero position of the linkage, so that all subsequent joint readings are measured relative to a consistent reference point.

---

## 8. Testing and Results

### 8.1 Pose Recognition Test

As an initial proof of concept, the system was tested on the index finger using two distinct poses: pointing upward and pointing downward.

**Method:** During a setup phase, the system records a wide range of data points while the user holds the target pose, rather than a single fixed snapshot. During recognition, the current joint position is compared against the *entire* set of recorded samples for each known pose — not just one reference position — which improves flexibility and robustness. The system computes the total angular error between the current joint positions and each recorded pose's sample set, and classifies the current pose as whichever recorded pose produces the lowest total error.

**Result:** The tracker reliably distinguished between the upward and downward finger positions without requiring additional manual tuning.

**Extensibility:** Because the software recording pipeline is modular, new poses can be added quickly by holding a record button while performing the new gesture — no code changes are required to add a pose.

### 8.2 Assessment Against Success Criteria

| Objective | Status |
|---|---|
| Reliably collect high-quality tracking data | Achieved |
| Reconstruct full kinematic hand structure | Achieved |
| Detect multiple hand positions | Partially achieved (validated on 2 poses) |
| Automatic sign-to-text translation | Not yet attempted (future work) |

As of the current build, the mechanical tracking system is considered a viable data-collection device, and its central goal — capturing real-world positional data from a human hand — has been successfully demonstrated.

---

## 9. Limitations

- **Mechanical backlash:** Joint tolerances have not been fully refined, producing an estimated ±3° of angular error per joint. This is currently within an acceptable range for pose detection but would benefit from tighter tolerancing.
- **No onboard power:** The device is currently tethered by its data cable and has no internal battery, despite the PCB already including a voltage regulator to support this in a future revision.
- **Fixed hand size:** The finger holders are sized specifically to the builder's own hand, limiting usability for other users. Adjustable Velcro straps or a clamping mechanism are the proposed fix.

---

## 10. Future Directions

- **Pose recognition scaling:** Move from angular-error-based pose matching toward a small neural network classifier, which would let the system recognize overall movement *patterns* rather than relying on fixed per-joint angular thresholds — improving flexibility and accuracy as the pose library grows.
- **Battery-powered operation:** Leverage the existing onboard regulator to remove the tether entirely.
- **Adjustable sizing:** Add strap- or clamp-based finger holders to support different hand sizes.
- **Full sign language translation pipeline:** Extend the current binary pose classifier toward a broader gesture vocabulary sufficient for basic sign language interpretation, and add text/speech output.
- **Remote manipulation applications:** Beyond sign language, the same low-cost mechanical tracking approach could be applied to teleoperated robotics — for example, remote control of surgical instruments or operation of robots in environments unsafe or inaccessible to humans.

---

## 11. Conclusion

This project set out to answer a narrow but important question: can a low-cost, mechanically-based hand tracking system reliably capture real human hand motion without the drift and calibration problems that plague existing vision- and IMU-based approaches? The prototype built here — a potentiometer-driven mechanical armature, a custom ESP32-based PCB, and a two-stage forward/inverse kinematics pipeline feeding a live 3D visualization — demonstrates that it can. While the current system is validated only on a small set of test poses and still has mechanical and ergonomic limitations to resolve, it establishes a working foundation for the longer-term goal of full sign language interpretation, and more broadly illustrates the potential of low-cost mechanical tracking systems across robotics, medicine, virtual reality, and human-computer interaction.

---

## Appendix: Figures

- **Figure 1** — Pose/Prediction pair (Test 1: index finger up)
- **Figure 2** — CCD inverse kinematics solver reconstructing the virtual armature from mechanical endpoint data

*(Insert corresponding image files here when preparing the GitHub repository, e.g. `figures/fig1_pose_prediction.png`, `figures/fig2_ccd_ik.png`)*
