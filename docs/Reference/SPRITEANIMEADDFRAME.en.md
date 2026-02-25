---
hide:
  - toc
---

# SPRITEANIMEADDFRAME

| Function name                                                                      | Arguments                                                             | Return |
| :------------------------------------------------------------------------------- | :------------------------------------------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SPRITEANIMEADDFRAME`](./SPRITEANIMEADDFRAME.md) | `string`, `int`, `int`, `int`, `int`, `int`, `int`, `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int SPRITEANIMEADDFRAME spriteName, gID, x, y, width, height, offsetx, offsety, delay
    ```
	Adds a frame to the animated sprite with the resource name specified by `spriteName`.  
	The rectangular area specified by `x, y, width, height` in the `Graphics` specified by `gID` becomes the frame, positioned at `offsetx, offsety` from the top-left of the sprite.  
	Parts outside the size set when creating the animated sprite will not be drawn.  
	`delay` specifies the display time for this frame in milliseconds.  
	This command fails and does nothing if the resource name `spriteName` does not exist or is not an animated sprite.  
	Returns 1 on success, 0 on failure.

!!! hint "Hint"

    Both command and expression function supported.

### Related Items
- [SPRITEANIMECREATE](SPRITEANIMECREATE.md)
