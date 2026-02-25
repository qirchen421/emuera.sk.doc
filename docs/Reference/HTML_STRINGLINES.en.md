---
hide:
  - toc
---

# HTML_STRINGLINES

| 関数名                                                                       | 引数            | 戻り値 |
| :--------------------------------------------------------------------------- | :-------------- | :----- |
| ![](../assets/images/IconEM.webp)[`HTML_STRINGLINES`](./HTML_STRINGLINES.md) | `string`, `int` | `int`  |

!!! info "API"

    ``` { #language-erbapi }
    int HTML_STRINGLINES html, width
    ```

    Returns the number of lines when splitting the result of printing `html` with `html_print` by `width` (half-width character count).

!!! hint "Hint"

    Both commands and expression functions are supported.

!!! example "Example"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE

        PRINTVL HTML_STRINGLINES("AB<b>CD</b>",4)

        ONEINPUT
    ```
    ``` title="Result"
    2
    ```
    This is because bold characters are wider than normal
