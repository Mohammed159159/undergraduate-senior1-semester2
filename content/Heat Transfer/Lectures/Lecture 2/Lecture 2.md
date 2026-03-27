---
dg-publish: true
tags:
  - resources/videos
  - folder
---

![](https://youtu.be/OpTEt1Y-gRw?si=nHM6wamO31RMnqxt)

---

## Deriving [[Steady state one-dimensional heat transfer]]

> [!note] [03:32](https://www.youtube.com/watch?v=OpTEt1Y-gRw&t=213#t=03:32.57) [[Steady state one-dimensional heat transfer]]

---

> [!note] [05:04](https://www.youtube.com/watch?v=OpTEt1Y-gRw&t=305#t=05:04.62) [[Steady state]] vs. [[Transient]]

---

> [!note] [07:46](https://www.youtube.com/watch?v=OpTEt1Y-gRw&t=467#t=07:46.69) [[Multi-dimensional conduction]]

---

> [!note] [11:07](https://www.youtube.com/watch?v=OpTEt1Y-gRw&t=668#t=11:07.78) [[Heat conduction equation]]

---

> [!note] [12:30](https://www.youtube.com/watch?v=OpTEt1Y-gRw&t=751#t=12:30.66) [[Heat generation]]

---

> [!note] [14:44](https://www.youtube.com/watch?v=OpTEt1Y-gRw&t=884#t=14:44.21) [[General heat conduction equation]]
> - [[Differential Analysis]]

---

> [!note] [19:00](https://www.youtube.com/watch?v=OpTEt1Y-gRw&t=1140#t=19:00.43) Narrowing down to [[Steady state one-dimensional heat transfer]]

---

> [!note] [33:37](https://www.youtube.com/watch?v=OpTEt1Y-gRw&t=2017#t=33:37.16) [[General heat conduction equation]] -> [[Temperature distribution]]

---

## Special cases of [[Steady state one-dimensional heat transfer]]

> [!note] [34:13](https://www.youtube.com/watch?v=OpTEt1Y-gRw&t=2054#t=34:13.67) [[Steady heat conduction in plane wall]]
> - Linear temperature distribution
> - $\frac{d T}{dx} = -\frac{T_{1}-T_{2}}{L}$
> - $\dot{Q}_{\text{cond,wall}}=kA\frac{T_{1}-T_{2}}{L}$
> - $R=\frac{L}{kA}$

---

> [!note] [39:05](https://www.youtube.com/watch?v=OpTEt1Y-gRw&t=2345#t=39:05.45) [[Steady heat convection in plane wall]]
> - Non-linear temperature distribution
> - $\frac{dT}{dx} = -\frac{T_{s}-T_{\infty}}{1}$
> - $\dot{Q}_{\text{conv,wall}}=hA\frac{T_{s}-T_{\infty}}{1}$
> - $R=\frac{1}{hA}$

---

### Conduction and convection in the same wall

> [!note] [45:11](https://www.youtube.com/watch?v=OpTEt1Y-gRw&t=2712#t=45:11.70) [[Thermal network]]

---

> [!note] [50:20](https://www.youtube.com/watch?v=OpTEt1Y-gRw&t=3021#t=50:20.90) [[Temperature distribution]]

---

### Composite Wall

> [!note] [50:44](https://www.youtube.com/watch?v=OpTEt1Y-gRw&t=3045#t=50:44.63) [[Composite wall]]
> - Temperature distribution distribution changes within the wall
> - Convection is not necessarily the same for outside and inside
> - Higher slope = higher temperature difference = lower thermal conductivity = high R

---

#### Thermal Contact Resistance
> [!note] Extra resistance due to imperfect thermal contact
> Causes temperature drop

> [!note] How to decrease?
> - Increase pressure
> - Add thermal grease
> - Metal foil

#### Series [[Thermal network]]
- Just add to the thermal circuit
#### Parallel [[Thermal network]]
> [!note] $\frac{1}{R_{eq}}=\frac{1}{R_{1}}+\frac{1}{R_{2}}$

### [[Heat Flow in Cylinders]]
- $A(r)=2\pi rL$ $\to$ Area varies with radius
- $R_{\text{cond,cyl}} = \frac{\ln\left( \frac{R_{2}}{R_{2}} \right)}{2\pi L k}$
- $R_{\text{conv}_{1}} = \frac{1}{(2\pi r_{1}L)h_{1}}$
### Heat Conduction in Spheres
- $R_{\text{sph,cond}}=\frac{r_{2}-r_{1}}{4\pi kr_{1}r_{2}}$
![[Lecture 2 2026-02-22 09.22.29.excalidraw|600]]
#### [[Critical Radius of Insulation]]
- as $r_{2}$ increases, $R_{in}$ increases but $R_{conv}$ decreases
- Low $k_{in}$ increases $R_{in}$
- The effect of the increase of $R_{in}$ fights the effect of the decrease of $R_{conv}$
- $r_{2}$ increases $\dot{Q}$ up until critical radius $r_{2} = \frac{k}{h}$ for *cylinder* and $r_{2} = \frac{2k}{h}$ for *sphere* which is the turning point at which $r_{2}$ decrease $\dot{Q}$. If $r_{1}$ is the same as the critical radius, adding the insulating material will immediately decrease $\dot{Q}$
## [[Temperature distribution]]
- [[Steady heat convection in plane wall]] -> linear
- [[Heat Flow in Cylinders]] -> logarithmic
> [!question] How to derive?
