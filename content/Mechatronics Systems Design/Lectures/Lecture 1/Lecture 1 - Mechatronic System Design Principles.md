---
dg-publish: true
---

![[Lecture 01.pdf]]

## Mechatronics and Synergy
- System view and big picture are important for ensuring an integrated, optimized, and compatible design
![[Lecture 01.pdf#page=9&rect=10,3,950,506|Lecture 01 (1), p.9]]
- Mechatronics is a philosophy and an engineering framework for tackling interdisciplinary problems
![[Lecture 01.pdf#page=10&rect=20,57,935,518|Lecture 01 (1), p.10]]
## [[Mechatronic Systems Design Process]]
- Mechatronic system design process is as follows: problem -> requirements -> conceptual design (layout/block diagram) -> mathematical modeling and simulation (design) -> optimization -> prototyping -> deployment
- Optimization occurs when the requirements are translated into a performance index that allows for comparing multiple solutions
- Mechatronics system components. This is a layout/block diagram that is used to determine the initial conceptual solution for satisfying the requirements for solving a problem
![[Lecture 01.pdf#page=11&rect=39,40,879,504|Lecture 01 (1), p.11]]
- Strain gauge measures strain, not force. Strain, calculated due to change in resistance, is used for calculating stress
- [EEG](https://www.mayoclinic.org/tests-procedures/eeg/about/pac-20393875) and [EMG](https://www.hopkinsmedicine.org/health/treatment-tests-and-therapies/electromyography-emg) sensor signals are in micro volts. They must be amplified to be sensed by the controller
- Drivers and interfacing components are needed to allow the low power control signal to operate a high-power actuator
- Modeling and simulation are key for engineering-based design that accelerates solutions and saves money. It can be also used for control
![[Lecture 01.pdf#page=12&rect=14,94,935,510|Lecture 01 (1), p.12]]
## Industrial Revolutions
- What distinguishes each industrial revolution?
![[Lecture 01.pdf#page=13&rect=325,129,944,434|Lecture 01, p.13]]
	- 1.0: from man power to machine power
	- 2.0: from steam to electricity and mass production
	- 3.0: from hardware programming to computers and automation
	- 4.0:  real-time autonomy  (machines self-monitor and take action) and connectivity (machines communicate with each other and generate data)
	- 5.0: from focusing on industry to focusing on society and the environment
		![[Industry 5.0]]
	- Industry 5.0 is distinguished by this human-centric approach
### Cyber-Physical Systems
- What are cyber physical systems?
	![[Cyber-Physical Systems The Core of Industry 4.0]]
	![[Lecture 01.pdf#page=13&rect=21,204,304,425|Lecture 01, p.13]]
	- A robot is a cyber-physical system
### $I^3$ Mechatronics (Smart Factory)
![[Lecture 01.pdf#page=15&rect=7,52,956,512|Lecture 01, p.15]]
- YASKAWA, the company who coined the term 'mechatronics', developed i-cubed smart factory solution
- The core of the i-cubed concept is having an integrated solution for collecting and analyzing data and offering new intelligent and innovative insights for improving the level of production and quality  
- The smart factory concept starts from ERP, where business and market decisions are made. These decisions are made based on big data analysis, models, and IoT-AI insights. These decisions are then forwarded to the MES yielding factory-level decisions of what to be produced. The factory-level PCs and PLC controllers receive the order from the MES and feedback from real-time data collection and execution from YASKAWA edge cockpit and based on the models made from big data. They convert these information into action and production in the factory. The process generates data that are further used in the real-time data collection and execution process.
- In essence, smart factory is about using big data and digital technology to make better decisions and creating more opportunities for improvement for manufacturing and supply chain management
![[Lecture 01.pdf#page=16&rect=24,34,949,495|Lecture 01, p.16]]
- The smart factory concept could be further expanded using **Digital Twin** technology
- A digital twin is a digital model that accurately represents the physical system and is connected to it in real-time. It can gain information about the real system and take action on the real system. This technology could be used for:
	- Predictive maintenance: noticing potential future failure in the physical system and resolving the issue before it occurs
	- Decision making: training a robot in a simulation environment at a much higher speed than in reality and using the learned insights in the physical world
- **Machine learning** consists of:
	- Supervised learning: by showing the machine examples of input and output
	- Unsupervised learning: by showing the machine inputs and letting it notice patterns among these inputs and cluster them into groups
	- Reinforcement learning: by showing the machine what behavior is good and what behavior is bad and letting it learn through trial and error like a child
## Microlecture - How to Engineer a Robotic Dog
- Observe the process of going from problem to requirements to conceptual design ...
- Notice that the step of modeling and simulation is skipped just for demonstration
- Notice how optimization occurred
	- Limitations of the current system were noted
		- Robot is not agile: it cannot avoid obstacles and cannot be dropped
	- The problem got narrowed down (making the robot more agile like the dog) was re-studied for obtaining new requirements
		- The dog muscles stored energy, allowing the dog to make agile maneuvers
		- Muscles elastic behavior provide agility and enables efficient mobility
		- [Asimo](https://www.youtube.com/watch?v=fAFAcFIWDA8) is the first Humanoid robot, according to the professor. When the energy consumption of the robot was analyzed, it was observed that it consumes more than 10x the amount consumed by humans for walking a distance of 1m. This is because human's walking behavior make use of the inertia of the leg and gravity while walking
			![[Lecture 1 - Introduction 2026-02-08 10.37.27.excalidraw]]
		- Elasticity? Let's add a spring! 
		- The spring was also used for measuring and controlling the force on the robot by measuring the displacement of the spring (a much cheaper replacement for force or torque sensors). This lead to the ability of critically damping vibrations
## Mechanical Design Considerations for Building Successful Machines
![[Lecture 01.pdf#page=19&rect=30,121,913,532|Lecture 01, p.19]]
- The lighter, the easier it is to control and the faster the system responds: $\omega_{n}=\sqrt{ \frac{K}{M}}$; remember $t_{\text{settling}}=\frac{4}{\zeta \omega_{n} }$
- The less friction, the less non-linearity, the better you can estimate the systems parameters and control
- It should not just achieve the function, it should achieve the function efficiently: the lighter the better
- The more rigid, the easier it is to control
- Watch out of reducing the number of desired degrees of freedom while trying to make your system more rigid
	![[Lecture 1 - Introduction 2026-02-08 11.10.37.excalidraw]]
- Over-sizing the actuator means higher cost and weight
	- A trick is using [counter-weight or constant-force springs](https://www.youtube.com/watch?v=zOr6Hl4zH1g&t=110s) (this is known as [Gravity Compensation](https://www.nature.com/research-intelligence/nri-topic-summaries/gravity-compensation-mechanisms-in-robotic-systems-micro-61664))
## Follow Mechatronic Systems Design Process
![[Lecture 01.pdf#page=22&rect=36,19,870,527|Lecture 01, p.22]]
- Modeling and simulation are crucial for reducing development time and cost
### Product Design = Problem/Need $\to$ Engineering Requirements
![[Lecture 01.pdf#page=24&rect=33,39,862,522|Lecture 01, p.24]]
- Researching the market and understanding customer needs
- Breaking down the problem or desire into conceptual (qualitative) detailed needs
- There is a distinction between marketing requirements and engineering requirements. Marketing requirements vaguely describe customer needs, while engineering requirements are quantitative and detailed
- Product requirements in general are usually handled by product design teams
### Functional Structure Diagram = Requirements $\to$ Conceptual Design (Functional Block Diagram)
- This is a tool that can be used for going from the needs and requirements to a conceptual design (layout/block diagram) of the system
> **Note**: in the context of mechatronic systems design, functional block diagrams are mechatronic block diagrams
### How to Innovate and Solve Problems
- Throughout the mechatronic systems design process, problems requiring creative solutions will pop up
- TRIZ is a collection of general solutions to general common problems that can be applied to your specific problem
![[Lecture 01.pdf#page=38&rect=492,215,927,516|Lecture 01, p.38]]
- TRIZ compiles:
	- General problems/features to improve (https://www.innovation-triz.com/TRIZ40/TRIZ_Matrix.xls)
	- Check out [TRIZ40 - : Solve Technical Problems with TRIZ Methodology](https://www.triz40.com/TRIZ_GB.php)
	- General solutions