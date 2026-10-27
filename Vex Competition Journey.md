# VEX Robotics: Team 4613B (Barker College)

**Name:** Brandon Lai  
**Team:** 4613B - Barker Redbacks  
**Robot:** Whisper  
**Season:** VEX HIGH STAKES (2023–2024)

## Personal Motivation

Coming from VEX IQ, I wanted to take the next step into a more demanding robotics environment where I could apply what I had learned to larger, more complex systems. Joining VEX Robotics gave me the opportunity to move beyond building and programming within a simpler platform and start working with more advanced mechanical design, autonomous systems, CAD, and competition-driven engineering.

What interested me most was the iterative nature of competitive robotics. A design might work in testing but fail under match conditions, meaning every subsystem had to be designed, tested, measured, and refined. I wanted to understand not just how to build a robot, but how to engineer one that could perform reliably under pressure.

<img width="2000" height="1500" alt="Whisper robot" src="images/vex/whisper-2.jpg" />
<img width="2000" height="1500" alt="Whisper robot" src="images/vex/whisper-3.jpg" />



## Contributions/Roles

- **Team Captain**
- **Lead Designer** 
- **Lead Programmer** 

## Competition Results

- **Australian Nationals - Winner**
- **VEX Worlds Alliance Captain - 13th in Division**

<img width="900" alt="Whisper with the VEX V5 High Stakes National Championship 2024 banner" src="images/vex/nationals-win.jpeg" />

## Engineering Documentation

The robot was developed through continuous design, testing, and iteration. The engineering notebook documents the design decisions, failed prototypes, testing results, CAD development, and reasoning behind the final systems.

The engineering notebook provides a more in-depth overview of the robot and the engineering process behind it.



