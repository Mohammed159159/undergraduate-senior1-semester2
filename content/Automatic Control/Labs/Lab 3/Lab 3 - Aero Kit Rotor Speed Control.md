---
dg-publish: true
---
## Scripts
Code snippet for calculating gains according to requirements
```MATLAB
% Proportional gain (V.s/rad)

kp = (2*zeta*wn*tau-1)/(K)

% Integral gain (V/rad)

ki = wn^2*tau/K
```
## Models
### Variant Subsystem Block
![[Pasted image 20260325201300.png]]

### Subsystems
![[Pasted image 20260325201340.png]]

## Results
**Given Parameters**
```MATLAB
K = 19.0; % dc gain
tau = 0.165; % time constant
tp = 0.3; % peak time (s)
PO = 5; % percent overshoot (%)
```
### Calculated Parameters
```MATLAB
zeta = 0.6901 % damping ratio
wn = 14.4699 % natural frequency
kp = 0.1208 % proportional gain
ki = 1.8183 % integral gain
```
### Overview
![[Pasted image 20260325224205.png]]
### Using $k_{p}$ and $1.5k_{i}$
![[Pasted image 20260325230754.png]]
```MATLAB
tp = 0.22; % peak time (s)
PO = 11.7; % % percent overshoot (%)
```
### Using $1.5k_{p}$ and $k_{i}$
System is *not* underdamped
![[Pasted image 20260325224425.png]]
### Using $k_{p}$ and $k_{i}$
![[Pasted image 20260325224517.png]]
```MATLAB
tp = 0.3; % peak time (s)
PO = 5; % percent overshoot (%)
```
## Conclusion
- Requirements satisfied
- Best peak time comes from using $1.5k_{i}$, but overshoot becomes significantly worse
- System did not become underdamped when using $1.5k_{p}$ 
## Assets
> [!note] [Project Files and Demo Video](https://drive.google.com/drive/folders/1BCNVMrr-KFcRND-2yP_9krIk1_LTEI9y?usp=sharing)