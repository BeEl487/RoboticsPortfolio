# Project Portfolio: Parametric Wind Turbine Blade Design & Agricultural Decarbonisation Policy

## 1. Project Overview
This project presents an integrated engineering and public policy study addressing micro-scale renewable energy generation and state-level climate targets. On the hardware side, I designed, simulated, 3D-printed, and iteratively tested a series of parametric wind turbine blades to evaluate how chord geometry, profile thickness, and aerofoil selection affect rotational torque and power output at low wind velocities.

To connect experimental hardware development with broader systemic impact, I synthesized my empirical insights into a formal legislative policy submission to the NSW Minister for Climate Change, Energy, the Environment and Heritage. The proposal targets specific decarbonisation shortfalls in the agricultural and energy sectors under the *Climate Change Act 2023*.

[iSTEAM AT2 Poster — Parametric Wind Turbine Blade Design.pdf](images/wind-turbine/iSTEAM-poster.pdf)

```
                      SYSTEM ARCHITECTURE
+-----------------------+     +-----------------------+     +-----------------------+
|  Wind Source          | --> |  Parametric Aerofoil  | --> |  Generator & Circuit  |
|  (2.0 - 3.5 m/s Flow) |     |  (Eppler e387 Profile)|     |  (DC Voltage/Current) |
+-----------------------+     +-----------------------+     +-----------------------+
                                          |
                                          v
                              +-------------------------+
                              | Legislative Policy Plan |
                              | (NSW Net Zero Stage 2)  |
                              +-------------------------+
```


## 2. Problem Definition
The Net Zero Commission’s 2026 Annual Progress Report indicates that New South Wales is off track for its 2030 target of cutting emissions by 50% from 2005 levels. The state is projected to reach only a 44% reduction, leaving a gap of 10 to 20 million tonnes of $\text{CO}_2\text{-e}$. Meeting these targets requires both localized generation hardware and targeted policy interventions in hard-to-abate sectors such as agriculture.

### Design Requirements
* **Must-Have Constraints:**
  * Achieve reliable self-starting rotation at low airspeeds ($2.0 - 3.5\text{ m/s}$).
  * Generate measurable electrical output ($V \times I$) on a standard multimeter rig.
  * Retain structural integrity under rotational shear without layer separation.
  * Utilize a fully parametric CAD pipeline to enable rapid geometry adjustments.
* **Nice-to-Have Goals:**
  * Achieve an effective Tip-Speed Ratio ($\text{TSR}$) approaching lift-based operating regimes ($\text{TSR} \approx 3 - 6$).
  * Maintain a narrow trailing edge ($0.7\text{ mm}$) without causing 3D printing defects.

| Metric | Target Specification | Actual Measured Result | Assessment |
| :--- | :--- | :--- | :--- |
| **Operating Wind Velocity** | $2.0 - 3.5\text{ m/s}$ | $2.0 - 3.5\text{ m/s}$ | Pass |
| **Max Root Width** | $80\text{ mm}$ | $80\text{ mm}$ (Version D1) | Pass |
| **Trailing Edge Thickness** | $\le 1.0\text{ mm}$ | $0.7\text{ mm}$ | Pass |
| **Aerofoil Selection** | Low Reynolds Number ($Re$) | Eppler e387 | Pass |
| **Loaded Rotational Speed** | $> 40\text{ RPM}$ | $49\text{ RPM}$ (Version D1) | Pass |

## 3. Background Research
Wind turbine power extraction is governed by the wind power equation:

$$P = \frac{1}{2} \rho A v^3 C_p$$

Where $P$ is power output in Watts, $\rho$ is air density ($\approx 1.225\text{ kg/m}^3$), $A$ is rotor swept area ($m^2$), $v$ is wind speed ($m/s$), and $C_p$ is the power coefficient. Betz's Law dictates that no turbine can capture more than $59.3\%$ ($16/27$) of the kinetic energy in wind, as residual velocity is required for air to flow past the rotor.

Because micro-turbines operate at low Reynolds numbers ($Re$), airflow over the blade is prone to boundary layer separation, causing stall and increased pressure drag:

$$Re = \frac{\rho v L}{\mu}$$

Where $L$ is the characteristic chord length and $\mu$ is dynamic viscosity. Selecting an aerofoil explicitly optimized for low $Re$, such as the **Eppler e387**, helps maintain laminar flow across low-velocity operating ranges.

