---
hide:
  - toc
---

# GGETCOLOR

| Function name                                                          | Arguments            | Return |
| :----------------------------------------------------------------- | :------------------ | :----- |
| ![](../assets/images/IconEmuera.webp)[`GGETCOLOR`](./GGETCOLOR.md) | `int`, `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GGETCOLOR gID, x, y
    ```
	Gets the color at the specified position in the `Graphics` with the specified `gID` as an integer value in `0xAARRGGBB` format.  
	Returns -1 if the `Graphics` has not been created or disposed, or if `x, y` is outside the image bounds.  

	Note that this command returns -1 on failure, not 0.  
	This command returns 0 when getting the color of a position that is black and completely transparent.

!!! hint "Hint"

    Both command and expression function supported.

### Related Items
- [GSETCOLOR](GSETCOLOR.md)
