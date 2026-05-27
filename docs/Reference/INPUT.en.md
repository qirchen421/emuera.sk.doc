---
hide:
  - toc
---

# INPUT(S)

| Function name                                                      | Arguments                  | Return    |
| :----------------------------------------------------------------- | :------------------------- | :-------- |
| ![](../assets/images/Iconeramaker.webp)[`INPUT`](./INPUT.en.md)      | (`int`, `int`, `int`)     | `void`    |
| ![](../assets/images/Iconeramaker.webp)[`INPUTS`](./INPUT.en.md)    | (`int`, `int`, `int`)     | `void`    |

!!! info "API"

    ```  { #language-erbapi }
	INPUT (defaultValue, canClick, allowSkip)
	INPUTS (defaultValue, canClick, allowSkip)
    ```
    Waits for input. `INPUT` assigns the entered number to `RESULT`, while `INPUTS` assigns the entered string to `RESULTS`.  
    If the first argument is set, it is used as the default value for the respective variables when nothing is entered.  

    As an additional feature in EE, middle click is accepted as normal left click. In case of middle click, `RESULT:1` is set to 3.  

    If the second argument is set, mouse clicks are treated as Enter key presses (assigns an empty string to `RESULTS`. If a button is pressed, the button index is assigned to `RESULT:1`). Left click sets `RESULT:1` to 1, right click sets `RESULT:1` to 2, and middle click sets `RESULT:1` to 3. Also, if ++shift++, ++ctrl++, or ++alt++ is pressed at the same time, the key state is saved in `RESULT:2` (bits 16, 17, 18).  

    If the third argument is set, input waiting is not performed during skip via right-click, etc.  
    However, the default value is still applied. When used together with "INPUT system accepts mouse clicks" above, the default values are assigned to `RESULT:1` and `RESULTS:1` respectively.  
    If not used together, the default values are assigned to `RESULT:0` and `RESULTS:0` as usual.  


!!! hint "Hint"

    Command only.

### See Also
- [TINPUTNF](TINPUTNF.en.md)
- [TINPUT](TINPUT.en.md)
- [INPUTMOUSEKEY](INPUTMOUSEKEY.en.md)
- [BINPUT](BINPUT.en.md)
- [INPUTANY](INPUTANY.en.md)
- [REUSELASTLINE](REUSELASTLINE.en.md)
