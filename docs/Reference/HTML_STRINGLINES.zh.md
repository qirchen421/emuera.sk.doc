---
hide:
  - toc
---

# HTML_STRINGLINES

| 函数名                                                                       | 参数            | 返回值 |
| :--------------------------------------------------------------------------- | :-------------- | :----- |
| ![](../assets/images/IconEM.webp)[`HTML_STRINGLINES`](./HTML_STRINGLINES.zh.md) | `string`, `int` | `int`  |

!!! info "API"

    ``` { #language-erbapi }
    int HTML_STRINGLINES html, width
    ```

    `html` 在 `HTML_PRINT` 中打印的结果，按 `width`（半角字符数）分割后的行数。

!!! hint "提示"

    同时支持指令和表达式函数。

!!! example "示例"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE

        PRINTVL HTML_STRINGLINES("AB<b>CD</b>",4)

        ONEINPUT
    ```
    ``` title="结果"
    2
    ```
    因为粗体比普通字体更宽。