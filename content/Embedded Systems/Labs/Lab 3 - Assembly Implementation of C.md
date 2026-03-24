
| Name         | ID          |
| ------------ | ----------- |
| Mo'men Ahmed | **2200768** |
| John Sameh   | **2200414** |

## 1. Introduction & Overview

This laboratory exercise involves compiling a C application to analyze the resulting compiler-generated assembly code and the linker-generated map file.

## 2. Learning Outcomes

- Compiling a C program
- Reviewing the assembly output listing and the map file.

## 3. Requirements

This lab utilizes the following environment:
- **Software**: KEIL µVision5 MDK IDE.    
- **Hardware**: STM32 Nucleo-F401RE development board.
## 4. Procedure

1. Open the `CinAsmLab` project workspace.
    
2. Ensure that the compiler is configured to generate assembly listings (`Options -> Listing -> C Compiler Listing`) and is set to maximum optimization (`Options -> C/C++ -> Optimization Level 3 (-O3)`).
    
3. Compile the source code, then review the output listing and map files to answer the questions below.
    

---

### **4.1 Assembly Code Listing**

 **4.1.1 Evaluating the `INIT_LIST` Function**

- **Q4: Which context is saved upon entry?**
    
    - Registers `r4`, `r5`, and `lr` are preserved upon entering the function.
        
- **Q5: Which instruction restores context and returns?**
    
    - The `POP {r4, r5, pc}` instruction is responsible for restoring the saved context and returning execution from the subroutine.
        
- **Q6: Which register acts as the loop counter `i`?**
    
    - Register `r0` functions as the loop counter variable `i`.
        
- **Q7: How is the operation `i * 2000` performed in assembly?** * The instruction `MOVS r2, #0x7d` loads the decimal value 125 (`0x7d`) into register `r2` (or `r1` depending on the exact build).
    
    - Next, `LSLS r2, r2, #4` shifts the register left by 4 bits, effectively multiplying it by 16, resulting in $16 \times 125 = 2000$.
        
    - Finally, `MULS r2, r0, r2` multiplies the counter `i` (held in `r0`) by 2000, storing the final product back in `r2`.
        
- **Q8: How is the operand `offset[i]` accessed in assembly?**
    
    - `LDR r4, |L1.104|` assigns `r4` the address of the `.data` section.
        
    - According to the map file, the `.data` section and the `offset` array begin at `0x2000_00d8`, making `r4` the base pointer.
        
    - The array stores integers, which are each 4 bytes in length.
        
    - To determine the specific element's address, a calculation is needed.
        
    - `LSLS r3, r0, #2` shifts the index `i` (in `r0`) left by 2 bits, effectively multiplying it by 4 to account for the integer byte size.
        
    - The exact address is the base address (in `r4`) plus 4 times the index (in `r3`).
        
    - `LDR r5, [r4,r3]` retrieves the value at this calculated memory location into `r5`, representing the value of `offset[i]`.
        

**4.1.2 Evaluating the `FIND_IN_LIST` Function**

- **Q9: Which context is saved upon entry?**
    
    - No context is preserved when entering this function.
        
- **Q10: Which instruction returns from the subroutine, and why is it different?**
    
    - The function uses `BX lr` to return.
        
    - This differs from `init_list` because no context was pushed to the stack, so nothing needs to be popped off.
        
- **Q11: Which register holds the `key` argument?**
    
    - Register `r0` contains the `key` argument.
        
- **Q12: How is the loop repeat test performed?**
    
    - `ADDS r0, r0, #1` increments the variable `i` by one.
        
    - `CMP r0, #0xa` evaluates `r0` against 10 by performing a subtraction.
        
    - `BCC |L1.52|` loops back if the carry flag is cleared. This indicates the subtraction did not result in a borrow, meaning `i` remains less than or equal to 10.
        

---

### **4.2 Map File**

**4.2.1 Default Program**

- **Q13: Image Symbol Table (Global Symbols)**

|**Symbol**|**Starting Address**|**Size**|
|---|---|---|
|`$Super$$main`|`0x0000_0851`|26|
|`list_init`|`0x0000_0809`|46|
|`list_find`|`0x0000_0837`|26|
|`list`|`0x2000_0100`|40|
|`offset`|`0x2000_00d8`|40|

- **Q14: Memory Map for `main.o`**
    
    - `.text`: Size `0x6c` bytes, Type: Code, Attributes: Read-only.
        
    - `.data`: Size `0x28` bytes, Type: Data, Attributes: Read-write.
        
    - `.bss`: Size `0x28` bytes, Type: Zero, Attributes: Read-write.
        
- **Q15: STACK Size**
    
    - The stack size is `0x0400` bytes, which equals 1024 bytes.
        
    - Yes, this aligns with the memory layout file declaration: `ARM_LIB_STACK (0x20000000+4096) EMPTY - 0x0400`.
        
- **Q16: Image Component Sizes for `main.o`**
    

|**Configuration**|**Code**|**data**|**RO Data**|**RW Data**|**ZI Data**|**Debug**|
|---|---|---|---|---|---|---|
|non-const offset|108|10|0|40|40|1535|

**4.2.2 Specifying C Data as Read-Only to Save RAM**

Change the C source code to declare the `offset` array as `const`, then rebuild.

- **Q17: Updated Image Symbol Table**
    

|**Symbol**|**Starting Address**|**Size**|
|---|---|---|
|`$Super$$main`|`0x0000_0851`|26|
|`list_init`|`0x0000_0809`|46|
|`list_find`|`0x0000_0837`|26|
|`list`|`0x2000_00d8`|40|
|`offset`|`0x0000_0a84`|40|

- **What changed and why?**
    
    - The `offset` array shifted from RAM (`0x2000_00d8`) to ROM (`0x0000_0a84`).
        
    - Consequently, `list` moved to the first position in RAM (`0x2000_00d8`), as it no longer follows the `offset` array.
        
- **Q18: Changes in `main.txt`**
    
    - The `offset` array is relocated to `.constdata` instead of `.data`, represented by the assembly directive: `AREA ||.constdata||, DATA, READONLY, ALIGN=2`.
        
- **Q19: Updated Memory Map for `main.o`**
    
    - `.text`: `0x6c` bytes, Code, Read-only.
        
    - `.constdata`: `0x28` bytes, Data, Read-only.
        
    - `.bss`: `0x28` bytes, Zero, Read-write.
        
- **Q20: Updated Image Component Sizes**
    

|**Configuration**|**Code**|**data**|**RO Data**|**RW Data**|**ZI Data**|**Debug**|
|---|---|---|---|---|---|---|
|const offset|108|10|40|0|40|1539|

- **What changed and why?**
    
    - By declaring `offset` as `const`, the module requires 40 bytes of Read-Only (RO) data instead of Read-Write (RW) data.
        
    - This technique successfully minimizes RAM requirements.
        
    - Because microcontrollers typically possess significantly more Flash ROM capacity than RAM, this is a highly valuable optimization.