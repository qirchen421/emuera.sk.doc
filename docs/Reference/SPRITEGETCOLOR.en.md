---
hide:
  - toc
---

# SPRITEGETCOLOR

| Function name                                                          | Arguments               | Return |
| :------------------------------------------------------------------- | :--------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SPRITEGETCOLOR`](./SPRITEGETCOLOR.md) | `string`, `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int SPRITEGETCOLOR spriteName, x, y
    ```
	Gets the color at the specified position of the sprite with the resource name specified by `spriteName` as an integer value in `0xAARRGGBB` format.  
	Returns -1 if `spriteName` has not been created or has been disposed, or if `x, y` is outside the image bounds.  

	Note that this command returns -1 on failure, not 0.  
	This command returns 0 if you get the color of a position that is black and fully transparent.

!!! hint "Hint"

    Both command and expression function supported.
