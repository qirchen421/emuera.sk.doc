---
hide:
  - toc
---

# SPRITECREATEFROMFILE

| Function Name                                                                      | Arguments                                          | Return Value |
| :--------------------------------------------------------------------------------- | :------------------------------------------------- | :----------- |
| ![](../assets/images/IconSK.webp)[`SPRITECREATEFROMFILE`](./SPRITECREATEFROMFILE.en.md) | `string`, `string`(, `int`, `int`, `int`, `int`) | `int`        |

!!! info "API"

    ``` { #language-erbapi }
    int SPRITECREATEFROMFILE spriteName, filePath(, x, y, width, height)
    ```

    Creates a Sprite directly from an image file. Combines the two-step process of creating a Graphics with [`GCREATEFROMFILE`](./GCREATEFROMFILE.en.md) and then creating a Sprite with [`SPRITECREATE`](./SPRITECREATE.en.md) into a single call.

    **Parameters**:

    | Parameter | Type | Description |
    | :--- | :--- | :--- |
    | `spriteName` | string | Resource name for the Sprite to create |
    | `filePath` | string | Path to the image file |
    | `x` | int | Crop start X coordinate (default 0) |
    | `y` | int | Crop start Y coordinate (default 0) |
    | `width` | int | Crop width (default 0 = full image width) |
    | `height` | int | Crop height (default 0 = full image height) |

    **Return Value**: Returns 1 on success, 0 on failure.

    !!! warning "Notes"
        - Supports both command and expression function syntax.
        - If a Sprite with the same resource name already exists, creation fails and returns 0.
        - `filePath` can be a relative path from the `resources` folder or an absolute path.
        - Created Sprites can be used with [`PRINT_IMG`](./PRINT_IMG.en.md) or [`HTML_PRINT img tag`](../Emuera/HTML_PRINT.en.md#img), etc.
        - Unlike [`SPRITECREATE`](./SPRITECREATE.en.md), this function creates a Sprite without a parent Graphics, so the Sprite holds independent image data.

!!! hint "Hint"

    Supports both command and expression function syntax.

!!! example "Example"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        ; Create Sprite from entire file
        IF SPRITECREATEFROMFILE("my_img", "image/character.png")
            PRINTL Sprite created successfully
            PRINT_IMG my_img
        ELSE
            PRINTL Sprite creation failed
        ENDIF

        ; Create Sprite from a cropped portion of the file
        SPRITECREATEFROMFILE "my_icon", "image/icons.png", 0, 0, 32, 32
    ```

### See Also
- [SPRITECREATE](SPRITECREATE.en.md)
- [GCREATEFROMFILE](GCREATEFROMFILE.en.md)
- [PRINT_IMG](PRINT_IMG.en.md)
