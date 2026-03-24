---
dg-publish: true
---

| Name                  | ID      |
| --------------------- | ------- |
| Mohammed Hany         | 2201377 |
| Youssef Shaban Hassan | 2200455 |
| Ziad Omar Ahmed <br>  | 2200533 |

## What is the difference between using the typedef for type definition and using the define for the same cause ?

|   |   |   |
|---|---|---|
|Feature|typedef|#define|
|Processing Stage|Handled by the compiler.|Handled by the preprocessor before compilation (text replacement).|
|Type Checking|Provides strong type checking because the compiler understands it as a type alias.|No type checking; it's purely textual replacement, which can lead to subtle errors.|
|Scope|Obeys scoping rules like any other variable declaration (block scope, file scope, etc.).|Effective from the point of declaration until the end of the compilation unit or an #undef directive, ignoring scope.|
|Complex Types|Can be used effectively for complex types, such as function pointers and arrays.|Fails or leads to unexpected behavior with complex declarations (e.g., in pointer declarations, only the first variable might be a pointer).|
|Readability/Debugging|Generally leads to cleaner, more understandable code, and debuggers can work with the type aliases.|Can create "macro soup" and makes debugging harder as the compiler only sees the underlying type after substitution.|

## Define X as a 10 using the #define macro definition. Create also a global variable that is an int y. Then write down the differences between the X and why in the following points

### When are they resolved in the build process?

- #define: preprocessing
    
- typdef: compilation
    
### 2. Where is each one of them stored?

- `X` (#define): Does not have a specific memory address and is not stored in RAM. It is a text substitution that becomes embedded directly into the machine code instructions (often as an immediate value).
    
- `y` (global int): Stored in the Data Segment (specifically, the initialized data segment) of the program's memory
    
### 3. How can each of them be used in the code?

- `X` (#define): Used as a literal substitution. It cannot be used with the address-of operator (&X is illegal). It is commonly used for array sizes, constants, or configuration parameters.
    
- `y` (global int): Used as a variable. It has a memory address, can be modified, and can be passed by reference
    

### 4. Which of them could be altered and why?

  
- `X` (#define): Cannot be altered during runtime. Once defined, its value is fixed. It can only be changed by using #undef X followed by a new #define X in the source code before recompilation.
    
- `y` (global int): Can be altered at any time during runtime (e.g., y = 20;). As a variable, it is designed to hold mutable data

## Create a macro that adds two parameters. Also Create a function that adds two variables and returns the sum. Then Compare the differences between the macro and the function in the following points
### 5. When will each be resolved in the build process?
- MACROS: preprocessing
- Function: compilation
### 6. What will happen when you pass wrong parameters to each one of them
- Preprocessing does not throw an error
- Function throws a compilation error
### 7. What will be the sequence in the function call and how will that differ in the macro like function
- Function will be compiled to machine code and run on the stack
- MACRO will be preprocessed and the result will be replaced and hardcoded before compilation
## What will happen if the variable is declared in the .h file ? Then the .h file is included in 2 .c files? Why do we add the variable extern declaration in the .h file ?
- The linker would produce an error
- The variable declaration will be doubled
- `extern` is used for sharing variable declaration across multiple `.c` files
## The main types of errors encountered when building and running C programs are
- Syntax Errors
- Run-time Errors
- Logical Errors
- Linker Errors
- Semantic Errors
### Syntax Errors

- **Missing semicolon**: One of the most common errors.
```c
#include <stdio.h>
int main() {
	printf("Hello World") // Error: Missing semicolon
	return 0;
    }
```

- **Misspelled keywords**: Using `Printf` instead of the lowercase `printf`.

```c
#include <stdio.h>
int main() {
	Printf("Hello World"); // Error: 'Printf' undeclared
	return 0;
}
```

- **Undeclared variables**: Using a variable without first declaring its type.

```c
#include <stdio.h>
int main() {
a = 10; // Error: 'a' undeclared
printf("%d", a);
return 0;
}
```
### Run-time Errors

These errors occur during the execution of the program, after successful compilation. They often cause the program to crash or terminate unexpectedly. 

- **Division by zero**: An illegal operation that causes a program crash.
    
```c
#include <stdio.h>
int main() {
	int x = 10;
	int y = 0;
	int result = x / y; // Run-time Error: Floating point exception
	printf("%d\n", result);
	return 0;
}
```
    
- **Accessing invalid memory/Array index out of bounds**: Trying to access memory that the program does not have permission for.

```c
#include <stdio.h>
int main() {
	int numbers[3] = {1, 2, 3};
	printf("%d\n", numbers[8]); // Run-time Error: Accessing out-of-bounds element
	return 0;
}
```

### Logical Errors

The program compiles and runs without crashing, but it produces an incorrect or undesired output because of a flaw in the programmer's logic or algorithm.

- **Incorrect formula**: Using subtraction instead of addition for a sum.
    
```c
#include <stdio.h>
int main() {
	int a = 5, b = 10;
	int sum = a - b; // Logical Error: Should be a + b
	printf("Sum = %d\n", sum); // Output: Sum = -5
	return 0;
}
```
    
- **Semicolon after a loop condition**: This creates a loop with an empty body, which executes repeatedly and the subsequent block runs only once after the loop finishes.

```c
#include <stdio.h>
int main() {
	int i;
	for (i = 0; i < 5; i++); // Logical Error: Semicolon makes an empty loop body
	{
		printf("Hello World\n"); // This statement runs only once
	}
	return 0;
}
```

### Linker Errors

These errors occur during the linking phase, after compilation, when the linker cannot find the definition of a function or variable that was declared in the program.

- **Undefined function call**: Declaring a function but not providing its definition.

```c
#include <stdio.h>
void myFunction(); // Declaration
int main() {
	myFunction(); // Linker Error: Undefined reference to 'myFunction'
	return 0;
}
// No definition provided for myFunction
```
    
- **Incorrect `main` function signature**: Misspelling `main` as `Main`.
    
```c
#include <stdio.h>
int Main() { // Linker Error: Undefined reference to 'main' (entry point is missing)
	printf("Hello");
	return 0;
}
```

### Semantic Errors

These errors happen when the syntax is correct, but the meaning of the statement is not valid in the context of the program, which can sometimes be caught by the compiler.

- **Type mismatch in assignment**: Assigning a string literal to an integer variable.

```c
#include <stdio.h>
int main() {
	int x = "Hello"; // Semantic Error: Initialization makes integer from pointer without a cast
	return 0;
}
```
    
- **Using an uninitialized variable in an expression**: The compiler may issue a warning, as the behavior is undefined.

```c
#include <stdio.h>
int main() {
	int i;
	i = i + 2; // Semantic Error: 'i' is uninitialized when used on the right side
	printf("%d", i);
	return 0;
}
```