---
hide:
  - toc
---

# TEXT_BGC_ON / TEXT_BGC_OFF

| 函数名 | 参数 | 返回值 |
| :--- | :--- | :--- |
| ![](../assets/images/IconSK.webp)[`TEXT_BGC_ON`](./TEXT_BGC.zh.md) | `int`, `int`, `int`, `int` | void |
| ![](../assets/images/IconSK.webp)[`TEXT_BGC_OFF`](./TEXT_BGC.zh.md) | 无 | void |

!!! info "API"

    ``` { #language-erbapi }
    TEXT_BGC_ON R, G, B, Alpha%
    TEXT_BGC_OFF
    ```

    `TEXT_BGC_ON` 为后续所有行设置**整行**背景色。`TEXT_BGC_OFF` 清除背景色，恢复透明。

    - `R`, `G`, `B`：背景色的 RGB 值（0～255）
    - `Alpha%`：不透明度（0～100）。0=完全透明，100=完全不透明
    - 背景以行全宽（`ClientWidth`）× 行高（`LineHeight`）的矩形绘制
    - 仅当行内存在实际文本时才绘制背景（空行不绘制）
    - 设置在调用 `TEXT_BGC_OFF` 之前持续生效

!!! warning "注意"

    - 背景色以**行**为单位应用。如需单个文字或 span 级别的背景色，请使用 HTML 内联样式
    - 不支持嵌套（save/restore）。设置新颜色会覆盖旧颜色

!!! example "例"

    ``` { #language-erb }
    ; 红色背景显示警告文本
    TEXT_BGC_ON 255, 0, 0, 30
    PRINTL 警告：HP已降低！
    TEXT_BGC_OFF

    ; 半透明蓝色背景
    TEXT_BGC_ON 0, 0, 128, 50
    PRINTL 这行有蓝色背景
    PRINTL 这行也是同样的背景色
    TEXT_BGC_OFF
    ```

### 関連項目
- [SETCOLOR](SETCOLOR.zh.md)
- [SETBGCOLOR](SETBGCOLOR.zh.md)
- [HTML_PRINT](HTML_PRINT.zh.md)
