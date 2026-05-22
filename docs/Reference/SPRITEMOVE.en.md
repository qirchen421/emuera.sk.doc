---
hide:
  - toc
---

# SPRITEMOVE

| Function name                                                        | Arguments               | Return |
| :------------------------------------------------------------------ | :--------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SPRITEMOVE`](./SPRITEMOVE.en.md) | `string`, `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int SPRITEMOVE spriteName, movex, movey
    ```
	Adds the specified values to the relative X and Y position of the sprite with the specified name.  
	That is, it is equivalent to:

		SPRITESETPOS spriteName, SPRITEPOSX(spriteName) + movex, SPRITEPOSY(spriteName) + movey

	Returns non-zero on success, or 0 if the specified sprite has not been created or has been disposed.

!!! hint "Hint"

    Both command and expression function supported.
