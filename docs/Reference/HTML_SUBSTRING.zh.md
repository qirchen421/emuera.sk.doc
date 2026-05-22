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
    int HTML_SUBSTRING html, width
    ```

    使用 `HTML_PRINT` 命令打印 `html` 时，返回不超过 `width`（半角字符数量）的部分。

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

### 相关项目
- [SUBSTRING](SUBSTRING.zh.md)