---
hide:
  - toc
---

# FOR-NEXT

| Function name                                                  | Arguments                               | Return |
| :------------------------------------------------------------ | :-------------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`FOR`](./FOR.md)       | `integerVariable`, `int`, `int`(, `int`) | none   |
| ![](../assets/images/IconEmuera.webp)[`NEXT`](./FOR.md)      | none                                    | none   |

!!! info "API"

    ```  { #language-erbapi }
	FOR integerVariable, startNum, endNum(, value)
    ```
	`FOR～NEXT` is an enhanced version of [`REPEAT～REND`](./REPEAT.md).  
	The first argument specifies the variable used for counting (in `REPEAT`, it is always `COUNT:0`).  
	The second argument specifies the initial value assigned to the variable (in `REPEAT`, it is always `0`).  
	The third argument specifies the value at which the loop ends (the value settable in `REPEAT`).  
	The fourth argument specifies the value added to the variable each iteration (in `REPEAT`, it is always `1`).  

    ```  { #language-erbapi }
	FOR COUNT, 0, X  
		;～  
	NEXT  
	REPEAT X  
		;～  
	REND  
    ```

	These two behave almost identically.  
	Both are constructs that repeat X times, and support [`CONTINUE`](./CONTINUE.md) and [`BREAK`](./CONTINUE.md) within the loop.  
	Differences include being able to specify a counter variable, and being able to change the start value and step.  
	`FOR～NEXT` can also be nested.

    ```  { #language-erbapi }
	FOR Y, 0, 100  
		FOR X, 0, 100  
			～  
		NEXT  
	NEXT  
    ```

	The variable specified in the first argument `integerVariable` must be a numeric variable only. Character variables cannot be used.  
	The fourth argument `value` is optional. If omitted, it is `1`.  
	When `value` is positive, `value` is added to the `integerVariable` each iteration, and the loop ends when the variable becomes greater than or equal to the third argument `endNum`.  
	When `value` is negative, the loop ends when the `integerVariable` becomes less than or equal to `endNum`.  
	When `value` is 0, it becomes an infinite loop that repeats forever until a [`BREAK`](./CONTINUE.md) statement is executed.  
	All values are fixed at the start of the loop and are not affected by subsequent variable changes.  
	The following two produce the same result:

    ```  { #language-erbapi }
	;1  
	X = 10  
	FOR COUNT:X, 0, X, X/10  
		X = 10000  
	NEXT  
	;2  
	FOR COUNT:10, 0, 10, 10/10  
		X = 10000  
	NEXT  
    ```
	Note that if you enter `FOR～NEXT` directly via commands like [`GOTO`](./GOTO.md), it executes normally up to just before `NEXT`, similar to `REPEAT～REND`, then ignores `NEXT` and continues from the next line.

!!! hint "Hint"

    Commands only.

### See Also
- [REPEAT-REND](REPEAT.md)
- [WHILE-WEND](WHILE.md)
- [CONTINUE,BREAK](CONTINUE.md)
