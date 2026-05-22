---
hide:
  - toc
---

# MOUSEX, MOUSEY

| Function name                                                             | Arguments | Return |
| :----------------------------------------------------------------- | :--- | :----- |
| ![](../assets/images/IconEmuera.webp)[`MOUSEX`](./MOUSEXY.en.md)      | none | `int`  |
| ![](../assets/images/IconEmuera.webp)[`MOUSEY`](./MOUSEXY.en.md)      | none | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	MOUSEX
	MOUSEY
    ```
	Gets the current X or Y coordinate of the mouse cursor.  
	The coordinates are relative positions with the bottom-left of the client area as (0,0), with the positive x-axis to the right and the positive y-axis downward.  
	Note that MOUSEY returns a negative value when the cursor is inside the client area.  
	The size of the client area can be obtained using the [`CLIENTWIDTH`](./CLIENTFIELD.en.md) and [`CLIENTHEIGHT`](./CLIENTFIELD.en.md) functions.  
	(If you need Y coordinates relative to the top-left of the client area, you can get them with `MOUSEY()+CLIENTHEIGHT()`)  
	This function works even when Emuera's window is not active, and even when the mouse cursor is outside the window.

!!! hint "Hint"

    Both commands and expression functions are supported.

### See Also
- [AWAIT](AWAIT.en.md)
