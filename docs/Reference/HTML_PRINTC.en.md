---
hide:
  - toc
---

# HTML_PRINTC / HTML_PRINTLC

| Function Name                                                             | Arguments         | Return Value |
| :------------------------------------------------------------------------ | :---------------- | :----------- |
| ![](../assets/images/IconSK.webp)[`HTML_PRINTC`](./HTML_PRINTC.en.md) | `string {, int}` | None         |
| ![](../assets/images/IconSK.webp)[`HTML_PRINTLC`](./HTML_PRINTC.en.md)| `string {, int}` | None         |

!!! info "API"

    ``` { #language-erbapi }
    HTML_PRINTC htmlString {, cellWidth}
    HTML_PRINTLC htmlString {, cellWidth}
    ```

    Right-aligned and left-aligned variants of [`HTML_PRINT`](./HTML_PRINT.en.md). Renders using HTML tags but with different alignment positions.

    - **HTML_PRINTC**: Displays the HTML rendering result **right-aligned**.
    - **HTML_PRINTLC**: Displays the HTML rendering result **left-aligned**.

    The second argument `cellWidth` is an optional integer expression specifying the cell width in pixels. When omitted, the default value `PrintCLength * FontSize / 2` is used.

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
        ; Right-aligned HTML rendering
        HTML_PRINTC "<b>Right-aligned text</b>"

        ; Left-aligned HTML rendering
        HTML_PRINTLC "<b>Left-aligned text</b>"

        ; Specify cell width (200 pixels)
        HTML_PRINTC "<b>Right-aligned text</b>", 200

        ; Normal HTML_PRINT (follows ALIGNMENT setting)
        HTML_PRINT "<b>Default alignment</b>"
    ```

### See Also
- [HTML_PRINT](HTML_PRINT.en.md)
- [HTML_PRINT Details](../Emuera/HTML_PRINT.en.md)
