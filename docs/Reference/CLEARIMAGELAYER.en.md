---
hide:
  - toc
---

# CLEARIMAGELAYER / CLEARIMAGELAYER_ALL

| Function Name                                                                        | Arguments | Return Value |
| :----------------------------------------------------------------------------------- | :-------- | :----------- |
| ![](../assets/images/IconSK.webp)[`CLEARIMAGELAYER`](./CLEARIMAGELAYER.en.md)       | `int`     | None         |
| ![](../assets/images/IconSK.webp)[`CLEARIMAGELAYER_ALL`](./CLEARIMAGELAYER.en.md)   | None      | None         |

!!! info "API"

    ``` { #language-erbapi }
    CLEARIMAGELAYER depth
    CLEARIMAGELAYER_ALL
    ```

    - **CLEARIMAGELAYER**: Clears the [`SETIMAGELAYER`](./SETIMAGELAYER.en.md) layer at the specified `depth`.
    - **CLEARIMAGELAYER_ALL**: Clears all `SETIMAGELAYER` layers.

    | Parameter | Type | Description |
    | :--- | :--- | :--- |
    | `depth` | int | The depth value of the layer to clear |

    !!! warning "Notes"
        - Command syntax only. Cannot be called as an expression function.
        - Layers cleared by `CLEARIMAGELAYER` can be recreated by calling [`SETIMAGELAYER`](./SETIMAGELAYER.en.md) again.
        - These commands only affect layers created by `SETIMAGELAYER`, not backgrounds set by [`CBGSETSPRITE`](./CBGSETSPRITE.en.md) or [`SETBGIMAGE`](./BACKGROUND.en.md).

!!! hint "Hint"

    Command syntax only.

!!! example "Example"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        SETIMAGELAYER "pet_1", 1
        SETIMAGELAYER "pet_2", 2

        ; Clear specific layer
        CLEARIMAGELAYER 1

        ; Check if cleared
        PRINTVL EXISTSIMAGELAYER(1)
        PRINTVL EXISTSIMAGELAYER(2)

        ; Clear all layers
        CLEARIMAGELAYER_ALL
    ```
    ``` title="Result"
    0
    1
    ```

### See Also
- [SETIMAGELAYER](SETIMAGELAYER.en.md)
- [EXISTSIMAGELAYER](EXISTSIMAGELAYER.en.md)
