---
hide:
  - toc
---

# SETIMAGELAYER

| Function Name                                                              | Arguments                                                                                      | Return Value |
| :------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------- | :----------- |
| ![](../assets/images/IconSK.webp)[`SETIMAGELAYER`](./SETIMAGELAYER.en.md) | `str`, `int`, `int`, `int`, `int`, `int`, `int`, `var`, `int`                                   | None         |

!!! info "API"

    ``` { #language-erbapi }
    SETIMAGELAYER spriteName, depth(, x, y, width, height, opacity, colorMatrix, followScroll)
    ```

    Renders the specified Sprite on an independent layer. Unlike [`CBGSETSPRITE`](./CBGSETSPRITE.en.md), SETIMAGELAYER layers are decoupled from text lines and support viewport clipping and scroll following.

    **Parameters** (`spriteName` and `depth` are required, all others are optional):

    | Parameter | Type | Default | Description |
    | :--- | :--- | :------ | :--- |
    | `spriteName` | str | — | Sprite name (required) |
    | `depth` | int | — | Layer depth (required). Positive values are behind text, negative values are in front |
    | `x` | int | `0` | Draw X coordinate |
    | `y` | int | `0` | Draw Y coordinate |
    | `width` | int | `0` | Destination width. 0 uses the Sprite's original width |
    | `height` | int | `0` | Destination height. 0 uses the Sprite's original height |
    | `opacity` | int | `255` | Opacity (0～255). 255 is fully opaque |
    | `colorMatrix` | var | `null` | Reference to a 5×5 color matrix array (e.g., `CM_GRAY:0:0`) |
    | `followScroll` | int | `0` | Scroll following. 0=fixed position, 1=scrolls with text |

    !!! warning "Notes"
        - Command syntax only. Cannot be called as an expression function.
        - `depth` is used for layer sorting and unique identification. Layers with the same `depth` will be overwritten.
        - Use [`EXISTSIMAGELAYER(depth)`](./EXISTSIMAGELAYER.en.md) to check if a layer at the specified depth exists.
        - Use [`CLEARIMAGELAYER depth`](./CLEARIMAGELAYER.en.md) to clear a specific layer, or [`CLEARIMAGELAYER_ALL`](./CLEARIMAGELAYER.en.md) to clear all layers.
        - Not supported in WINAPI mode.

!!! hint "Hint"

    Command syntax only.

!!! example "Example"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        ; Basic rendering: display Sprite at depth=1
        SETIMAGELAYER "pet_1", 1

        ; Specify position and depth
        SETIMAGELAYER "pet_2", 2, 100, 50

        ; Scaling + opacity
        SETIMAGELAYER "pet_3", 3, 200, 100, 150, 150, 200

        ; Color matrix + scroll following
        #DIM CM_GRAY, 5, 5
        CM_GRAY:0:0 =  77, 150,  29,   0,   0
        CM_GRAY:1:0 =  77, 150,  29,   0,   0
        CM_GRAY:2:0 =  77, 150,  29,   0,   0
        CM_GRAY:3:0 =   0,   0,   0, 256,   0
        CM_GRAY:4:0 =   0,   0,   0,   0, 256
        SETIMAGELAYER "pet_4", 4, 300, 50, 150, 150, 255, CM_GRAY:0:0, 1

        ; Check if layer exists
        IF EXISTSIMAGELAYER(1)
            PRINTL Layer at depth=1 exists
        ENDIF

        ; Clear specific layer
        CLEARIMAGELAYER 1

        ; Clear all layers
        CLEARIMAGELAYER_ALL
    ```
    ``` title="Result"
    Layer at depth=1 exists
    ```

### See Also
- [CLEARIMAGELAYER](CLEARIMAGELAYER.en.md)
- [EXISTSIMAGELAYER](EXISTSIMAGELAYER.en.md)
- [CBGSETSPRITE](CBGSETSPRITE.en.md)
