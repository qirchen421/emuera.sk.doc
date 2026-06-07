---
hide:
  - toc
---

# HTML_SUBSTRING

| 函数名                                                                   | 参数            | 返回值   |
| :----------------------------------------------------------------------- | :-------------- | :------- |
| ![](../assets/images/IconEM.webp)[`HTML_SUBSTRING`](./HTML_SUBSTRING.zh.md) | `string`, `int` | `string` |

!!! info "API"

    ``` { #language-erbapi }
    string HTML_SUBSTRING html, width
    ```

    使用 `HTML_PRINT` 命令打印 `html` 时，返回不超过 `width`（半角字符数量）的部分。

    截取部分赋值给 `RESULTS:0`（与返回值相同），剩余部分赋值给 `RESULTS:1`。  
    截取时会自动闭合未关闭的标签，剩余部分会自动重开被闭合的标签。

    !!! warning "注意"

        `v8b` 开始将返回值从整数型(固定为 `1`)更改为字符串型(与 `RESULTS:0` 相同)。

!!! hint "提示"

    命令 / 行内函数两种写法均有效。

!!! example "示例代码"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE

        PRINTSL HTML_SUBSTRING("AB<b>CD</b>EFG",4)
        PRINTSL RESULTS:1

        ONEINPUT
    ```
    ``` title="输出结果"
    AB<b>C</b>
    <b>D</b>EFG
    ```
    因为粗体比常规字体宽。

    ``` { #language-erb title="逐行分割循环" }
    ; 用 HTML_SUBSTRING 逐行分割（自动处理标签配对）
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

### 相关项目
- [SUBSTRING](SUBSTRING.zh.md)