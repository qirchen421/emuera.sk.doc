# HTML_STRINGLEN

| 函数名                                                                   | 参数              | 返回值 |
| :----------------------------------------------------------------------- | :---------------- | :----- |
| ![](../assets/images/IconEM.webp)[`HTML_STRINGLEN`](./HTML_STRINGLEN.md) | `string`(, `int`) | `int`  |

!!! info "API"
    
    ``` { #language-erbapi }
    int HTML_STRINGLEN html(, returnPixel)
    ```

    `HTML_PRINT` 返回 `html` 渲染结果的宽度，有多行的情况下则返回第一行宽度。  
    `returnPixel` 值为 `0` 或省略时返回值为半角字符的长度（数量），否则返回宽度占用的像素数量。

!!! hint "提示"

    命令 / 行内函数两种写法均有效。

!!! example "示例代码"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE

        HTML_SUBSTRING "AB<b>CD</b>EFG", 4
        PRINTSL RESULTS
        PRINTSL RESULTS:1

        ONEINPUT
    ```
    ``` title="输出结果"
    AB<b>C</b>
    <b>D</b>EFG
    ```
    因为粗体比常规字体宽。