## 4. Alternatives and Concept Development
I evaluated three initial design concepts prior to CAD modeling:

| Option | Architecture | Key Advantages | Primary Disadvantages | Decision |
| :--- | :--- | :--- | :--- | :--- |
| **Option A** | Flat-plate 6-blade rotor | High starting torque; simple geometry. | Extreme rotational drag; low peak efficiency. | Rejected: Excessive drag caps performance. |
| **Option B** | Symmetrical profile (NACA 0012), 2 blades | Low drag; high tip speed potential. | Poor startup torque; stalled at low airspeeds. | Rejected: Failed to self-start at $2.0\text{ m/s}$. |
| **Option C** | Cambered Eppler e387, 3 blades | Balanced lift, low-$Re$ laminar flow, and torque. | Sensitive to slicing and print orientation. | **Selected:** Optimal balance for experimental setup. |

## 5. Design / Development Process

```
+-------------------+     +--------------------+     +------------------+
| Onshape Variable  | --> | Custom Aerofoil    | --> | Vertical FDM     |
| Studio (CAD)      |     | CFD Simulator      |     | 3D Printing      |
+-------------------+     +--------------------+     +------------------+
        ^                                                     |
        |                     Iterative Loop                  v
        +---------------- Benchtop Testing --------------------+
                          & Multimeter Data
```


### Iteration Timeline
* **Concept Phase:** Modeled the rotor in Onshape using FeatureScript ("HAVF profile generator") with independent parameters for root width, pitch, backbone offset, and profile thickness. Evaluated airflows digitally using a custom CFD web tool (`aerofoil-simulation/index.html`) before slicing.
* **Version A1:** Root width $25\text{ mm}$, backbone offset $8\text{ mm}$.
  * *Testing:* Placed on the fan test rig.
  * *Failure:* Blade failed to rotate.
  * *Root Cause:* Root chord was too narrow to capture enough torque to overcome internal motor cogging and mechanical friction.
* **Version B1:** Increased root width to $60\text{ mm}$, backbone offset to $20\text{ mm}$, profile thickness $2\text{ mm}$.
  * *Testing:* Spun freely under no-load ($63\text{ RPM}$), but dropped to $30\text{ RPM}$ when connected to the generator circuit.
* **Version C1:** Retained $60\text{ mm}$ root width, increased profile thickness to $4\text{ mm}$.
  * *Testing:* Unloaded speed dropped slightly ($60\text{ RPM}$), but loaded speed improved significantly to $49\text{ RPM}$ due to superior low-speed torque transfer.
* **Version D1 (Final Model):** Expanded root width to $80\text{ mm}$, reduced thickness back to $2\text{ mm}$ to trim weight while keeping surface area high.
  * *Testing:* Maintained high loaded speed ($49\text{ RPM}$) and generated the first measurable multimeter output ($0.01\text{ V}$, $0.04\text{ A}$).

<img width="900" alt="Blade design iterations, A1 through D1 and beyond" src="images/wind-turbine/blade-iterations.png" />

## 6. Engineering Decisions
* **3-Blade Rotor Configuration:** Selected 3 blades to balance starting torque against parasitic drag, reflecting commercial horizontal-axis standards.
* **Eppler e387 Profile:** Chosen for its low-Reynolds-number performance to delay boundary layer separation at low airspeeds.
* **$0.7\text{ mm}$ Trailing Edge:** Adjusted trailing edge thickness to $0.7\text{ mm}$ instead of a razor-sharp $0.1\text{ mm}$ to ensure reliable extrusion on FDM printers without blunting the trailing edge.
* **Vertical Print Alignment:** Printed blades vertically on the build plate. While layer lines are perpendicular to centrifugal forces, vertical alignment produced a smoother aerofoil finish than horizontal printing, minimizing aerodynamic drag.

| | Vertical Alignment (Selected) | Horizontal Alignment (Rejected) |
| :--- | :--- | :--- |
| Surface finish | Smooth profile surface | Stepped layer lines |
| Aerodynamic drag | Reduced | High surface friction |


## 7. Technical Explanation

