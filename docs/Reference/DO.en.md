---
hide:
  - toc
---

# DO-LOOP

| Function name                                                 | Arguments | Return |
| :------------------------------------------------------------ | :--------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`DO`](./DO.en.md)          | none  | none   |
| ![](../assets/images/IconEmuera.webp)[`LOOP`](./DO.en.md)        | `int` | none   |

!!! info "API"

    ```  { #language-erbapi }
	DO
	LOOP bool
    ```
	A looping construct similar to [`REPEAT～REND`](./REPEAT.en.md) and [`FOR～NEXT`](./FOR.en.md).  
	Like C's `do～while` or VB's `do～loop while`, it repeats execution while `bool` in `LOOP` is non-zero.  
	Unlike [`WHILE～WEND`](./WHILE.en.md), it always executes at least once.  
	Note that when [`CONTINUE`](./CONTINUE.en.md) is executed inside `DO～LOOP`, it exits `LOOP` if the condition is not satisfied. Note that `CONTINUE` does not necessarily return to the `DO` statement.  
	Also, if you enter `DO～LOOP` directly via commands like [`GOTO`](./GOTO.en.md), it evaluates the condition when reaching `LOOP` as normal, and loops back to `DO` if `bool` is non-zero.

!!! hint "Hint"

    Commands only.
