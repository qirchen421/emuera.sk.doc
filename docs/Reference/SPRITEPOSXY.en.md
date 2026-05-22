---
hide:
  - toc
---

# SPRITEPOSX, SPRITEPOSY

| Function name                                                           | Arguments | Return |
| :--------------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SPRITEPOSX`](./SPRITEPOSXY.en.md) | `string`  | `int`  |
| ![](../assets/images/IconEmuera.webp)[`SPRITEPOSY`](./SPRITEPOSXY.en.md) | `string`  | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int SPRITEPOSX spriteName
	int SPRITEPOSY spriteName
    ```
	Gets the relative X or Y position of the sprite with the specified name.  
	Returns 0 if the sprite has not been created or has been disposed.  
	To distinguish between position X/Y being 0 versus not created/disposed, call [`SPRITECREATED`](./SPRITECREATED.en.md) separately.

!!! hint "Hint"

    Both command and expression function supported.