### Tip-Speed Ratio ($\text{TSR}$)
* **Simple Explanation:** Tip-Speed Ratio compares the speed of the tip of a blade to the speed of the wind blowing past it.
* **Analogy:** Think of running while holding a pinwheel. If you run fast but the wheel turns slowly, it has a low tip-speed ratio. If a slight breeze spins it into a fast blur, it has a high tip-speed ratio.
* **Technical Explanation:** $\text{TSR}$ ($\lambda$) is expressed as:
  $$\lambda = \frac{\omega R}{v}$$
  Where $\omega$ is rotational velocity in radians/sec, $R$ is rotor radius, and $v$ is wind velocity. Efficient lift-based wind turbines operate at a $\text{TSR}$ between 3 and 8.
* **Application:** The prototype blades operated at a $\text{TSR}$ of roughly $0.3 - 0.5$. This revealed that the turbine was operating primarily on drag force rather than aerodynamic lift, identifying a key area for geometry optimization.

## 8. Calculations and Engineering Analysis
I calculated the operational Tip-Speed Ratio ($\lambda$) using performance data from Version D1.

**Variables:**
* Rotational speed ($N$) = $49\text{ RPM}$ (Version D1 under load)
* Rotor Radius ($R$) = $0.15\text{ m}$
* Airspeed ($v$) = $3.5\text{ m/s}$

**Step 1: Calculate angular velocity ($\omega$)**
$$\omega = \frac{N \times 2\pi}{60} = \frac{49 \times 2\pi}{60} \approx 5.131\text{ rad/s}$$

**Step 2: Calculate tip velocity ($v_{\text{tip}}$)**
$$v_{\text{tip}} = \omega \times R = 5.131 \times 0.15 \approx 0.770\text{ m/s}$$

**Step 3: Calculate Tip-Speed Ratio ($\lambda$)**
$$\lambda = \frac{v_{\text{tip}}}{v} = \frac{0.770}{3.5} \approx 0.220$$

**Engineering Significance:**
The resulting $\text{TSR}$ ($\approx 0.22 - 0.5$) fell well below the target lift-based range ($3 - 6$). This confirmed that while widening the root chord provided the torque required to turn the shaft under load, it introduced rotational drag that capped maximum efficiency.

## 9. Simulation / Modelling
Candidate aerofoils were evaluated using a custom computational tool (`aerofoil-simulation/index.html`) before 3D printing.

```
                 AEROFOIL SIMULATION PRESSURE GRADIENT

        Low Pressure / High Velocity Airflow (Generates Lift Force)
  --------------------------------------------------------------->
   .-----''''''-----.
  (                    )----------   Eppler e387 Profile
   '----------------------------------------------------------->
        High Pressure / Low Velocity Airflow
```


* **Simulation Inputs:** Analyzed lift and drag coefficients across pitch angles from $4^\circ$ to $45^\circ$ under low-$Re$ conditions.
* **Prediction:** Thin, cambered profiles would yield superior lift-to-drag ratios at low wind speeds.
* **Experimental Comparison:** While the simulation predicted high lift efficiency, physical testing revealed that FDM layer lines induced surface friction and early flow separation. *Simulation predicts; testing verifies*.

## 10. Testing and Experimentation
Testing was conducted on a fan rig across wind speeds of $2.0\text{ m/s}$, $2.75\text{ m/s}$, and $3.5\text{ m/s}$. Each round evaluated two variations, altering one parameter at a time to isolate performance effects.

### Experimental Summary

| Test Round | Variable Evaluated | Models Compared | Free RPM | Loaded RPM | Electrical Result | Primary Engineering Insight |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Test 1** | Root Width & Offset | A1 $\rightarrow$ B1 | $0 \rightarrow 63$ | $0 \rightarrow 30$ | None | A1 failed to spin. Widening root to $60\text{ mm}$ provided necessary starting torque. |
| **Test 2** | Profile Thickness | B1 $\rightarrow$ C1 | $63 \rightarrow 60$ | $30 \rightarrow 49$ | None | Increasing profile thickness to $4\text{ mm}$ improved low-speed torque under generator load. |
| **Test 3** | Scaled Dimensions | C1 $\rightarrow$ D1 | 60 | 49 | $0.01\text{ V}, 0.04\text{ A}$ | Increasing root width to $80\text{ mm}$ produced peak loaded speed and initial electrical power. |

## 11. Failure and Debugging

