https://drive.google.com/file/d/1wdP_o49oZWa9BLWiOpwh5hQ7kxPRamZm/view?usp=drivesdk

- Byte: least accessible memory unit (RAM)
- 32 address locations -> 4GB
- Executing code on RAM
> [!question] Questions
> - How do number operations and conversions work
> 	- Hex to binary
> 	- Dec to binary
> 	- ...
> - Negative numbers and their representations
> - Overflow and carry out

---

The reason we can ignore the carry-out in two's complement is that it represents a value of 2^n (where n is the number of bits), which mathematically "cancels out" the negative weight of the most significant bit.
In an 8-bit system, the carry-out represents 2^8 = 256. Because of the way two's complement is structured, this carry is essentially an artifact of the math that doesn't belong in our 8-bit result.
The Mathematical Explanation
In two's complement, the leftmost bit (the Most Significant Bit or MSB) has a negative weight. For 8 bits, that weight is -2^7 = -128.
When you perform addition and a carry-out occurs, you are effectively adding 2^8 (256) to the result.

Mathematically, discarding that "256" is what allows the negative MSB to correctly represent the wrap-around logic of signed numbers.
A Practical Example: -1 + 1
Let's look at the simplest case using 8 bits:
 * -1 in two's complement: 11111111_2
 * +1 in binary: 00000001_2
 * The Addition:
     11111111  (-1)
     \+ 00000001  (+1)
    =
     (1)00000000  (Result is 0, with a carry-out of 1)

If we kept the carry, the answer would be $256_{10}$. By ignoring the carry, we get $00000000_2$, which is $0_{10}$—the correct answer.

Why this is helpful for your Mechatronics projects
Since you are working with microcontrollers like the ESP32 and Arduino, you'll encounter this constantly. Hardware ALUs (Arithmetic Logic Units) are designed to simply "let that bit fall off."
 * Efficiency: The processor doesn't need extra logic to handle the 9th bit for standard signed operations.
 * Modular Arithmetic: Two's complement addition is technically addition "modulo 2^n." The carry-out is just the "remainder" that exceeds the modulus.
How to tell if the result is actually wrong
As long as you don't have overflow (where you add two negatives and get a positive, or vice versa), the result remains perfectly valid even with a carry-out.

| Situation | Carry-Out? | Result Validity |
|---|---|---|
| -39 + 92 = 53 | Yes | Correct |
| -103 + (-69) = -172 | Yes | Incorrect (Overflow) |
Would you like to see how this same "carry-out" logic applies when you perform subtraction using two's complement?


---

The APSR (Application Program Status Register) is a specialized register within the ARM processor that tracks the status of the most recent mathematical or logical operation. Since you are studying ARMv6-M architecture (likely for your Embedded Systems course), this is where the processor "remembers" if a result was zero, negative, or if an overflow occurred.
Understanding the APSR

The APSR is primarily composed of Condition Code Flags (the N, Z, C, and V bits you see in your image). These flags allow the processor to make decisions—like whether to execute a "jump" or "branch" in your code—based on the outcome of a previous calculation.
 * N (Negative): Set to 1 if the result is negative (bit 31 is 1).
 * Z (Zero): Set to 1 if the result is exactly zero.
 * C (Carry): Set if an addition results in a carry-out or a subtraction requires a borrow.
 * V (Overflow): Set if the signed result is too large or too small to fit in the register (the "logical error" we discussed).
 
What does "Reserved" mean?
In computer architecture, a Reserved field refers to bits within a register that are currently unused by the processor's hardware but are set aside for a specific purpose.
Why is it reserved?
 * Future-Proofing: ARM designs these architectures to last decades. By reserving bits (bits 0 through 26 and 28 in your image), they ensure that if they add a new feature in a future version (like a new flag for DSP operations), they have a dedicated "parking spot" for it without breaking existing software.
 * Compatibility: If you write code for an ARMv6-M processor today, it should ideally run on a newer ARMv7 or ARMv8 processor tomorrow. If those bits weren't reserved, a newer processor might use them for something else, causing your old code to crash or behave weirdly.
 * Instruction Alignment: Registers are often kept at standard sizes (like 32 bits). If the architecture only needs 4 or 5 flags, the remaining bits are "padded" as reserved to keep the register structure clean and aligned with the 32-bit data bus.
 
> Pro-Tip for your Lab: When writing assembly or low-level C for your ESP32 or ARM boards, the rule of thumb for reserved bits is: Read as zero, and never try to write to them. Modifying them can lead to "unpredictable" behavior if the hardware uses those bits for internal testing.

![](https://youtu.be/7towQUO9aZI?si=2NeoCmPLyOBZ4_cP)