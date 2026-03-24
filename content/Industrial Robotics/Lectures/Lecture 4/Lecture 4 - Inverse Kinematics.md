## What is Inverse Kinematics?
> [!tip] Given a desired pose (*position* and *orientation*: $x,y,z,\theta_{x},\theta_{y},\theta_{z}$) of the end effector with respect to the base, calculate the joint angles/positions required for achieving this desired pose

**Overview**
> - [Watch this awesome overview](https://www.youtube.com/watch?v=x2o9dcGKcho)
> - [Inverse Kinematics of Robots | Robotics 101](https://youtu.be/1-FJhmey7vk?si=WbVqlkmEO9dbvsbl)
## Definitions
- **Joint space**: angles/positions of joints ($q$)
- **Task space**: position and orientation (pose) of the end effector ($x,y,z,\theta_{x},\theta_{y},\theta_{z}$)
- **DoF**
	- DoF in task space vs. DoF in joint space
		- *Task space*: 6 (position and orientation of the end effector)
		- *Joint space*: depends on joints (number of revolute/prismatic joints)
	- Actuation Types
		- *Under-actuated* (over-constrained): DoF in the joint space < DoF in the task space
			- End effector cannot achieve all poses
		- *Exactly actuated* (fully constrained): DoF in the joint space = DoF in the task space
			- End effector can achieve the same pose with different joint configurations
		- *Over actuated* (under-constrained): DoF in the joint space > DoF in the task space
			- End effector can achieve the same pose with different joint configurations
- **Forward kinematics**: Joint space $\to$ Task space
- **Inverse kinematics**: Task space $\to$ Joint space
- We could map from task space to multiple points in the joint space (i.e. the end effector can achieve the pose with different configurations of joints actuation)
	- Remember that pose = *position* + *orientation*
	- If we don't care about the *orientation* of the end effector, we could get multiple solutions (multiple joint configurations for achieving the same *position*)
	- **Example**: elbow up vs. elbow down (the end effector reaches the same *position* with two different joint configurations; however, its *orientation* is different because it is underactuated)
		![[Pasted image 20260311041132.png|324]]
## Inverse Kinematics Approaches
### Geometric Approach
> [!tip] What is geometric approach?
> - It's about making use of the simple geometry of the robot to derive its inverse kinematics equations using trigonometric and geometric relations
> - It can only achieve a desired *position* of the end effector, not *orientation* as well

#### Examples
- **Example 1**: [6-kinematics of Serial Robots Inverse Kinematics part 2 كيناماتيكا الروبوتات](https://www.youtube.com/watch?v=KhyfKlcCKOc&list=PLmClnuFMaUREejckxwjrCPNQx3KTBDRCy&index=6)
- **Example 2**: Decrease the the problem from 3D to 2D to simplify
![[Pasted image 20260311045310.png|697]]
![[Pasted image 20260311045346.png]]
![[Pasted image 20260311045457.png]]
- **Example 3**: [5.1 Inverse Kinematics - YouTube](https://www.youtube.com/watch?v=RH3iAmMsolo)
### Algebraic Approach
> [!tip] What is the algebraic approach?
> - In **forward kinematics**, we know the pose of the arm with respect to the base as a *function of the joint variables* ($\theta_{i}, d_{i}$). 
> - This is represented as a *transformation matrix* from the base to the end effector
> - The algebraic approach to **inverse kinematics**, is about *solving for the joint variables* when we substitute the pose of the arm with $x,y,z,\theta_{x},\theta_{y},\theta_{z}$ (which can be either specific numbers if we are solving for a specific pose or general variables if we want to derive general relations) in the *transformation matrix* that describes the pose of the end effector with respect to the base (derived from forward kinematics)
> - Ideally, we should end up with an equation for each joint variable that is a function of the pose of the end effector
>>  [See this 3m video here to get the idea](https://www.youtube.com/watch?v=f8kEd-xfFWA)
#### Direct Method
> [!tip] What is direct method?
> - In direct method, we construct equations using the given transformation matrix and the transformation matrix we derived from forward kinematics
> - We equate the elements from each of the two transformation matrices
> - We make smart choices of which equations to use in order to simply the problem
> > [See this video to understand](https://www.youtube.com/watch?v=8ftcxK9zZnE)
##### Examples
- [Build Robot using Simple High School Math](https://www.youtube.com/watch?v=8D0sO8mymQ8)
- [Lecture 07a Inverse Kinematics Planar RR Arm - YouTube](https://www.youtube.com/watch?v=61nk2RRIfRQ&list=PLpIxOj-HnDsOcKdRPsbBezbj-xr0FGRyr&index=11)
- [Inverse Kinematics Algebraic Method (Direct)](https://www.youtube.com/watch?v=6NbWkiWLYAM)
- [Inverse kinematics (algebraic method) for a three link robot - YouTube](https://www.youtube.com/watch?v=KDvDPbBTlLI)
#### Inverse Method
> [!tip] What is inverse method?
> - In inverse method, we reduce the coupling of variables in the transformation matrix that we derived from forward kinematics to be able to solve the problem
> - We do this by multiplying by
> 	1. Representing the transformation matrix derived from forward kinematics as the multiplication of transformations between each two links (e.g. $T^0_{2} = T^0_{1} \ T^1_{2} = A_{1} A_{2}$)
> 	2. Equating this multiplication with the given transformation matrix (e.g. $H^0_{2} = A_{1}(q_{1}) A_{2}(q_{2})$
> 	- *Notice* here the advantage of each $A_{i}$ matrix being a function of *only one joint variable* $q_{i}$, we decoupled the joint variables
> 	1. We multiply by the *inverse* of $A_{i}$ matrix on both sides and hope we find an easy equation on the other side (and we repeat) (e.g. $A^{-1}_{1}H^0_{2} = A_{2}$)
> 
> > [See this video to understand](https://www.youtube.com/watch?v=AgYzIpGEGMs)
##### Examples
- [Inverse Kinematics Algebraic Method (Inverse)](https://www.youtube.com/watch?v=kZQqv4G3djc)
- [MCT344 - Lecture 4 - YouTube](https://www.youtube.com/watch?v=mLgboGuLHls&list=PLJY6IpXCY9VIa9zZz4CT3ssCr4bX_1bzN&index=7)
#### Kinematic Decoupling
> [!tip] What is kinematic decoupling?
> - Inverse kinematics is about finding the joint variables to achieve a desired pose (*position* and *orientation*) of the end effector
> - Kinematic decoupling is about segmenting the inverse kinematics problem into two problems
> 	- Finding the joint variables for achieving the desired position of the end effector (*inverse position* kinematics)
> 	- Finding the joint variables for achieving the desired orientation of the end effector (*inverse orientation* kinematics)
> 	
>  > [See this video to understand more](https://www.youtube.com/watch?v=f8kEd-xfFWA&list=PLpIxOj-HnDsOcKdRPsbBezbj-xr0FGRyr&index=12)

#### Examples
- [Lecture 07d Inverse Kinematics Elbow and Spherical Wrist](https://www.youtube.com/watch?v=M4FKDTPAD6g&list=PLpIxOj-HnDsOcKdRPsbBezbj-xr0FGRyr&index=8)

- [Robotics 2 U1 (Kinematics) S5 (Inverse Kinematics) P2 (Procedure and Programming) - YouTube](https://www.youtube.com/watch?v=ZM9GOENJcuo&t=168s)

- [Closed-form Inverse Kinematics for Robots with a Spherical Wrist | Robotic Systems](https://www.youtube.com/watch?v=hEQ1p2WffmA)
- [An Example on How to Compute the Inverse Kinematics of a Robot | Robotic Systems](https://www.youtube.com/watch?v=wmE1KQJmzVM)

- [Analytical Inverse Kinematics Part 1 - YouTube](https://www.youtube.com/watch?v=d3FTIfG0qec&list=PLjoIYgWzjQHK8G2O56jsu56dmjWiipguv&index=14)
- [Analytical Inverse Kinematics Part 2 - YouTube](https://www.youtube.com/watch?v=IeO1uio4fZc)

- [Intro2Robotics Lecture 8: Inverse Kinematics](https://www.youtube.com/watch?v=TPjclVs4RIY&list=PLYZT24lofrjXcuu1iBNWu-NprW2wZD3zu&index=18)
- [Intro2Robotics Lecture 9a: Inverse Kinematics Position - YouTube](https://www.youtube.com/watch?v=9HfcMkfLh6k&list=PLYZT24lofrjXcuu1iBNWu-NprW2wZD3zu&index=19)
- *Exam-like problem*: [Intro2Robotics Lecture 9b: Solve Inverse Kinematics like a Pro!](https://www.youtube.com/watch?v=vUwd-PHuYfQ&list=PLYZT24lofrjXcuu1iBNWu-NprW2wZD3zu&index=20)

- [5.1 Inverse Kinematics](https://www.youtube.com/watch?v=RH3iAmMsolo&list=PLjx2FAhpTe3FGbcjBbxlhf56qVR0XbVNO&index=9)

- [SYSC 4206 Lecture 7: Inverse kinematics 2, 6DOF robot arm with spherical wrist](https://www.youtube.com/watch?v=wDus2EKLg3s&t=1s)

- [7-kinematics of Serial Robots Inverse Kinematics part 1 كيناماتيكا الروبوتات](https://www.youtube.com/watch?v=6_iE5eImozk&list=PLmClnuFMaUREejckxwjrCPNQx3KTBDRCy&index=7)

- [Inverse Kinematics : Kinematic Decoupling [ Part 1]](https://www.youtube.com/watch?v=mDXINGkmEq8&list=PLCaslpN3CQou8Xbufo5rkNTytXujGCwrK)
- [Inverse Kinematics : Kinematic Decoupling [ Part 2 ]](https://www.youtube.com/watch?v=lj6C3KLG4-I&list=PLCaslpN3CQou8Xbufo5rkNTytXujGCwrK&index=2)
- [Inverse Kinematics : Kinematic Decoupling [ Part 3 ] - YouTube](https://www.youtube.com/watch?v=dtrjT6J3dp4)
### Numerical Approach
> [!tip] What is a numerical approach?
> - It's about "guess and check" 
> - It's like having a complicated equation that you want to be equal to some value so you start guessing different inputs to make the output what you want
> - There are sophisticated methods for "guessing and checking" that lead to the solution (converge at the solution) quicker and more efficiently than random guessing and checking
> - An example of these methods is [Newton-Raphson](https://en.wikipedia.org/wiki/Newton%27s_method) method
- Develop the description of the end effector pose with respect to the base using *forward kinematics*
- Use a numerical approach (e.g. Newton-Raphson) to find the values of the joints that achieve the desired end effector pose
## Resources
### Lectures
- [Intro to Robotics_Lb2_Inverse Kinematics.mp4](https://drive.google.com/open?id=1OgYDnT58pGloCIIPcRPM6BUE9_IKtrgP&usp=drive_copy)
- [Robotics 1 - Prof. De Luca Lecture 18 (7 Nov 2014)](https://www.youtube.com/watch?v=WwxQI1jqtrQ&list=PLAQopGWlIcyaqDBW1zSKx7lHfVcOmWSWt&index=19)
- [Ch4 Part 1](https://www.youtube.com/watch?v=PcpI8LPzcuU&list=PLQ3sZ7NCnFlEej8AWH_BfO9W7xlirvK6l&index=28)
### Extras
- [How to cheat at Inverse Kinematics](https://youtu.be/XDSzbJAwJKA?si=DdqWeWZ49XyNo76H)
- [How to Create MATLAB GUI - robot arm simulation [Peter corke Toolbox]-](https://www.youtube.com/watch?v=xF1KaINQwa8&list=PLCaslpN3CQou8Xbufo5rkNTytXujGCwrK&index=4)
- [Robot Academy - Peter Corke](https://petercorke.com/resources/robot-academy/)
- Product of exponentials as an alternative to DH method
	- [Generalized_Exponential_Mech](https://carleton.ca/space-robotics/wp-content/uploads/Generalized_Exponential_Mech.Mach_.Theory_R2.pdf)
	- [Product of exponentials formula - Wikipedia](https://en.wikipedia.org/wiki/Product_of_exponentials_formula)
	- [Robotic manipulators and the product of exponentials formula](https://link.springer.com/content/pdf/10.1007/BFb0031048.pdf)
- [Lecture 08a Inverse Kinematics PUMA - YouTube](https://www.youtube.com/watch?v=tHfb5ADF8og&list=PLpIxOj-HnDsOcKdRPsbBezbj-xr0FGRyr&index=36)
- [6 Axis Robot Forward & Inverse Kinematics Tutorial - Denavit Hartenberg Parameters With the AR4-MK2](https://www.youtube.com/watch?v=FNuiNmoqaZM) 
- [CoppeliaSim Demos - YouTube](https://www.youtube.com/watch?v=ROEir8gfi9E)
- [Discussion -1- MCT344: Industrial Robotics](https://www.youtube.com/watch?v=b2LM_1hLXPU&list=PLJY6IpXCY9VIa9zZz4CT3ssCr4bX_1bzN&index=11)
