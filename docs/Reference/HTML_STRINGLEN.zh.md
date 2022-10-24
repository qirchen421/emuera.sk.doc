---
hide:
  - toc
---

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

    !!! warning "注意"

        只要没有用`<nobr></nobr>`标签包围，无论文字多长，返回的数值都不会超过「窗口宽度-滚动条宽度」。

!!! hint "提示"

    命令 / 行内函数两种写法均有效。

!!! example "示例代码"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE

        PRINTFORML {HTML_STRINGLEN("<b>B</b>")}
        PRINTFORML {HTML_STRINGLEN("<b>B</b>", 1)} {GETCONFIG("フォントサイズ")/2}

        ONEINPUT
    ```
    ``` title="输出结果"
    2
    9 8
    ```
    因为粗体比常规字体宽。
