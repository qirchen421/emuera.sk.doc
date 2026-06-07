---
hide:
  - toc
---

# SETIMAGELAYERL

| Function Name                                                                  | Arguments                                                                 | Return Value |
| :----------------------------------------------------------------------------- | :------------------------------------------------------------------------ | :----------- |
| ![](../assets/images/IconSK.webp)[`SETIMAGELAYERL`](./SETIMAGELAYERL.en.md) | `str`, `int`, `int`, `int`, `int`, `int`, `int`, `var`                     | None         |

!!! info "API"

    ``` { #language-erbapi }
    SETIMAGELAYERL spriteName, depth(, xpos, ypos, width, height, opacity, colorMatrix)
    ```

    A line-relative positioning variant of [`SETIMAGELAYER`](./SETIMAGELAYER.en.md) that automatically sets `followScroll=1` and always anchors to the current display line. The positioning parameters `xpos`/`ypos` are offsets relative to the line position, matching the semantics of [`HTML_PRINT`](./HTML_PRINT.en.md)'s `<img>` tag's `xpos`/`ypos` attributes. When `xpos=0, ypos=0`, the rendering position matches an `<img>` on the same line exactly (including the `ShapePositionShift` offset).

    **Parameters** (`spriteName` and `depth` are required, all others are optional):

    | Parameter | Type | Default | Description |
    | :--- | :--- | :------ | :--- |
    | `spriteName` | str | — | Sprite name (required) |
    | `depth` | int | — | Layer depth (required). Positive values are behind text, negative values are in front |
    | `xpos` | int | `0` | X offset relative to line position (matches HTML `<img>` `xpos` attribute, includes `ShapePositionShift`) |
    | `ypos` | int | `0` | Y offset relative to line top-edge (matches HTML `<img>` `ypos` attribute) |
    | `width` | int | `0` | Destination width. 0 uses the Sprite's original width |
    | `height` | int | `0` | Destination height. 0 uses the Sprite's original height |
    | `opacity` | int | `255` | Opacity (0～255). 255 is fully opaque |
    | `colorMatrix` | var | `null` | Reference to a 5×5 color matrix array (e.g., `CM_GRAY:0:0`) |

    !!! warning "Notes"
        - Command syntax only. Cannot be called as an expression function.
        - `followScroll` is always `1` (scroll following). Use [`SETIMAGELAYER`](./SETIMAGELAYER.en.md) for fixed-position layers.
        - Always anchors to the current display line. Specifying other line numbers is not supported.
        - `xpos` and `ypos` are offsets relative to the line position, which differs from [`SETIMAGELAYER`](./SETIMAGELAYER.en.md)'s absolute coordinate `x`/`y` semantics.
        - Parameters 3–8 support empty parameters (`,,`). Empty values use their defaults.
        - Not supported in WINAPI mode.

!!! hint "Hint"

    When you need to place a layer at the same position as an HTML img, use `SETIMAGELAYERL` with `xpos=0, ypos=0`. No manual `GETLINEY` calculation or `ShapePositionShift` compensation is needed.

!!! example "Example"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        ; Basic rendering: display Sprite at the current line (xpos=0, ypos=0, same as HTML img)
        SETIMAGELAYERL "pet_1", 1

        ; Specify X offset
        SETIMAGELAYERL "pet_2", 2, 100

        ; Specify X/Y offsets and size
        SETIMAGELAYERL "pet_3", 3, 0, 0, 150, 150, 200

        ; With color matrix
        #DIM CM_GRAY, 5, 5
        CM_GRAY:0:0 =  77, 150,  29,   0,   0
        CM_GRAY:1:0 =  77, 150,  29,   0,   0
        CM_GRAY:2:0 =  77, 150,  29,   0,   0
        CM_GRAY:3:0 =   0,   0,   0, 256,   0
        CM_GRAY:4:0 =   0,   0,   0,   0, 256
        SETIMAGELAYERL "pet_4", 4, , , 150, 150, 255, CM_GRAY:0:0
    ```

### See Also
- [SETIMAGELAYER](SETIMAGELAYER.en.md)
- [CLEARIMAGELAYER](CLEARIMAGELAYER.en.md)
- [EXISTSIMAGELAYER](EXISTSIMAGELAYER.en.md)
- [GETLINEY](GETLINEY.en.md)
