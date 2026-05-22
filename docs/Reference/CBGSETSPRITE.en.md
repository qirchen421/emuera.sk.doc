---
hide:
  - toc
---

# CBGSETSPRITE

| Function name                                                      | Arguments                                                     | Return |
| :--------------------------------------------------------------- | :------------------------------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`CBGSETSPRITE`](./CBGSETSPRITE.en.md) | `string`, `int`, `int`, `int`(, `int`, `int`, `int`, `var`) | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    int CBGSETSPRITE, spriteName, x, y, zDepth{, width, height, opacity, colorMatrix}
    ```

    Sets the sprite with the resource name specified by `spriteName` to be displayed in the client area.
    When `x` and `y` are both 0, the image is displayed with the bottom-left of the client area aligned to the bottom-left of the image.
    `x` is positive to the right, `y` is positive downward, and `zDepth` is positive toward the back of the screen.
    Specify a non-zero value for `zDepth`. Normal text drawing corresponds to `zDepth==0`; if `zDepth` is negative, it will be drawn in front of the text.

    **Skia (SkiaSharp version) extended parameters** (from the 5th argument, all optional):

    | Parameter | Type | Default | Description |
    | :-------- | :--- | :------ | :---------- |
    | `width` | `int` | `0` | Destination width. 0 uses the sprite's original width |
    | `height` | `int` | `0` | Destination height. 0 uses the sprite's original height |
    | `opacity` | `int` | `255` | Opacity (0–255). 255 is fully opaque |
    | `colorMatrix` | `var` | `null` | 5×5 color matrix array reference (e.g., `CM_GRAY:0:0`). No color transform when omitted |

    - `opacity` is specified as an integer 0–255; the engine divides by 255 internally to convert to floating-point.
    - `colorMatrix` passes the starting address of a 2D/3D integer array (e.g., `CM:0:0` or `CM_PRESET:0:0:0`). The engine reads a 5×5 sub-matrix and divides by 256 to convert to floating-point.

    !!! warning "Note"
        - `zDepth` cannot be 0.
        - The `colorMatrix` parameter is not supported in WINAPI mode.

!!! hint "Hint"

    Both command and expression function supported.

!!! example "Example"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        ; Basic rendering: display sprite at (0,0) with depth=1
        CBGSETSPRITE "pet_1", 0, 0, 1

        ; Scale + opacity: scale to 200x200, ~78% opaque
        CBGSETSPRITE "pet_2", 100, 50, 2, 200, 200, 200

        ; Color matrix: grayscale effect
        #DIM CM_GRAY, 5, 5
        CM_GRAY:0:0 =  77, 150,  29,   0,   0
        CM_GRAY:1:0 =  77, 150,  29,   0,   0
        CM_GRAY:2:0 =  77, 150,  29,   0,   0
        CM_GRAY:3:0 =   0,   0,   0, 256,   0
        CM_GRAY:4:0 =   0,   0,   0,   0, 256
        CBGSETSPRITE "pet_3", 300, 50, 3, 150, 150, 255, CM_GRAY:0:0

        ; Called as expression
        RESULT = CBGSETSPRITE("pet_1", 0, 0, 1)
        PRINTVL RESULT
    ```

### Related
- [CBGSETG](CBGSETG.en.md)
- [CBGCLEAR](CBGCLEAR.en.md)
