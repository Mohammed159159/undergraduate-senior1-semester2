---
dg-publish: true
---
## Losses
- Heat is generally bad for efficiency and system performance
### Electric motors
- Heat affects
	- R (increases)
	- Flux (decreases)
	- Torque (decreases)
	- Stored heat (increases)
- High internal heat melts insulation causing short circuit

---
## Motor selection
### Datasheet
- Maxon motors
- Continuous = rated
- Same power but different models
	- Different voltage and current
	- Different efficiency
- Nominal voltage -> Nominal power
- No load speed -> speed at internal load / no *external* load current
- Nominal speed  -> speed at rated, continuous, nominal torque / rated power
- Servo motor -> feedback maintains constant speed at variable torque (in the operating region) | increasing voltage gives more power to the motor to maintain speed
- Max continuous torque -> torque at which the motor can theoretically work for ever (only other factors like lifetime ) / $Q_{in} = Q_{out}$
- Operation conditions affects performance and reduce lifetime: cool -> torque 👆 | hot -> torque 👇 
- Allow for motor cooling (housing)
- Current protection and temperature protection -> present in motor controller for preventing damage for expensive motor and components (they detect current and time to estimate heat or measure heat directly)
- Expensive drives = protection
- RMS torque should be equal to max continuous torque (don't overestimate) / there is an allowance
- Max efficiency at nominal operating point
- High thermal time constant is good
- High load = isolate motor shaft from load shaft
![[Meta/assets/IMG_20260228_122502.jpg]]
![[IMG_20260228_122556.jpg]]
- Continuous operation vs. short term operation (thermal time constant)