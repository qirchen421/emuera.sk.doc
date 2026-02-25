---
hide:
  - toc
---

# REDRAW, CURRENTREDRAW

| Function name                                                          | Arguments | Return |
| :-------------------------------------------------------------------- | :--- | :----- |
| ![](../assets/images/IconEmuera.webp)[`REDRAW`](./REDRAW.md)         | `int`| none   |
| ![](../assets/images/IconEmuera.webp)[`CURRENTREDRAW`](./REDRAW.md) | none | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	REDRAW int
	int CURRENTREDRAW
    ```
	Drawing control command.  
	Specifying `0` for the argument causes drawing to occur only when user input is required.  
	Specifying `1` for the argument causes normal drawing at the timing specified by [config `frames per second`](../Emuera/config.md#_16).  
	Adding `2` to the argument (such as `REDRAW 2` or `REDRAW 3`) has the above effects plus forces drawing immediately when the `REDRAW` command is executed.  
	The current `REDRAW` state (`0` or `1`) can be obtained with `CURRENTREDRAW`.


!!! hint "Hint"

    `CURRENTREDRAW` is supported as an expression function.
