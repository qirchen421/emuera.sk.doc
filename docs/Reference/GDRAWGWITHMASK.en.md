---
hide:
  - toc
---

# GDRAWGWITHMASK

| Function name                                                                      | Arguments                            | Return |
| :--------------------------------------------------------------------------- | :---------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`GDRAWGWITHMASK`](./GDRAWGWITHMASK.md) | `int`, `int`, `int`, `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	GDRAWGWITHMASK destID, srcID, maskID, destX, destY
    ```
	Draws the `Graphics` with `srcID` onto the `Graphics` with `destID`, applying the `Graphics` with `maskID` as a mask.  
	Specify the drawing position within `destID` with `destX, destY`.  
	Returns non-zero on success.  
	The conditions for success are that `srcID` and `maskID` must have exactly matching widths and heights, and the drawing area must not exceed the bounds of `destID`.  
	Applying a mask means applying the blue value of the mask image as opacity to the source image.  
	For example, if the mask is completely white (blue value is MAX everywhere), the source image is drawn as if there were no mask.  
	If the mask is completely black (blue value is 0 everywhere), the source image is treated as completely transparent and nothing happens.  
	Note that this command is processed by the CPU in a single thread, not by the GPU, so don't expect high speed.

!!! hint "Hint"

    Both command and expression function supported.
