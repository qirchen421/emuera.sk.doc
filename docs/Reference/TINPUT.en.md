---
hide:
  - toc
---

# TINPUT(S)

| Function name                                                      | Arguments                               | Return    |
| :----------------------------------------------------------------- | :-------------------------------------- | :-------- |
| ![](../assets/images/IconEmuera.webp)[`TINPUT`](./TINPUT.md)      | `int`, `int`(, `int`, `string`, `int`) | `int`     |
| ![](../assets/images/IconEmuera.webp)[`TINPUTS`](./TINPUT.md)    | `int`, `int`(, `int`, `string`, `int`) | `string`  |

!!! info "API"

    ```  { #language-erbapi }
	TINPUT timeLimit, defaultValue(, displayTimeRemain, timeOverMessage, allowClick)
	TINPUTS timeLimit, defaultValue(, displayTimeRemain, timeOverMessage, allowClick)
    ```
    Input acceptance command with time limit. The first argument is the time limit in milliseconds, but setting a value finer than 100ms will not result in accurate operation.  
    The second argument is the default return value on timeout.  
    The third argument determines whether to display the remaining time: 0 means hide, any other value means display. Default is 1 (display).  
    The fourth argument is the string displayed on timeout. If it is an empty string, the timer display is cleared and processing moves to the next step.  
    Note that if the fourth argument is set, the third argument cannot be omitted.  

    Also, in `TINPUTS`, macro expressions can be used as with [`INPUTS`](./INPUT.md).  

    To use '()' as a string, escape it using '.'

    In EM+EE, an optional fifth argument can be set.  
    When non-zero, mouse clicks are treated as Enter key presses (assigns an empty string to `RESULTS`. If a button is pressed, the button index is assigned to `RESULT:1`). Left click sets `RESULT:1` to 1, right click sets `RESULT:1` to 2. Also, if ++shift++, ++ctrl++, or ++alt++ is pressed at the same time, the key state is saved in `RESULT:2` (bits 16, 17, 18).  


!!! hint "Hint"

    Command only.

### See Also
- [INPUT](INPUT.md)
- [TONEINPUT](TONEINPUT.md)
