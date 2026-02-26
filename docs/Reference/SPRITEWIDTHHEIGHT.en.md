---
hide:
  - toc
---

# SPRITEWIDTH, SPRITEHEIGHT

| Function name                                                               | Arguments | Return |
| :---------------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SPRITEWIDTH`](./SPRITEWIDTHHEIGHT.md)  | `string`  | `int`  |
| ![](../assets/images/IconEmuera.webp)[`SPRITEHEIGHT`](./SPRITEWIDTHHEIGHT.md) | `string`  | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int SPRITEWIDTH spriteName
	int SPRITEHEIGHT spriteName
    ```
	Gets the width or height of the sprite with the specified name.  
	Returns 0 if the sprite has not been created or has been disposed.

!!! hint "Hint"

    Both command and expression function supported.
