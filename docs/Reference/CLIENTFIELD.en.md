---
hide:
  - toc
---

# CLIENTWIDTH, CLIENTHEIGHT

| Function name                                                              | Arguments | Return |
| :-------------------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`CLIENTWIDTH`](./CLIENTFIELD.en.md)  | none      | `int`  |
| ![](../assets/images/IconEmuera.webp)[`CLIENTHEIGHT`](./CLIENTFIELD.en.md) | none      | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int CLIENTWIDTH
	int CLIENTHEIGHT
    ```
	Gets the current width or height of the client area (the drawing area of the window).  
	This value does not include the width or height of window borders, menu bars, scroll bars, or text input areas.  
	Note that `CLIENTHEIGHT` may be changed by the user during gameplay.

!!! hint "Hint"

    Available as both command and function in expressions
