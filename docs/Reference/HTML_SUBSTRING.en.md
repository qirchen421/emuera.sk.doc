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

    !!! warning "Warning"

        In `v8b`, the return type was changed from integer type (always `1`) to string type (same as `RESULTS:0`).

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

### See Also
- [SUBSTRING](SUBSTRING.en.md)
