---
dg-publish: true
---
## What is Forward Kinematics?
> [!tip] Determining the position and orientation (*pose*) of the end-effector with respect to the base as a function of each joint motion ($q$ which is either $\theta$ or $d$)
## Kinematic Chains
![[Drawing 2026-03-10 12.58.16.excalidraw.svg]]
### Transformations
#### Going to the next frame ($i$) from the previous frame ($i-1$)
$$
A_{i} = \begin{bmatrix}
R^{i-1}_{i} & d^{i-1}_{i} \\ \\
0 & 1
\end{bmatrix}
$$
#### Going to the end-effector frame ($n$) from the base frame ($0$)


$$
H^0_{n} = \prod^{i=n}_{i=1} A_{i}(q_{i})
$$
## Forward Kinematics Approaches
### Geometric Approach
![[Pasted image 20260311061432.png]]
- Suitable for simple problems
- Suitable for getting the *position* of the end effector only, not *orientation*
### DH Convention
#### Frames
1. Assign axes on the joints
2. Assign axes on the last important link (manipulator)

![[Lecture 3 - Forward Kinematics 2026-03-10 14.26.48.excalidraw.svg]]
#### Transformation Parameters
> [!tip] We are just moving from the origin of the current frame to the origin of the next frame
> It's like asking: how can we make the current frame become in the same orientation and position as the next frame?

*We just do it in 4 steps*

| Motion                                                                                                                    | Parameter | Name         |
| ------------------------------------------------------------------------------------------------------------------------- | --------- | ------------ |
| **Rotating** around the *current z axis* to make the x axis of the current frame parallel to the x axis of the next frame | $\theta$  | Joint angle  |
| **Translating** along the *current z axis* to intersect with the x axis of the next frame                                 | $d$       | Joint offset |
| **Translating** along the *new x axis* (x axis of the next frame) to arrive at the origin of the next frame               | $a$       | Link length  |
| **Rotating** around the *new x axis* of the next frame to make the current z axis align with the next z axis              | $\alpha$  | Link twist   |
|                                                                                                                           |           |              |

$$
T^{i-1}_{i} = T_{Rot,z_{i-1},\theta_{i}} \ T_{Tran,z_{i-1},d_{i}} \ T_{Tran,x_{i},a_{i}} \ T_{Rot,x_{i},\alpha_{i}}
$$
This results in a **total homogenous transformation matrix** from frame $i-1$ to frame $i$

To get the transformation **from the base frame to the end effector frame** we just multiply the transformations between each two frames together
$$
T^0_{n} = T^0_{1} \ T^1_{2} \ T^2_{3}\dots T^{n-3}_{n-2} \ T^{n-2}_{n-1} \ T^{n-1}_{n}
$$
## Resources
### Lectures
- [L03_Intro to Robotics_Lb1_DH-Convention.mp4](https://drive.google.com/open?id=1hrRtHCPlWAIuTMXK17acbuiJf-d6bl_D&usp=drive_copy)
- [Robotics: Lecture 04 (Forward Kinematics)](https://www.youtube.com/watch?v=qX2EiMAsIdM)
- [Industrial Robotics : Forward Kinematics Part(1)](https://www.youtube.com/watch?v=Vs9OU9-BY3k)
- [Industrial Robotics : Forward Kinematics Part(2)](https://www.youtube.com/watch?v=jdTMyZIt4o0)
### YouTube Channels
- [Kareem Ehab Mabrouk - YouTube](https://www.youtube.com/@_KareemEhabAhmed)
### Examples
- [Intro2Robotics6b: DH for spherical wrist, 6DOF arms: cylindrical & Stanford, SCARA](https://www.youtube.com/watch?v=tr9iEL54u64&list=PLYZT24lofrjXcuu1iBNWu-NprW2wZD3zu&index=14)
- [Robotics: Lecture 05 (Examples on Forward Kinematics) - part II](https://www.youtube.com/watch?v=X5Jk6U1RMtc)
- [Robotics: Lecture 05 (Examples on Forward Kinematics)](https://www.youtube.com/watch?v=5TZVdtnRU8g)
- [D-H parameter 14 - YouTube](https://www.youtube.com/watch?v=e0Gp_Cpipr4&list=PL1xqdqtd6lFVtcpYt3O-xoRYlxx413ywc&index=14)
- [4-kinematics of serial Manipulators Forward Kinematics part 2 كيناماتيكا الروبوتات - YouTube](https://www.youtube.com/watch?v=ymX6Jx5c26k&list=PLmClnuFMaUREejckxwjrCPNQx3KTBDRCy&index=5)
- Carnegie Mellon University
	- [Lecture 06a DH Examples Review](https://www.youtube.com/watch?v=W6VPWlekcPE&list=PLpIxOj-HnDsOcKdRPsbBezbj-xr0FGRyr&index=13)
	- [Lecture 06b DH Examples Planar RR and RPR Arms - YouTube](https://www.youtube.com/watch?v=LgEg7Jksm4M&list=PLpIxOj-HnDsOcKdRPsbBezbj-xr0FGRyr&index=3)
	- [Lecture 06c DH Examples Cylindrical Robot and Spherical Wrist](https://www.youtube.com/watch?v=nzZq1Qm9kq8&list=PLpIxOj-HnDsOcKdRPsbBezbj-xr0FGRyr&index=5)
	- [Lecture 06d DH Examples Denso Stanford SCARA](https://www.youtube.com/watch?v=xZacCqhT4JM&list=PLpIxOj-HnDsOcKdRPsbBezbj-xr0FGRyr&index=9)
### Videos
- [Solved Example - Forward Kinematics - YouTube](https://www.youtube.com/watch?v=_8T7RjXL07M) 
### Extra
- [Lec 10: Rotation Matrix using Rodrigues formula using Matlab -الطريقة الاسهل لايجاد مصفوفة الدوران](https://www.youtube.com/watch?v=0GXoJLmDGYM&list=PLHASw1hStmiGy_dkpEnoy89to0Mj4m1Gn&index=10)
- [Lec 14: Forward Kinematics using Screw theory - No need for DH parameters - YouTube](https://www.youtube.com/watch?v=BCfEVVFRmqs&list=PLHASw1hStmiGy_dkpEnoy89to0Mj4m1Gn&index=14)
- [Linkage Mechanism Designer and Simulator – David Rector](https://blog.rectorsquid.com/linkage-mechanism-designer-and-simulator/)
- [Getting Started as a Robotics Software Engineer! - YouTube](https://www.youtube.com/watch?v=tkYZmw8x-SM)
- [Robotics101 from VisCircuit: Making Robotics Easy to Learn through Visualization](https://robotics101-viscircuit.web.app/robotics/translation)
- [Wiki Index - Robotics Knowledgebase](https://roboticsknowledgebase.com/wiki/)
