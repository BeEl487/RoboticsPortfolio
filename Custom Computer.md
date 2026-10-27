# Breadboard computer

A minimal computer I designed in software, then built from six hand-soldered cards and later put on a custom PCB. No microcontroller. Only logic gates.

**My role**

* Designed every chip in CircuitVerse.
* Soldered, tested and debugged the hardware.
* Designed the PCB version.

<ul class="glance"><li><b>6</b><span>perfboard cards</span></li><li><b>16-bit</b><span>RAM</span></li><li><b>3</b><span>instructions</span></li><li><b>555</b><span>timer clock</span></li></ul>

<figure class="fig"><img src="images/custom-computer/assembled-powered.jpg" alt="The finished computer running, with its output LEDs lit." loading="lazy" /><figcaption>The finished computer running, with its output LEDs lit.</figcaption></figure>

## Design in software first

I built the whole computer gate by gate before touching hardware. It has four chips: CPU, program counter, memory and a system that joins them.

<div class="fig-grid tall"><figure><img src="images/custom-computer/circuitverse-cpu.png" alt="The CPU chip" loading="lazy" /><figcaption>The CPU chip</figcaption></figure><figure><img src="images/custom-computer/circuitverse-counter.png" alt="The program counter" loading="lazy" /><figcaption>The program counter</figcaption></figure><figure><img src="images/custom-computer/circuitverse-system.png" alt="All four chips wired together" loading="lazy" /><figcaption>All four chips wired together</figcaption></figure></div>

The instruction set is tiny on purpose: **Output**, **Set Counter** (jump), **Halt**.

## Build and test each card

<div class="fig-grid "><figure><video controls preload="none" poster="images/custom-computer/clock-test-poster.jpg"><source src="images/custom-computer/clock-test.mp4" type="video/mp4" /></video><figcaption>The 555 timer clock on its own</figcaption></figure><figure><video controls preload="none" poster="images/custom-computer/counter-test-poster.jpg"><source src="images/custom-computer/counter-test.mp4" type="video/mp4" /></video><figcaption>The 4-bit counter before joining the rest</figcaption></figure></div>

<div class="fig-grid "><figure><img src="images/custom-computer/hand-soldered-cards.jpg" alt="Six hand-soldered cards" loading="lazy" /><figcaption>Six hand-soldered cards</figcaption></figure><figure><img src="images/custom-computer/assembled-unpowered.jpg" alt="Cards slotted together" loading="lazy" /><figcaption>Cards slotted together</figcaption></figure></div>

## It runs a program

<div class="fig-grid "><figure><video controls preload="none" poster="images/custom-computer/instruction-demo-poster.jpg"><source src="images/custom-computer/instruction-demo.mp4" type="video/mp4" /></video><figcaption>Stepping through instructions and outputting values, all by hand-built logic</figcaption></figure></div>

## Custom PCB

Same logic, one board. This removes loose wires, the main cause of failures.

<div class="fig-grid "><figure><img src="images/custom-computer/pcb-front.jpg" alt="Mini Computer V1, front" loading="lazy" /><figcaption>Mini Computer V1, front</figcaption></figure><figure><img src="images/custom-computer/pcb-back.jpg" alt="Mini Computer V1, back" loading="lazy" /><figcaption>Mini Computer V1, back</figcaption></figure></div>
