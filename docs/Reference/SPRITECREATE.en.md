---
hide:
  - toc
---

# SPRITECREATE

| Function name                                                      | Arguments                                   | Return |
| :--------------------------------------------------------------- | :------------------------------------------ | :----- |
| ![](../assets/images/IconEmuera.webp)[`SPRITECREATE`](./SPRITECREATE.md) | `string`, `int`                            | `int`  |
|                                                                    | `string`, `int`, `int`, `int`, `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
	int SPRITECREATE spriteName, gID
	int SPRITECREATE spriteName, gID, x, y, width, height
    ```
	Creates a sprite with the resource name specified by `spriteName`, using part or all of the `Graphics` specified by `gID`.  
	By specifying `x, y, width, height`, you can crop that portion of the `Graphics` as a sprite.  
	Returns non-zero on success.  
	Returns 0 if a sprite with the same resource name already exists or if creation fails.  
	Since sprites only remember the parent `Graphics`'s `gID` and crop position, changes to the parent `Graphics` will also change the sprite.  
	Also, if the parent `Graphics` is disposed, the sprite is also treated as disposed.  
	The created sprite can be handled almost like resources declared in the csv file in the `resources` folder.  
	For example, it can be used with the [`PRINT_IMG`](./PRINT_IMG.md) command or [`HTML_PRINT` img tags](../Emuera/HTML_PRINT.md#img).

!!! hint "Hint"

    Both command and expression function supported.

### Related Items
- [GCREATE](GCREATE.md)
