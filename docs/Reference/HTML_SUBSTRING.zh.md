# HTML_SUBSTRING

| 函数名                                                                   | 参数            | 返回值 |
| :----------------------------------------------------------------------- | :-------------- | :----- |
| ![](../assets/images/IconEM.webp)[`HTML_SUBSTRING`](./HTML_SUBSTRING.md) | `string`, `int` | `int`  |

!!! info "API"

    ``` { #language-erbapi }
    int HTML_SUBSTRING html, width
    ```

    使用 `HTML_PRINT` 命令打印 `html` 时，返回不超过 `width`（半角字符数量）的部分。

!!! hint "提示"

    命令 / 行内函数两种写法均有效。

!!! example "示例代码"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE

        HTML_SUBSTRING "AB<b>CD</b>EFG",4
        PRINTSL RESULTS
        PRINTSL RESULTS:1

        ONEINPUT
    ```
    ``` title="输出结果"
    AB<b>C</b>
    <b>D</b>EFG
    ```
    因为粗体比常规字体宽。
