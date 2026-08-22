# Breadboard Computer

<img src="images/custom-computer/3d-sage-inspiration.jpg" alt="3D Sage YouTube videos that inspired this project" class="img-small" />

Inspired by 3D Sage's breadboard computer videos, I designed and built my own minimal-instruction-set computer from scratch, rather than following an existing build guide.

## Circuit Design (CircuitVerse)

Before touching any real hardware, I designed and simulated the whole computer logic-gate by logic-gate in CircuitVerse. The design is split into four main chips:

- **CPU** - decodes op-codes and routes data between inputs, outputs, and the program counter.
- **Counter** - the program counter, tracking which instruction is currently executing.
- **Memory** - a small RAM block that stores the program.
- **System** - wires the CPU, Counter, and Memory together into the full computer, plus a clock and manual override switches for debugging.

<img src="images/custom-computer/circuitverse-cpu.png" alt="CircuitVerse schematic of the CPU chip" />

The CPU chip: input/output routing gates on the left and right, with override lines running through the middle so the whole computer can be manually driven for debugging.

<img src="images/custom-computer/circuitverse-counter.png" alt="CircuitVerse schematic of the program counter chip" />

The program counter chip, which increments each clock cycle or jumps to a new instruction address when told to.

<img src="images/custom-computer/circuitverse-system.png" alt="CircuitVerse schematic of the full system, CPU, Counter, and Memory wired together" />

The full system: CPU, Counter, and 16-bit RAM wired together, driven by a shared clock. The instruction set is deliberately minimal:

1. **Output** - push the current value to the output LEDs.
2. **Set Counter** - jump to a given instruction address.
3. **Halt** - stop the clock.

## Physical Build

<img src="images/custom-computer/hand-soldered-cards.jpg" alt="Six hand-soldered perfboard cards for the computer" />

Once the CircuitVerse design was working, I moved to real hardware: six hand-soldered perfboard cards (one per chip, plus supporting logic), designed to slot together rather than being wired as one big tangle.

<video controls preload="none" poster="images/custom-computer/clock-test-poster.jpg">
  <source src="images/custom-computer/clock-test.mp4" type="video/mp4" />
</video>

Testing the clock circuit: a 555 timer in astable mode generates the square wave that drives the whole computer's clock signal.

<video controls preload="none" poster="images/custom-computer/counter-test-poster.jpg">
  <source src="images/custom-computer/counter-test.mp4" type="video/mp4" />
</video>

Testing the 4-bit counter card on its own breadboard before integrating it with the rest of the system.

<img src="images/custom-computer/assembled-unpowered.jpg" alt="The fully assembled computer cards, unpowered" />

All six cards slotted together into the finished breadboard computer.

<img src="images/custom-computer/assembled-powered.jpg" alt="The fully assembled computer cards, powered on with LEDs lit" class="img-feature" />

Powered on: the output LEDs lighting up as the computer runs.

<video controls preload="none" poster="images/custom-computer/instruction-demo-poster.jpg">
  <source src="images/custom-computer/instruction-demo.mp4" type="video/mp4" />
</video>

The finished computer executing a program: stepping through instructions and outputting values, driven entirely by hand-built logic gates rather than a microcontroller.

## Custom PCB (V1)

Having proven the design on breadboards, I moved the whole computer onto a custom PCB - Mini Computer V1 - to improve reliability over the hand-soldered perfboard-and-breadboard build.

<img src="images/custom-computer/pcb-front.jpg" alt="Mini Computer V1 PCB, front" />
<img src="images/custom-computer/pcb-back.jpg" alt="Mini Computer V1 PCB, back" />

The board keeps the same logical structure as the breadboard version - memory, program counter, clock, inverter, and override switches for manual debugging - now laid out as a single populated board instead of six separate cards.
