---
hide:
  - toc
---

# SPRITECREATE

| Function name                                                      | Arguments                                                              | Return |
| :--------------------------------------------------------------- | :---------------------------------------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SPRITECREATE`](./SPRITECREATE.en.md) | `string`, `int`                                                   | `int`  |
|                                                                    | `string`, `int`, `int`, `int`, `int`, `int`                       | `int`  |
|                                                                    | `string`, `int`, `int`, `int`, `int`, `int`, `int`, `int`         | `int`  |
|                                                                    | `string`, `int`, `int`, `int`, `int`, `int`, `int`, `int`, `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    int SPRITECREATE spriteName, gID
    int SPRITECREATE spriteName, gID, x, y, width, height
    int SPRITECREATE spriteName, gID, x, y, width, height, posX, posY
    int SPRITECREATE spriteName, gID, x, y, width, height, posX, posY, destWidth, destHeight
    ```

    Creates a sprite with the resource name specified by `spriteName`, using part or all of the `Graphics` specified by `gID`.
    By specifying `x, y, width, height`, you can crop that portion of the `Graphics` as a sprite.
    Returns non-zero on success.
    Returns 0 if a sprite with the same resource name already exists or if creation fails.
    Since sprites only remember the parent `Graphics`'s `gID` and crop position, changes to the parent `Graphics` will also change the sprite.
    Also, if the parent `Graphics` is disposed, the sprite is also treated as disposed.
    The created sprite can be handled almost like resources declared in the csv file in the `resources` folder.
    For example, it can be used with the [`PRINT_IMG`](./PRINT_IMG.en.md) command or [`HTML_PRINT` img tags](../Emuera/HTML_PRINT.md#img).

    **Skia (SkiaSharp version) extended parameters** (from the 7th argument):

    - `posX`, `posY` (optional, default `0`): Sprite drawing offset. Specifies the relative position from the origin when the sprite is drawn.
    - `destWidth`, `destHeight` (optional, default same as source rectangle): Sprite destination drawing size. Specifying a different size from the source rectangle will scale the sprite. Negative values are treated as their absolute values.

!!! hint "Hint"

    Both command and expression function supported.

### Related Items
- [GCREATE](GCREATE.en.md)
