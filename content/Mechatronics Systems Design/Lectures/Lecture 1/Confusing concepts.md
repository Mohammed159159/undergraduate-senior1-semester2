## [[Verification]] vs. [[Validation]]
Verification ensures a product is built according to specifications ("building the thing right") using static methods like reviews. Validation ensures the final product meets user needs ("building the right thing") through dynamic testing. ==Verification is an internal process, while validation is often external, confirming fitness for purpose==.

**Examples**
- **Verification:** Reviewing a software design document to ensure it meets requirements.
- **Validation:** Running the software to ensure it actually solves the user's problem.

|Feature|Verification|Validation|
|---|---|---|
|**Objective**|Ensure compliance with specs|Ensure user satisfaction|
|**Question**|"Is the product built right?"|"Is the right product built?"|
|**Activities**|Reviews, inspections|Testing, simulation|
|**State**|Non-operational/Static|Operational/Dynamic|
|**Stage**|During development|After development|

## Integration
> *Distributed* vs. *Modular* vs. *Spatial*

These three terms describe different approaches to combining individual parts into a complete, functioning system. They essentially represent different levels of physical and functional closeness.

Here is a breakdown of the differences:
- **Distributed:** Components are spread apart and rely on external communication links.
- **Modular:** Components are built to standard shapes and connections so they can be easily plugged together or swapped.
- **Spatial:** Components are crammed into a single physical box or housing to create an all-in-one unit.

**Examples**

> [!note] Modules Connected via Connectors = [[Modular Integration]]
An electronic circuit made of separate breakout boards snapped together via standard connectors (like pin headers, JST connectors, or USB) is actually the textbook definition of **Modular integration**.

**Why?** The defining feature is the use of standardized building blocks and unified interfaces.

Think of a standard microcontroller board (like an Arduino or ESP32) with a motor driver shield plugged directly on top of it. They are separate boards, but they use a unified interface to lock together into a system. You can easily swap out the motor driver module for a different one without redesigning the whole setup.


> [!note] A Single Custom PCB = [[Spatial Integration]]
Taking those separate functional blocks and designing them into a single, custom Printed Circuit Board (PCB) is a perfect example of **Spatial integration**.

 **Why?** You are taking what used to be distinct modules (the microcontroller IC, an H-bridge IC, a power regulator) and tightly packing them into one spatially compact, complex functional unit on a single piece of FR4 fiberglass, all designed to fit inside a single housing.

> [!note] Physically scattered components connected together via communication protocols = [[Distributed Integration]]
For your electronics to be truly **distributed**, the components must be physically scattered across a larger mechanical system and connected by long wiring harnesses or communication buses (like CAN bus, SPI, or UART over a distance).

A rotary encoder mounted directly on a wheel axle, sending velocity data through a long cable back to a central control unit located inside the main chassis of a mobile robot.