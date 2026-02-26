---
hide:
  - toc
---

# SPRITESETPOS

| Function name                                                          | Arguments               | Return |
| :------------------------------------------------------------------- | :--------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SPRITESETPOS`](./SPRITESETPOS.md) | `string`, `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int SPRITESETPOS spriteName, posX, posY
    ```
	Sets the relative X and Y position of the sprite with the specified name.  
	Returns non-zero on success, or 0 if the specified sprite has not been created or has been disposed.

!!! hint "Hint"

    Both command and expression function supported.