[2024 High Stakes Nationals Notebook.pdf](https://github.com/user-attachments/files/31305593/2024.High.Stakes.Nationals.Notebook.pdf)

---

# V5RC - Middle School

## Barker Redbacks MS

As part of the same Barker Redbacks program, 4613B also competed in the **V5RC Middle School** division - moving from VEX IQ’s plastic platform onto full VEX V5 metal hardware.

### Nationals

The team competed at Nationals, running pit setup, qualification matches, and autonomous routines with the V5 robot, and won the event.

---

# V5RC - Middle School Worlds

## Barker Redbacks MS

Following the Nationals win, the team advanced to the World Championship with the V5 robot.

### My Role

* **Team Captain**

### Contributions

* [Insert]

### Event Results

| Statistic | Result |
| --- | ---: |
| Qualification Rank | [Insert] |
| Qualification Record | [Insert] |
| Alliance | [Insert] |
| Alliance Selection | [Insert] |
| Result | [Insert] |

---

# VEX Robotics Personal Portfolio: Team 4613O (Barker College)
**Name:** Brandon Lai
**Team:** 4613O (Barker College)  
**Robot:** Switch
**Season:** VEX OVERRIDE (2025–2026)  

---

## Personal Motivation

Joining VEX Robotics Team 4613O was driven by a desire to take on complex mechanical and software challenges under tight, high-stakes constraints. Rather than focusing purely on theoretical engineering, I wanted to build a high-performance system from the ground up - one where every gram of structure, millisecond of cycle time, and line of code directly impacted our competition standing. 

The 2025–2026 VEX OVERRIDE season brought strict power limits and restrictive possession rules, making it the ideal stage to test creative mechanical design, advanced software architectures, and rigorous testing methodologies. Beyond the tech, I wanted to experience true team iteration: pushing past initial design failures, refining solutions, and delivering a reliable machine under pressure.

---

## Overview of Contributions

* **Powertrain & Power Sharing:** Engineered the robot’s custom 55W powertrain layout and developed a passive Dual Gravity Ratchet Transmission (PTO). This allowed us to dynamically route motor power between the intake and lift without the weight or complexity of active pneumatic shifters.
* **Structural Engineering & CAD:** Redesigned stock structural components into custom, weight-reduced L-profiles to lower total robot mass and lower the center of gravity while keeping high-impact stress points well below material yield thresholds.
* **Autonomous & Control Systems:** Built the full autonomous navigation pipeline from scratch. Integrated Adaptive Monte Carlo Localisation (AMCL) with an IMU, distance sensors, and dual-wheel odometry to eliminate drift and ensure precise, repeatable field trajectories.
* **System Testing & Calibration:** Led physical testing regimes to map pneumatic consumption curves, measure drivetrain friction, and tune closed-loop motor controllers for consistent execution across multi-match tournament days.

---

## Key Achievements

* **55W Power Optimisation:** Successfully bypassed strict motor limits through passive gravity ratchets, delivering maximum available torque to both the drive and the Double Reverse Four-Bar (DR4B) lift mechanism.
* **High-Precision Autonomous Trajectories:** Kept autonomous pose deviation under **1.4 inches** across full-field routes using custom particle-filter sensor fusion.
* **Pneumatic Efficiency:** Achieved **24 full scoring cycles** on a single air tank - exceeding match length demands by 20% while staying safely above the 35 PSI operating threshold.
* **Rapid Field Traversal:** Clocked a sub-2.3 second full-field traversal time, maximizing point output during critical scoring windows and driver-control endgames.

---

If you want an in-depth overview of the robot and why you can look through our engineering notebook

# Override Notebook - Season Goals

Team 4613R (Barker Redbacks) entered V5RC *Override* with one rule: build a **simple, reliable and effective** robot, then improve it at every competition. The notebook follows the full design cycle, so each decision can be traced back to a problem and forward to a test.

# Override Notebook - Brainstorm and Select

Five robot concepts and four claws were sketched and analysed, alongside 4-wheel tank, 6-wheel tank and X-drive comparisons. **Design 5** won because it combined a wide vertical range, versatility, efficient scoring and reliability.

The elevator was then chosen with a **weighted decision matrix**: four lift types scored against eight requirements.

| Concept | Weighted score |
|---|---|
| Continuous elevator | 90 / 100 |
| Cascade elevator | 84 / 100 |
| Double reverse four-bar | 60 / 100 |
| Two-bar arm | 58 / 100 |

The notebook is clear about what that score means: it chooses a direction for CAD, it is not proof the mechanism works.

# Override Notebook - Elevator Build Cycles

Six build cycles, each recorded as **issue, symptom, cause**. Two examples:

- **Cycle 1:** the three-stage elevator showed excessive sliding friction. Standoff lengths were slightly off, so the guides were clamped against the C-channel.
- **Cycle 3:** the twin pull-down strings failed under load because rope tension also pulled a bearing washer into the sliding path. The fix was one continuous retraction rope, so retraction and guide clearance stopped sharing hardware.

# Override Notebook - Shore Regional

The robot finished with a **5th-place ranking** and reached the **semifinals**, and the team won the **Innovate Award**. The review found that field elements being knocked out of position made the toggle unreliable, which is the problem Design Cycle 2 set out to fix.

# Override Notebook - Design Cycle 2: Fixing What Shore Showed

Every Shore problem was turned into a requirement before anything was redrawn.

- **Claw:** game pieces were being knocked backwards, so the claw has to grip the pin *and* the cup instead of relying on perfect alignment.
- **Elevator:** metal-on-metal guide contact caused friction, so the hypothesis is plastic-on-metal Delrin spacers. The notebook labels this as a hypothesis to test, not a result.
- **Chain bar:** integrates the new claw and elevator through their full range of motion.

# Override Notebook - Knox

Qualification record: **5 wins and 3 losses**, with a highest score of 110, an average of 70.6 points, and more points than the opponents in 5 of 8 matches. The gap between best and worst matches showed that alliance and defence mattered.

# Override Notebook - Programming

One request becomes coordinated movement: the driver or autonomous picks a pin and scoring side, the code looks up a lift height and chain-bar angle from a distance table, and a 10 ms control task applies the movement rules so the lift and chain bar never fight each other. The localization library behind autonomous is on the [Redbacks Localization](../projects/redbacks-localization.html) page.