### Investigation: Version A1 Rotation Failure
* **Symptom:** Blade A1 remained stationary under airspeeds up to $3.5\text{ m/s}$.
* **Investigation:** Checked the $25\text{ mm}$ root width and $8\text{ mm}$ offset. Tested the generator shaft manually to rule out mechanical seizure.
* **Root Cause:** The narrow root chord could not harvest sufficient aerodynamic force to overcome initial motor cogging and mechanical resistance.
* **Fix:** Updated CAD variable studios to increase the root width to $60\text{ mm}$ (Version B1).
* **Verification:** Version B1 rotated immediately upon airflow exposure, reaching $63\text{ RPM}$ unloaded.

## 12. Manufacturing / Implementation
* **CAD System:** Onshape (Parametric variable studio with custom FeatureScript).
* **Fabrication Method:** Fused Deposition Modeling (FDM) 3D Printing.
* **Material:** PLA Filament.
* **Slicer Settings:**
  * Wall count: 2 perimeter walls
  * Infill density: 15% Cubic
  * Print orientation: Vertical bed placement
  * Trailing edge limit: $0.7\text{ mm}$

## 13. Results Summary

| Performance Metric | Target Requirement | Measured Result | Status |
| :--- | :--- | :--- | :--- |
| **Low-Wind Startup** | Self-start at $\le 2.5\text{ m/s}$ | Started at $2.0\text{ m/s}$ (B1, C1, D1) | **Pass** |
| **Loaded Speed** | $> 40\text{ RPM}$ | $49\text{ RPM}$ (Version C1 & D1) | **Pass** |
| **Tip Speed Ratio ($\text{TSR}$)** | $3.0 - 6.0$ | $\approx 0.3 - 0.5$ | **Unresolved** (Drag-dominated) |
| **Power Output** | Measurable Voltage / Current | $0.01\text{ V}$, $0.04\text{ A}$ (Version D1) | **Pass** |

The physical prototypes demonstrated reliable self-starting and stable rotation under load. However, the low Tip-Speed Ratio showed that overall aerodynamic efficiency remained capped by drag.

## 14. Reflection
I originally assumed that achieving high free-running RPM was the best indicator of blade quality. Testing Version B1 proved otherwise: while it reached $63\text{ RPM}$ unloaded, its speed dropped to $30\text{ RPM}$ under generator load. Increasing profile thickness (Version C1) slightly reduced top speed but vastly improved torque retention under load.

Furthermore, completing this work showed me that engineering physical hardware is only part of the solution. Driving meaningful emissions reductions requires pairing technical tools with strategic policy. Formulating a formal submission to the NSW Minister for Climate Change, Energy, the Environment and Heritage taught me how to translate empirical findings into actionable legislative proposals.

## 15. Future Development
* **Immediate Improvements:**
  * Implement continuous geometric twist ($10^\circ - 20^\circ$) from root to tip to maintain optimal angle of attack along the span.
  * Sand and coat PLA surfaces to minimize skin-friction drag.
* **Version 2.0:**
  * Build a pitch-adjustable hub mechanism to adjust blade angles dynamically.
  * Integrate a gear step-up assembly to match generator optimal RPM bands.
* **Long-Term Development:**
  * Explore composite resin molding for stiffer blades with thinner trailing edges.
* **Research Questions:**
  * How significantly does FDM surface layer roughness degrade low-$Re$ laminar lift compared to structural flexure under wind loads?

---

## Policy Proposal Submission

Brandon Lai
37 Dawson Street
Epping Sydney NSW
10/8/26

The Hon. Penny Sharpe MLC
Minister for Climate Change, Energy, the Environment and Heritage
Governor Macquarie Tower
1 Farrer Place
Sydney NSW 2000

Dear The Hon. Penny Sharpe,

I am a secondary school student in New South Wales studying renewable energy and climate policy as part of my STEM schoolwork and I am writing to share my evaluation of the Net Zero Plan. I am focusing mainly on the agriculture and land use sector and the technologies being used to decarbonise it and am proposing two changes I believe should be incorporated into the Net Zero Plan Stage 2.

