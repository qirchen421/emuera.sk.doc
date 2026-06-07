---
hide:
  - toc
---

# GETLINEY

| Function Name                                                                    | Arguments | Return Value |
| :------------------------------------------------------------------------------- | :-------- | :----------- |
| ![](../assets/images/IconSK.webp)[`GETLINEY`](./GETLINEY.en.md) | `int`     | `int`        |

!!! info "API"

    ``` { #language-erbapi }
    int GETLINEY(lineNo)
    ```

    Returns the physical Y coordinate (bottom-left origin) of the specified line number. Uses the same coordinate system as [`SETIMAGELAYER`](./SETIMAGELAYER.en.md).

    **Parameters**:

    | Parameter | Type | Description |
    | :--- | :--- | :--- |
    | `lineNo` | int | Line number (≥0) |

    **Return Value**: Physical Y coordinate (pixels) of the specified line. Bottom-left origin coordinate system, same as the `y` argument of `SETIMAGELAYER`.

!!! warning "Note"

    Skia-exclusive expression function. Passing a negative argument throws a `CodeEE`.

!!! hint "Hint"

    Used to align [`SETIMAGELAYER`](./SETIMAGELAYER.en.md) images with the HTML text flow. Use `GETLINEY(LINECOUNT)` to get the Y coordinate of the current line, then pass it to the `y` argument of `SETIMAGELAYER` to precisely position the image layer at the text line.

!!! example "Example"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        ; Get current line number
        #DIM L_LINE
        L_LINE = LINECOUNT

        ; Output text
        PRINTL Hello

        ; Place image layer at the same line
        #DIM L_Y
        L_Y = GETLINEY(L_LINE)
        SETIMAGELAYER "icon", 1, 100, L_Y, 50, 50
    ```

### See Also
- [SETIMAGELAYER](SETIMAGELAYER.en.md)
- [EXISTSIMAGELAYER](EXISTSIMAGELAYER.en.md)
- [CLEARIMAGELAYER](CLEARIMAGELAYER.en.md)
