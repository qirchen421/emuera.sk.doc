---
hide:
  - toc
---

# EXISTSIMAGELAYER

| Function Name                                                                    | Arguments | Return Value |
| :------------------------------------------------------------------------------- | :-------- | :----------- |
| ![](../assets/images/IconSK.webp)[`EXISTSIMAGELAYER`](./EXISTSIMAGELAYER.en.md) | `int`     | `int`        |

!!! info "API"

    ``` { #language-erbapi }
    int EXISTSIMAGELAYER(depth)
    ```

    Checks whether a [`SETIMAGELAYER`](./SETIMAGELAYER.en.md) layer at the specified `depth` exists.

    **Parameters**:

    | Parameter | Type | Description |
    | :--- | :--- | :--- |
    | `depth` | int | Layer depth value |

    **Return Value**: Returns 1 if the layer exists, 0 if it does not.

!!! hint "Hint"

    Supports both command and expression function syntax.

!!! example "Example"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        SETIMAGELAYER "pet_1", 1

        IF EXISTSIMAGELAYER(1)
            PRINTL Layer at depth=1 exists
        ELSE
            PRINTL Layer at depth=1 does not exist
        ENDIF

        ; Used as an expression
        #DIM L_COUNT
        FOR L_COUNT, 1, 5
            PRINTVL EXISTSIMAGELAYER(L_COUNT)
        NEXT
    ```
    ``` title="Result"
    Layer at depth=1 exists
    1
    0
    0
    0
    ```

### See Also
- [SETIMAGELAYER](SETIMAGELAYER.en.md)
- [CLEARIMAGELAYER](CLEARIMAGELAYER.en.md)