The Climate Change Act 2023 states that New South Wales will be cutting emissions by 50 per cent of 2005 levels by 2030, 70 per cent by 2035 reaching net zero by 2050. According to the Net Zero Commission's 2026 Annual Progress Report, NSW is currently not on track to its 50% reduction by 2030 estimated to be at only 44%, about 10 and 20 million tonnes of CO2 too much, widening to a shortfall of 21 to 24 million tonnes by 2035. To close this gap, annual emissions would need to fall to 75.9 mega-tonnes of CO2-e by 2030 and 45.6 mega-tonnes of CO2-e by 2035, meaning the State must cut emissions roughly two and a half times faster than its average rate since 2005. These gains are concentrated in sectors where one technology can simply replace another. Agriculture has no equivalent single-technology fix, which is exactly why I believe the sector requires further work as the Government moves into Stage 2 planning.

Additionally, agriculture is a large part of emissions in NSW as it accounts for around 18 to 20% of the State's total emissions. Within that, livestock are responsible for roughly 70 per cent of agricultural emissions, almost all from methane due cattle and sheep. This makes agriculture one of the sectors most worth scrutinising, because unlike electricity, it cannot simply be decarbonised by swapping an energy source.

The Plan's approach to the agricultural sector includes some effective and useful initiatives. The Low Emissions Intensity Farming Systems (LEIFS) program is a five-year partnership between NSW Department of Primary Industries and Regional Development (DPIRD) and the Grains Research and Development Corporation and CSIRO. It aims to help grain and cotton growers monitor and benchmark their emissions intensity without sacrificing yield, alongside additional support for precision technologies such as GPS-guided machinery, soil sensors and data-driven irrigation to reduce the wastage of farmland.

The Net Zero Commission's 2026 Annual Progress Report states that methane from cattle and sheep is the largest component of agricultural emissions. Although technologies such as the methane reducing feed additives have shown promising results, they have not yet been adopted at the large scale needed to significantly reduce agricultural emissions. The large majority of Australian farms feed their livestock fresh grass, dry hay and silage; however the high fibre grass diets lead to an increased microbial fermentation, leading to the release of methane. Seaweed based feed additives such as Asparagopsis which in trials have shown up to 90% reduction in methane emissions. Australia is considered one of the world leaders in developing these feeds and some commercial products have been made available. However, widespread adoption remains limited because of challenges including large-scale seaweed production, cost, feed delivery to grazing animals, and farmer uptake. The practical result is that agricultural emissions are likely to stay largely flat through 2035 unless this changes, which undermines the Plan's overall trajectory.

The Commission has already recommended that the Government scale up cost-effective emission reduction measures identified by the Department of Primary Industries and Regional Development, including feed additives, biochar and improved herd and manure management. I propose that Stage 2 would turn this recommendation into a funded program to bring feed-additive technologies from trial to mass production.

Stage 1 already encourages precision technologies, such as GPS-guided machinery, remote sensing, drones and soil sensors, as tools for reducing emissions while maintaining productivity. However, these technologies carry a high upfront cost, limiting their adoption by smaller farms and businesses compared to the better-resourced large scale farming operations. A strategy that is only accessible to the largest producers will not deliver the sector-wide change the Net Zero Plan needs, and risks widening the gap between well-resourced and smaller family farms.

I propose that Stage 2 introduce a rebate for precision agriculture technology, sized to a specific farm's revenue rather than offered as a flat subsidy. This allows smaller operations to receive proportionally greater support to adopt the same tools already available to larger farms. This would directly address the large cost barrier whilst keeping the technology-driven approach to reduce emissions.

I believe that New South Wales is cutting emissions but not fast enough to meet its 2030 and 2035 targets. Agriculture is named as one of the sectors where current technology is not yet mature enough to deliver rapid reductions. I believe we should treat agricultural technology and farmer access to it as a funded priority now, rather than a long-term goal. I would welcome the opportunity to see both proposals above reflected in the Net Zero Plan Stage 2: 2030-2040.

I appreciate you taking the time to consider my views on the Net Zero Plan as a young Australian. Should you wish to discuss any of these ideas further or would like additional detail on my recommendations, please feel free to contact me directly.

Yours sincerely,

Brandon Lai


---

## References
* **Department of Climate Change, Energy, the Environment and Water (NSW).** *Net Zero Plan Stage 1: 2020–2030*. NSW Government.
* **Eppler, R.** *Airfoil Design and Data*. Springer-Verlag.
* **Manwell, J. F., McGowan, J. G., & Rogers, A. L.** *Wind Energy Explained: Theory, Design and Application*. Wiley.
* **Net Zero Commission (NSW).** *2026 Annual Progress Report*. NSW Government.
