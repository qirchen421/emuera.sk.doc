---
hide:
  - toc
---

# HTML_SUBSTRING

| Function name                                                                   | Arguments            | Return   |
| :----------------------------------------------------------------------- | :-------------- | :------- |
| ![](../assets/images/IconEM.webp)[`HTML_SUBSTRING`](./HTML_SUBSTRING.en.md) | `string`, `int` | `string` |

!!! info "API"
    
    ``` { #language-erbapi }
    int HTML_SUBSTRING html, width
    ```

    Splits the result of printing `html` with `html_print` by `width` (half-width character count) and returns it.

    The extracted portion is assigned to `RESULTS:0` (same as the return value), and the remainder is assigned to `RESULTS:1`.  
    During extraction, any unclosed tags are automatically closed, and the closed tags are automatically reopened in the remainder.

    !!! warning "Warning"

        In `v8b`, the return type was changed from integer type (always `1`) to string type (same as `RESULTS:0`).

    !!! tip "Automatic Tag Balancing"

        The return value (`RESULTS:0`) automatically closes any open tags, and `RESULTS:1` (the remainder) automatically reopens the closed tags.
        
        Example: splitting `<font color='red'>ABC<br>DEF</font>` with `width=3`:
        - `RESULTS:0` = `<font color='red'>ABC</font>`
        - `RESULTS:1` = `<font color='red'><br>DEF</font>`

!!! hint "Hint"

    Both commands and expression functions are supported.

!!! example "Example"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE

        PRINTSL HTML_SUBSTRING("AB<b>CD</b>EFG",4)
        PRINTSL RESULTS:1

        ONEINPUT
    ```
    ``` title="Result"
    AB<b>C</b>
    <b>D</b>EFG
    ```
    This is because bold characters are wider than normal

    ``` { #language-erb title="Line-by-line Splitting Loop" }
    ; Split HTML line-by-line with automatic tag balancing
    #DIMS L_REMAIN
    #DIMS L_LINE
    #DIM L_LINE_CNT
    
    L_REMAIN '= HTML_CONTENT
    L_LINE_CNT = 0
    WHILE STRLENS(L_REMAIN) > 0
        L_LINE '= HTML_SUBSTRING(L_REMAIN, L_WIDTH)
        L_LINES:L_LINE_CNT '= L_LINE
        L_LINE_CNT += 1
        L_REMAIN '= RESULTS:1
    WEND
    ```

### See Also
- [SUBSTRING](SUBSTRING.en.md)
