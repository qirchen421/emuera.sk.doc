---
hide:
  - toc
---

# HTML_PRINTC / HTML_PRINTLC

| Function Name                                                             | Arguments | Return Value |
| :------------------------------------------------------------------------ | :-------- | :----------- |
| ![](../assets/images/IconSK.webp)[`HTML_PRINTC`](./HTML_PRINTC.en.md) | `string`  | None         |
| ![](../assets/images/IconSK.webp)[`HTML_PRINTLC`](./HTML_PRINTC.en.md)| `string`  | None         |

!!! info "API"

    ``` { #language-erbapi }
    HTML_PRINTC htmlStyleString
    HTML_PRINTLC htmlStyleString
    ```

    Center-aligned and left-aligned variants of [`HTML_PRINT`](./HTML_PRINT.en.md). Renders using HTML tags but with different alignment positions.

    - **HTML_PRINTC**: Displays the HTML rendering result **center-aligned**.
    - **HTML_PRINTLC**: Displays the HTML rendering result **left-aligned**.

    Like `HTML_PRINT`, these are not affected by [`ALIGNMENT`](./ALIGNMENT.en.md), [`SETFONT`](./SETFONT.en.md), [`SETCOLOR`](./SETCOLOR.en.md), or [`FONTSTYLE`](./FONT_OPERATION.en.md) commands. Alignment is controlled by the command itself.

    See [`HTML_PRINT` Details](../Emuera/HTML_PRINT.en.md) for more information.

    !!! warning "Notes"
        - Command syntax only. Cannot be called as an expression function.
        - The argument is a string expression, same as `PRINTS`. Automatically adds a line break.

!!! hint "Hint"

    Command syntax only.

!!! example "Example"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        ; Center-aligned HTML rendering
        HTML_PRINTC "<b>Center-aligned text</b>"

        ; Left-aligned HTML rendering
        HTML_PRINTLC "<b>Left-aligned text</b>"

        ; Normal HTML_PRINT (follows ALIGNMENT setting)
        HTML_PRINT "<b>Default alignment</b>"
    ```

### See Also
- [HTML_PRINT](HTML_PRINT.en.md)
- [HTML_PRINT Details](../Emuera/HTML_PRINT.en.md)
