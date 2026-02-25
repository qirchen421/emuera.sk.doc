---
hide:
  - toc
---

# HTML_STRINGLEN

| 関数名                                                                   | 引数              | 戻り値 |
| :----------------------------------------------------------------------- | :---------------- | :----- |
| ![](../assets/images/IconEM.webp)[`HTML_STRINGLEN`](./HTML_STRINGLEN.md) | `string`(, `int`) | `int`  |

!!! info "API"
    
    ``` { #language-erbapi }
    int HTML_STRINGLEN html(, returnPixel)
    ```

    Returns the width of the result of displaying `html` with `html_print`. If there are multiple lines, it returns the width of the first line.
    If `returnPixel` is `0` or omitted, it returns in half-width character units. Otherwise, it returns the number of pixels.

    !!! warning "Warning"

        Unless wrapped in `<nobr></nobr>`, the return value will not exceed "window width - scrollbar width" no matter how long the string is.

!!! hint "Hint"

    Both commands and expression functions are supported.

!!! example "Example"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE

        PRINTFORML {HTML_STRINGLEN("<b>B</b>")}
        PRINTFORML {HTML_STRINGLEN("<b>B</b>", 1)} {GETCONFIG("フォントサイズ")/2}

        ONEINPUT
    ```
    ``` title="Result"
    2
    9 8
    ```
    This is because bold characters are wider than normal

### See Also
- [STRLEN](STRLEN.md)
