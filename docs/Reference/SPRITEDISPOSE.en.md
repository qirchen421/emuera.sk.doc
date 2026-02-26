---
hide:
  - toc
---

# SPRITEDISPOSE

| Function name                                                        | Arguments | Return |
| :------------------------------------------------------------------ | :-------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SPRITEDISPOSE`](./SPRITEDISPOSE.md) | `string`  | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int SPRITDISPOSE spriteName
    ```
	Disposes the sprite with the resource name specified by `spriteName`.  
	Returns non-zero on success.  
	This command does not affect the original `Graphics` or other resources.  
	To release memory allocated to `Graphics`, use the [`GDISPOSE`](./GDISPOSE.md) command.

!!! hint "Hint"

    Both command and expression function supported.

### Related Items
- [SPRITECREATE](SPRITECREATE.md)
- [SPRITEDISPOSEALL](SPRITEDISPOSEALL.md)
