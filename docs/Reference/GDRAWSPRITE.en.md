---
hide:
  - toc
---

# GDRAWSPRITE

| Function name                                                                  | Arguments                                                         | Return |
| :--------------------------------------------------------------------- | :--------------------------------------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GDRAWSPRITE`](./GDRAWSPRITE.md) | `int`, `string`                                                | `int`  |
|                                                                        | `int`, `string`, `int`, `int`                                  | `int`  |
|                                                                        | `int`, `string`, `int`, `int`, `int`, `int`                    | `int`  |
|                                                                        | `int`, `string`, `int`, `int`, `int`, `int`, `integerVariable` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GDRAWSPRITE gID, spriteName
	int GDRAWSPRITE gID, spriteName, destX, destY
	int GDRAWSPRITE gID, spriteName, destX, destY, destWidth, destHeight
	int GDRAWSPRITE gID, spriteName, destX, destY, destWidth, destHeight, colorMatrix
    ```
	Draws the `Sprite` with the specified `spriteName` onto the `Graphics` with the specified `gID`.  
	Optionally, you can specify the position within the `Graphics` with `destX, destY` to draw the `Sprite` at that position.  
	You can also specify the drawing width and height with `destWidth, destHeight` to scale and draw the `Sprite` to that size.  
	Furthermore, you can specify a 5x5 matrix as `colorMatrix` to apply a color matrix during drawing.  
	Note that the `Sprite` size can be obtained using the `SPRITEWIDTH(str imgName), SPRITEHEIGHT(str imgName)` functions.  
	Returns non-zero on success.  

	If an animated sprite is specified, one frame of the animation is drawn.

!!! hint "Hint"

    Both command and expression function supported.

### Related Items
- [GDRAWG](GDRAWG.md)
