## What are these systems?
- For a given magnitude response, there exists multiple transfer functions that can produce that same magnitude response exactly.
- However, those transfer functions would produce different phase responses (by *adding more phase delay to the inputs*)

![[Pasted image 20260326205236.png|699]]

- There is only one minimum phase system for a given magnitude response, but there are an infinite amount of non-minimum phase systems that have the same magnitude response but add different amounts of phase delays 
- The system whose phase response is the minimum for a given magnitude response is called the *minimum phase system* (that is like saying: this is the system that can produce this magnitude response with the minimum amount of phase delay added to the inputs)
- Other systems are called non-minimum phase systems

## How do these other systems manage to produce the same magnitude response with different phase responses?
- **Adding a pure time delay**: magnitude response is affected by steady state value. If a system has an added *extra pure time delay*, its magnitude response will not change, but its phase response will be changed (phase delay increases)
	- The bad thing about pure time delay or *transport lag* is that it phase delay increases with frequency and approaches $-\infty$ as $\omega \to \infty$
- **Moving one or more zeros to the RHP**: RHP zeros means negative $s$. A negative $s$ is like a negative derivative. This negative derivative "fights" the input signal by trying to go to the other direction. This "fight" adds a delay to the system
	- Systems with RHP initially respond opposite to the input signal then correct themselves to arrive at the desired value at steady state (see the resources below for examples)

	![[Pasted image 20260326210359.png]]

## Resources
- [What Are Non-Minimum Phase Systems? | Control Systems in Practice](https://www.youtube.com/watch?v=jGEkmDRsq_M)
- [Why Time Delay Matters | Control Systems in Practice](https://www.youtube.com/watch?v=wouhREkqZa0)
- [What are Transfer Functions? | Control Systems in Practice - YouTube](https://www.youtube.com/watch?v=2Xl7--Df3g8)