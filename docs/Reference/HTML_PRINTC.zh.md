---
hide:
  - toc
---

# HTML_PRINTC / HTML_PRINTLC

| 函数名                                                                     | 参数     | 返回值 |
| :------------------------------------------------------------------------- | :------- | :----- |
| ![](../assets/images/IconSK.webp)[`HTML_PRINTC`](./HTML_PRINTC.zh.md)     | `string` | 无   |
| ![](../assets/images/IconSK.webp)[`HTML_PRINTLC`](./HTML_PRINTC.zh.md)    | `string` | 无   |

!!! info "API"

    ``` { #language-erbapi }
    HTML_PRINTC htmlStyleString
    HTML_PRINTLC htmlStyleString
    ```

    [`HTML_PRINT`](./HTML_PRINT.zh.md) 的居中对齐和左对齐变体。使用 HTML 标签进行渲染，但对齐位置不同。

    - **HTML_PRINTC**：将 HTML 渲染结果**居中对齐**显示。
    - **HTML_PRINTLC**：将 HTML 渲染结果**左对齐**显示。

    与 `HTML_PRINT` 相同，不受 [`ALIGNMENT`](./ALIGNMENT.zh.md)、[`SETFONT`](./SETFONT.zh.md)、[`SETCOLOR`](./SETCOLOR.zh.md)、[`FONTSTYLE`](./FONT_OPERATION.zh.md) 命令的影响。对齐方式由命令本身控制。

    详细信息请参阅 [`HTML_PRINT` 相关](../Emuera/HTML_PRINT.zh.md)。

    !!! warning "注意"
        - 仅支持命令语法，不支持表达式调用。
        - 参数与 `PRINTS` 相同，为字符串表达式。自动换行。

!!! hint "提示"

    仅命令语法可用。

!!! example "示例"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        ; 居中对齐的 HTML 渲染
        HTML_PRINTC "<b>居中对齐文本</b>"

        ; 左对齐的 HTML 渲染
        HTML_PRINTLC "<b>左对齐文本</b>"

        ; 普通 HTML_PRINT（遵循 ALIGNMENT 设置）
        HTML_PRINT "<b>默认对齐</b>"
    ```

### 相关项
- [HTML_PRINT](HTML_PRINT.zh.md)
- [HTML_PRINT相关](../Emuera/HTML_PRINT.zh.md)
