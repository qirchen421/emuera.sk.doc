---
hide:
  - toc
---

# TONEINPUT

| Function name                                                        | Arguments                                     | Return    |
| :------------------------------------------------------------------- | :-------------------------------------------- | :-------- |
| ![](../assets/images/IconEmuera.webp)[`TONEINPUT`](./TONEINPUT.en.md)   | `int`, `int`(, `int`, `string`, `int`)      | `int`     |
| ![](../assets/images/IconEmuera.webp)[`TONEINPUTS`](./TONEINPUT.en.md)  | `int`, `string`(, `int`, `string`, `int`)    | `string`  |

!!! info "API"

    ```  { #language-erbapi }
	TONEINPUT timeLimit, defaultValue(, displayTimeRemain, timeOverMessage, allowClick)
	TONEINPUTS timeLimit, defaultValue(, displayTimeRemain, timeOverMessage, allowClick)
    ```
    The arguments are the same as [`TINPUT` and `TINPUTS`](./TINPUT.en.md) respectively.  
    These are input acceptance commands that combine the properties of [`ONEINPUT`](./ONEINPUT.en.md) with TINPUT, and [`ONEINPUTS`](./ONEINPUT.en.md) with TINPUTS.  
    Note that when these commands are used, even if keyboard macros are configured in Emuera's CONFIG settings, they may not work properly - this is by design.  

    Also, in `TONEINPUTS`, macro expressions can be used as with [`INPUTS`](./INPUT.en.md).  
    To use '()' as a string, escape it using '.'

    In EM+EE, an optional fifth argument can be set.  
    When non-zero, mouse clicks are treated as Enter key presses (assigns an empty string to `RESULTS`. If a button is pressed, the button index is assigned to `RESULT:1`). Left click sets `RESULT:1` to 1, right click sets `RESULT:1` to 2. Also, if ++shift++, ++ctrl++, or ++alt++ is pressed at the same time, the key state is saved in `RESULT:2` (bits 16, 17, 18).  


!!! hint "Hint"

    Command only.

### See Also
- [TINPUT](TINPUT.en.md)
- [ONEINPUT](ONEINPUT.en.md)
