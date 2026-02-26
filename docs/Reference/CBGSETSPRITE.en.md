---
hide:
  - toc
---

# CBGSETSPRITE

| Function name                                                      | Arguments                 | Return |
| :--------------------------------------------------------------- | :------------------------ | :----- |
| ![](../assets/images/IconEmuera.webp)[`CBGSETSPRITE`](./CBGSETSPRITE.md) | `string`, `int`, `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int CBGSETSPRITE, spriteName, x, y, zDepth
    ```
	Sets the sprite with the resource name specified by `spriteName` to be displayed in the client area.  
	When `x` and `y` are both 0, the image is displayed with the bottom-left of the client area aligned to the bottom-left of the image.  
	`x` is positive to the right, `y` is positive downward, and `zDepth` is positive toward the back of the screen.  
	Specify a non-zero value for `zDepth`. Normal text drawing corresponds to `zDepth==0`; if `zDepth` is negative, it will be drawn in front of the text.

!!! hint "Hint"

    Both command and expression function supported.

### Related Items
- [CBGSETG](CBGSETG.md)
- [CBGCLEAR](CBGCLEAR.md)
