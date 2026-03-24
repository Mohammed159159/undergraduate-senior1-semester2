---
dg-publish: true
---
## Rigid Motions
- Rigid motions is all about describing things with respect to each other.
- It is about describing things (*points* and *vectors*) in a frame (e.g. $x_{1},y_{1},z_{1}$) with respect to a reference frame (e.g. $x_{0},y_{0},z_{0}$).
- The first step is representing the target frame with respect to the reference frame (devising a relationship between the two frames)
	- If we have this relationship, we can represent *any point in the target frame* with respect to the reference frame
	- These types of relationships are called **Coordinate Transformations** (as in transforming the coordinates of one frame to the coordinates of another frame, seeing how something in the target frame can be described with respect to the reference frame)
	- There are a lot of transformations
		- Rotation
		- Translation
		- Reflection
		- Scaling
		- Shear
	- For robotics, rotation and translation are the most important transformations
## Rotation
> [!tip] Describing the rotation of a **point to another frame** with respect to an **original frame** is just *projecting* this point on the axes of the original frame (unit vector of the original frame)
> $$p^0=p^1 \cdot \vec{u} = \begin{bmatrix}p \cdot x_{0}\\p \cdot y_{0} \\ p \cdot z_{0}\end{bmatrix}$$

### Questions
> [!question] Parameterization
> ![[Pasted image 20260310115446.png]]
> vs.
> ![[Pasted image 20260310115521.png]]

## Homogenous Transformation
![[Homogenous Coordinates]]
- [Transformation is Easier Than Solving Quadratic Equation - YouTube](https://www.youtube.com/watch?v=FvgGSgvB2I0)
## General Remarks
- Coordinate vector vs. Free vector in space
- Rotation of frames (frames that are not parallel) makes the difference between coordinate vector and free vector. This demands the description of rotation between the frames
- Sequence of rotation, axis of rotation
- Current frame -> post multiply | base frame -> pre multiply
- Parameterization
	- Euler angles (ZYZ)
	- yaw, pitch, roll
- Homogenous transformation matrix