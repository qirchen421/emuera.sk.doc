---
hide:
  - toc
---

# WHILE-WEND

| Function name                                                     | Arguments | Return |
| :--------------------------------------------------------------- | :--------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`WHILE`](./WHILE.md)       | `int` | none   |
| ![](../assets/images/IconEmuera.webp)[`WEND`](./WHILE.md)        | none  | none   |

!!! info "API"

    ```  { #language-erbapi }
	WHILE bool
	WEND
    ```
	A looping construct similar to [`REPEAT～REND`](./REPEAT.md) and [`FOR～NEXT`](./FOR.md).  
	The loop repeats while `bool` in `WHILE` is non-zero.  
	If given a condition that is always true, it becomes an infinite loop unless exited with [`BREAK`](./CONTINUE.md).  
	Excessive loop processing may cause Emuera to complain.  
	Note that if you enter `WHILE～WEND` directly via commands like [`GOTO`](./GOTO.md), it loops back to `WHILE` upon reaching `WEND` and evaluates the condition as normal.

!!! hint "Hint"

    Commands only.

### See Also
- [REPEAT-REND](REPEAT.md)
- [FOR-NEXT](FOR.md)
- [CONTINUE.BREAK](CONTINUE.md)
