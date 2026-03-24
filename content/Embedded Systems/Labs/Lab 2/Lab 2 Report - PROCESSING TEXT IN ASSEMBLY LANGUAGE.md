
| Name         | ID          |
| ------------ | ----------- |
| Mo'men Ahmed | **2200768** |
| John Sameh   | **2200414** |

## 1. Compiling the code
![[Pasted image 20260301225801.png]]
## 2. Using simulation instead of physical board
![[Pasted image 20260301225913.png]]
## 3. Running the program till start of main using a breakpoint
![[Pasted image 20260301230021.png|697]]

| Register | Value        |
| -------- | ------------ |
| R13 (SP) | `0x20000660` |
| R14 (LR) | `0x08000233` |
| R15 (PC) | `0x08000314` |

## 4. Start of program in disassembly
**Instruction**: `0x08000314` `B580`      `PUSH`          `{r7,lr}`.
**Interpretation:** The same as the program counter (PC).
## 5. Instruction execution
![[Pasted image 20260221163935.png|center]]
**Registers changed**: R13 (SP), R15 (PC).
**Relation with instruction**: 
- SP was reduced by 2 to (from `0x20000660` to `0x20000658`) because two register values were pushed to the stack. 
- The PC was increased by 2 because the difference between each two instructions is two.

## 6. Finding first 4-byte long instructions
![[Pasted image 20260221165951.png|center]]

## 7. Finding values of some registers before executing `my_strcpy`
![[Pasted image 20260301231648.png]]

| Register | Value        |
| -------- | ------------ |
| R13 (SP) | `0x20000628` |
| R14 (LR) | `0x08000233` |
| R15 (PC) | `0x08000344` |
## 8. Executing `my_strcpy` function
![[Pasted image 20260301231810.png]]

| Register | Value        |
| -------- | ------------ |
| R13 (SP) | `0x20000628` |
| R14 (LR) | `0x08000349` |
| R15 (PC) | `0x08000374` |
The LR was changed to point to the new location to be returned to. The PC was changed to the new instruction address matching the disassembly window.
## 9. Registers holding `my_strcpy` arguments
![[Pasted image 20260301232338.png]]

| Argument  | Register        | Value           |
| --------- | --------------- | --------------- |
| `src_ptr` | R0 `0x20000644` | "Hello, world!" |
| `dst_ptr` | R1 `0x08000630` | ""              |
## 10. Viewing values of arguments in memory using Memory Windows
![[Pasted image 20260301232746.png]]
![[Pasted image 20260301232758.png]]
## 11 and 12. Content
| Argument  | Content       |
| --------- | ------------- |
| `src_ptr` | Hello, world! |
| `dst_ptr` | .             |
## 13. 
| Register | Function                             |
| -------- | ------------------------------------ |
| R0       | Points to the character to be copied |
| R2       | Holds the character copied           |
| R1       | Character is pasted here             |
![[Pasted image 20260301234140.png]]
## 14. Values before stepping out of the function
![[Pasted image 20260301234542.png]]
![[Pasted image 20260301234738.png]]

| Register | Value        |
| -------- | ------------ |
| R13 (SP) | `0x20000620` |
| R14 (LR) | `0x08000349` |
| R15 (PC) | `0x08000386` |
## 15. PC after stepping out of the function
![[Pasted image 20260301234833.png]]
R15 (PC): `0x08000348`
## 16. Relationship between previous LR and PC
They are equal. The program returned to the point in main before entering the function.

![[Pasted image 20260221170413.png|center]]

## 17. Verifying `my_capitalize` 
![[Pasted image 20260301235151.png]]