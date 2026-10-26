# Season Goals

Team 4613R (Barker Redbacks) entered V5RC *Override* with one rule: build a **simple, reliable and effective** robot, then improve it at every competition. The notebook follows the full design cycle, so each decision can be traced back to a problem and forward to a test.

# Brainstorm and Select

Five robot concepts and four claws were sketched and analysed, alongside 4-wheel tank, 6-wheel tank and X-drive comparisons. **Design 5** won because it combined a wide vertical range, versatility, efficient scoring and reliability.

The elevator was then chosen with a **weighted decision matrix**: four lift types scored against eight requirements.

| Concept | Weighted score |
|---|---|
| Continuous elevator | 90 / 100 |
| Cascade elevator | 84 / 100 |
| Double reverse four-bar | 60 / 100 |
| Two-bar arm | 58 / 100 |

The notebook is clear about what that score means: it chooses a direction for CAD, it is not proof the mechanism works.

# Elevator Build Cycles

Six build cycles, each recorded as **issue, symptom, cause**. Two examples:

- **Cycle 1:** the three-stage elevator showed excessive sliding friction. Standoff lengths were slightly off, so the guides were clamped against the C-channel.
- **Cycle 3:** the twin pull-down strings failed under load because rope tension also pulled a bearing washer into the sliding path. The fix was one continuous retraction rope, so retraction and guide clearance stopped sharing hardware.

# Shore Regional

The robot finished with a **5th-place ranking** and reached the **semifinals**, and the team won the **Innovate Award**. The review found that field elements being knocked out of position made the toggle unreliable, which is the problem Design Cycle 2 set out to fix.

# Design Cycle 2: Fixing What Shore Showed

Every Shore problem was turned into a requirement before anything was redrawn.

- **Claw:** game pieces were being knocked backwards, so the claw has to grip the pin *and* the cup instead of relying on perfect alignment.
- **Elevator:** metal-on-metal guide contact caused friction, so the hypothesis is plastic-on-metal Delrin spacers. The notebook labels this as a hypothesis to test, not a result.
- **Chain bar:** integrates the new claw and elevator through their full range of motion.

# Knox

Qualification record: **5 wins and 3 losses**, with a highest score of 110, an average of 70.6 points, and more points than the opponents in 5 of 8 matches. The gap between best and worst matches showed that alliance and defence mattered.

# Programming

One request becomes coordinated movement: the driver or autonomous picks a pin and scoring side, the code looks up a lift height and chain-bar angle from a distance table, and a 10 ms control task applies the movement rules so the lift and chain bar never fight each other. The localization library behind autonomous is on the [Redbacks Localization](../projects/redbacks-localization.html) page.
