---
hide:
  - toc
---

# WHILE-WEND

| Function name                                                     | Arguments | Return |
| :--------------------------------------------------------------- | :--------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`WHILE`](./WHILE.en.md)       | `int` | none   |
| ![](../assets/images/IconEmuera.webp)[`WEND`](./WHILE.en.md)        | none  | none   |

!!! info "API"

    ```  { #language-erbapi }
	WHILE bool
	WEND
    ```
	A looping construct similar to [`REPEAT～REND`](./REPEAT.en.md) and [`FOR～NEXT`](./FOR.en.md).  
	The loop repeats while `bool` in `WHILE` is non-zero.  
	If given a condition that is always true, it becomes an infinite loop unless exited with [`BREAK`](./CONTINUE.en.md).  
	Excessive loop processing may cause Emuera to complain.  
	Note that if you enter `WHILE～WEND` directly via commands like [`GOTO`](./GOTO.en.md), it loops back to `WHILE` upon reaching `WEND` and evaluates the condition as normal.

!!! hint "Hint"

    Commands only.

### See Also
- [REPEAT-REND](REPEAT.en.md)
- [FOR-NEXT](FOR.en.md)
- [CONTINUE.BREAK](CONTINUE.en.md)
