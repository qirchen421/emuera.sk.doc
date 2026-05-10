---
hide:
  - toc
---

# HTML_PRINTC / HTML_PRINTLC

| 函数名                                                                     | 参数              | 返回值 |
| :------------------------------------------------------------------------- | :---------------- | :----- |
| ![](../assets/images/IconSK.webp)[`HTML_PRINTC`](./HTML_PRINTC.zh.md)     | `string {, int}` | 无   |
| ![](../assets/images/IconSK.webp)[`HTML_PRINTLC`](./HTML_PRINTC.zh.md)    | `string {, int}` | 无   |

!!! info "API"

    ``` { #language-erbapi }
    HTML_PRINTC htmlString {, cellWidth}
    HTML_PRINTLC htmlString {, cellWidth}
    ```

    [`HTML_PRINT`](./HTML_PRINT.zh.md) 的右对齐和左对齐变体。使用 HTML 标签进行渲染，但对齐位置不同。

    - **HTML_PRINTC**：将 HTML 渲染结果**右对齐**显示。
    - **HTML_PRINTLC**：将 HTML 渲染结果**左对齐**显示。

    第二参数 `cellWidth` 为可选的整数表达式，指定单元格宽度（像素）。省略时使用 `PrintCLength * FontSize / 2` 的默认值。

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
        ; 右对齐的 HTML 渲染
        HTML_PRINTC "<b>右对齐文本</b>"

        ; 左对齐的 HTML 渲染
        HTML_PRINTLC "<b>左对齐文本</b>"

        ; 指定单元格宽度（200像素）
        HTML_PRINTC "<b>右对齐文本</b>", 200

        ; 普通 HTML_PRINT（遵循 ALIGNMENT 设置）
        HTML_PRINT "<b>默认对齐</b>"
    ```

### 相关项
- [HTML_PRINT](HTML_PRINT.zh.md)
- [HTML_PRINT相关](../Emuera/HTML_PRINT.zh.md)
