---
dg-publish: true
---

| Name                   | ID          |
| ---------------------- | ----------- |
| Mohammed Hany Mohammed | **2201377** |
| Ziad Omar Ahmed        | **2200533** |
| Youssef Shaban Hassan  | **2200455** |
## Phase 1: Setup and Simulation
**1. Code Compilation**
The project code was successfully compiled with no errors prior to debugging.
![[Pasted image 20260301225801.png]]

**2. Simulation Environment Configuration**
The debug settings were adjusted to utilize the software simulator rather than flashing a physical board.
![[Pasted image 20260301225913.png]]

## Phase 2: Execution Flow and Disassembly Analysis
**3. Halting Execution at `main()`**
A breakpoint was utilized to pause the program immediately at the start of the `main` function. The core CPU registers at this exact moment were:

| Core Register | Hexadecimal Value |
| :--- | :--- |
| Stack Pointer (R13/SP) | `0x20000660` |
| Link Register (R14/LR) | `0x08000233` |
| Program Counter (R15/PC) | `0x08000314` |

![[Pasted image 20260301230021.png|697]]

**4. Disassembly at Program Entry**
- **Instruction:** `PUSH {r7,lr}` (Opcode: `B580`) located at `0x08000314`.
- **Observation:** This memory address directly corresponds to the current value of the Program Counter (PC).

**5. Post-Instruction State**
![[Pasted image 20260221163935.png|center]]
Executing the initial `PUSH` instruction modified two crucial registers:
- **SP (R13):** Decreased from `0x20000660` to `0x20000658`. This shift occurred because two register values were pushed onto the memory stack.
- **PC (R15):** Incremented by 2, moving to the next sequential instruction (accounting for the standard 2-byte instruction spacing).

**6. Locating 32-bit (4-byte) Instructions**
![[Pasted image 20260221165951.png|center]]

## Phase 3: Analyzing Function Calls (`my_strcpy`)
**7. Register State Prior to Function Call**
Before stepping into the custom string copy function, the core registers were captured as follows:

| Core Register | Hexadecimal Value |
| :--- | :--- |
| SP (R13) | `0x20000628` |
| LR (R14) | `0x08000233` |
| PC (R15) | `0x08000344` |

![[Pasted image 20260301231648.png]]

**8. Stepping Into `my_strcpy`**
![[Pasted image 20260301231810.png]]
Upon jumping into the function, the registers updated to reflect the new execution context:

| Core Register | Hexadecimal Value |
| :------------ | :---------------- |
| SP (R13)      | `0x20000628`      |
| LR (R14)      | `0x08000349`      |
| PC (R15)      | `0x08000374`      |

*Analysis:* The Link Register (LR) was updated to store the return address. Simultaneously, the Program Counter (PC) was updated to the address of the first instruction inside the function, matching the disassembly window.

**9. Function Argument Passing**
The arguments passed into the function were loaded into the standard low registers:

| Argument | Assigned Register | Value / Data |
| :--- | :--- | :--- |
| `src_ptr` | R0 (`0x20000644`) | "Hello, world!" |
| `dst_ptr` | R1 (`0x08000630`) | "" (Empty) |

![[Pasted image 20260301232338.png]]

**10, 11, & 12. Memory Window Inspection**
Using the memory viewer, the exact contents pointed to by the argument registers were verified:

| Pointer Variable | Memory Content |
| :--- | :--- |
| `src_ptr` | Hello, world! |
| `dst_ptr` | . |

![[Pasted image 20260301232746.png]]
![[Pasted image 20260301232758.png]]

**13. Register Roles During Execution**
During the active copying process, specific registers were assigned the following tasks:

| Register | Specific Function |
| :--- | :--- |
| **R0** | Acts as the pointer to the source character being copied. |
| **R2** | Temporarily holds the character data during transit. |
| **R1** | Acts as the destination pointer where the character is pasted. |

![[Pasted image 20260301234140.png]]

## Phase 4: Function Exit and Validation
**14. State Prior to Function Return**
Right before stepping out of `my_strcpy`, the execution registers showed:

| Core Register | Hexadecimal Value |
| :--- | :--- |
| SP (R13) | `0x20000620` |
| LR (R14) | `0x08000349` |
| PC (R15) | `0x08000386` |

![[Pasted image 20260301234542.png]]
![[Pasted image 20260301234738.png]]

**15 & 16. Returning to Main**
After successfully stepping out of the function, the Program Counter updated:
- **New PC (R15):** `0x08000348`
![[Pasted image 20260301234833.png]]

*Relationship:* The Program Counter is now effectively equal to the return address previously held in the Link Register (LR). The program execution has successfully navigated back to the point in `main` immediately following the function call.
![[Pasted image 20260221170413.png|center]]

**17. Final Validation**
The subsequent `my_capitalize` function was also executed and verified.
![[Pasted image 20260301235151.png]]