---
hide:
  - toc
---

# GDRAWG

| Function name                                                      | Arguments                                                                                      | Return |
| :----------------------------------------------------------- | :-------------------------------------------------------------------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GDRAWG`](./GDRAWG.md) | `int`, `int`, `int`, `int`, `int`, `int`, `int`, `int`, `int`, `int`                        | `int`  |
|                                                              | `int`, `int`, `int`, `int`, `int`, `int`, `int`, `int`, `int`, `int`, `integerVariable` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int GDRAWG destID, srcID, destX, destY, destWidth, destHeight, srcX, srcY, srcWidth, srcHeight
	int GDRAWG destID, srcID, destX, destY, destWidth, destHeight, srcX, srcY, srcWidth, srcHeight, colorMatrix
    ```
	Draws the `Graphics` with the specified `srcID` onto the `Graphics` with the specified `destID`.  
	Specify the destination position and size with 4 integers for `dest`, and the source position and size with 4 integers for `src`.  
	Optionally, you can specify a 5x5 or larger 2D numeric array as `colorMatrix` to apply a color matrix during drawing.  
	All elements of `colorMatrix` are divided by 256 before being passed to the .Net Framework `ColorMatrix` class. That is, a 5x5 matrix with all diagonals at 256 becomes the identity matrix.  
	Returns non-zero on success.  
	Returns 0 if either the destination or source `Graphics` does not exist.  
	The source and destination `Graphics` can be the same.

!!! hint "Hint"

    Both command and expression function supported.

### Related Items
- [GDRAWSPRITE](GDRAWSPRITE.md)
