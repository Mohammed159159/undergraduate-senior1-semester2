It is all about understanding how hardware and software interact to solve real-world problems. This sheet focuses on the transition from simple circuits to "intelligent" systems.

Here is a breakdown of the concepts and suggested answers to help you lead the discussion or answer questions in class.

1. **The Electric Water Heater Controller**
This example highlights the basic "Sense-Think-Act" cycle of an embedded system.
 * Inputs: The Thermometers (likely thermistors or RTDs) and the Temperature Setpoint dial (a potentiometer or digital buttons).
 * Outputs: The Heating Elements (controlled via relays or triacs) and potentially a status LED or digital display showing current temperature.
 * Safety Features:
	 * Over-temperature Cutoff: A software limit that disables the heater if $T > T_{max}$, backed by a Hardware Thermal Fuse (bimetallic switch) for redundancy if software fails.
	   * Dry-Fire Protection: Software can detect a rapid temperature spike without a corresponding increase in thermal mass (water), signaling the heater to stop. Hardware would require a Water Level Sensor.
 * Software Features:
	 * No Extra Hardware: A self-diagnostic routine that checks if the temperature rises when the heater is "on"; if not, it signals a "heater failed" error code.
	   * Energy Saving (with Time of Day): Scheduled Heating (only heating during off-peak electricity hours) or Usage Prediction (learning when you usually shower to pre-heat water just in time).
   * IoT Feature: Remote monitoring and control via a mobile app, or receiving firmware updates to improve the heating algorithm.

2. **Flashlight "Auto-Off" Alternatives**
The goal here is to think about timing without a microcontroller (MCU).

| Approach | Implementation Method |
|---|---|
| Electronic | A 555 Timer circuit in monostable mode or a simple RC (Resistor-Capacitor) circuit where the discharging capacitor keeps a transistor gate open for 3 minutes. |
| Mechanical | A spring-wound timer (like a kitchen timer) that physically breaks the circuit after a set duration of rotation. |
| Pneumatic | A leaky piston/bellows system. Turning the light on compresses air; a small orifice allows air to leak out slowly over 3 minutes until the piston moves far enough to toggle a switch. |

3. **The "Smart" Flashlight**
Adding an embedded computer allows for functionality that is hard to achieve with discrete components.
 * Signaling Modes: Programmed SOS or strobe patterns for emergencies.
 * Dimming/Brightness Control: Using Pulse Width Modulation (PWM) to provide multiple brightness levels without wasting energy as heat.
 * Battery Management: Accurate state-of-charge (SoC) estimation and low-battery protection to prevent cell damage.

4. **Embedded Systems in Automobiles**
Modern cars are essentially "computers on wheels" for safety, efficiency, and comfort.
 * Engine Control Unit (ECU): Optimizes fuel injection and ignition timing. Benefit: Higher fuel efficiency and lower emissions.
 * Anti-lock Braking System (ABS): Prevents wheel lock-up during hard braking. Benefit: Prevents skidding and maintains steering control.
 * Airbag Control Unit: Processes accelerometer data to deploy airbags in milliseconds. Benefit: Critical life-saving safety.
 * Electronic Stability Control (ESC): Applies individual brakes to help steer the vehicle during loss of traction. Benefit: Reduces rollover and spin-out risks.
 * Adaptive Cruise Control: Uses radar/lidar to maintain distance from the car ahead. Benefit: Reduces driver fatigue and improves traffic flow.

5. **Identifying Other Devices**
Look for devices that require decision-making or user interfaces.
 * Microwave Oven: Inputs (keypad, door sensor), Outputs (magnetron, turntable, buzzer). It improves the device by allowing precise timing and preset cooking modes.
 * Digital Camera: Inputs (shutter button, light sensor), Outputs (lens motor, LCD screen). It allows for image processing, autofocus, and digital storage.
 * Washing Machine: Inputs (load weight sensor, dial), Outputs (motor, water valves). It optimizes water usage and cycle times based on the load.

Bonus: **How does ABS work?**
![](https://youtu.be/32xK-AaJnKg?si=KQJWX4sZXTiAwwqg)

![](https://youtu.be/DFws10CbuKQ?si=tHWy0-Qe2HyDeuuV)