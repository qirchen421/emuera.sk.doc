---
hide:
  - toc
---

# GFILLRECTANGLE

| Function name                                                                      | Arguments                            | Return |
| :--------------------------------------------------------------------------- | :---------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GFILLRECTANGLE`](./GFILLRECTANGLE.md) | `int`, `int`, `int`, `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GFILLRECTANGLE gID, x, y, width, height
    ```
	Draws a rectangle at `x, y` with the specified `width` and `height` on the `Graphics` with the specified `gID`.  
	Returns non-zero on success.  
	The drawing color defaults to the Emuera config text color if not specified beforehand using the [`GSETBRUSH`](./GSETBRUSH.md) command.

!!! hint "Hint"

    Both command and expression function supported.

### Related Items
- [GSETBRUSH](GSETBRUSH.md)
