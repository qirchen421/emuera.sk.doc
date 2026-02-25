---
hide:
  - toc
---

# CBGSETG

| Function name                                                | Arguments              | Return |
| :---------------------------------------------------------- | :--------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`CBGSETG`](./CBGSETG.md) | `int`, `int`, `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int CBGSETG gID, x, y, zDepth
    ```
	Sets the `Graphics` specified by `gID` to be displayed in the client area.  
	When `x` and `y` are both 0, the image is displayed with the bottom-left of the client area aligned to the bottom-left of the image.  
	`x` is positive to the right, `y` is positive downward, and `zDepth` is positive toward the back of the screen.  
	Specify a non-zero value for `zDepth`. Normal text drawing corresponds to `zDepth==0`; if `zDepth` is negative, it will be drawn in front of the text.

!!! hint "Hint"

    Both command and expression function supported.

### Related Items
- [CBGSETSPRITE](CBGSETSPRITE.md)
- [CBGCLEAR](CBGCLEAR.md)
