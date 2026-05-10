---
hide:
  - toc
---

# STRICT_FONT_FALLBACK

| 函数名 | 参数 | 返回值 |
| :--- | :--- | :--- |
| ![](../assets/images/IconSK.webp)[`STRICT_FONT_FALLBACK`](./STRICT_FONT_FALLBACK.zh.md) | `int` | void |

!!! info "API"

    ``` { #language-erbapi }
    STRICT_FONT_FALLBACK value
    ```

    切换字体回退的严格模式。

    - `value` 设为 `1` 启用严格模式，设为 `0` 禁用
    - 严格模式启用时，指定字体中不存在字形的字符不会使用回退字体替代，而是显示为 □（tofu）
    - 严格模式禁用（默认）时，不存在字形的字符会自动使用回退字体绘制

!!! hint "提示"

    该功能同时支持指令和表达式函数两种形式。

!!! example "例"

    ``` { #language-erb }
    ; 启用严格模式（无字体回退）
    STRICT_FONT_FALLBACK 1
    PRINTL 此文本不会回退到其他字体
    ; 禁用严格模式（默认回退行为）
    STRICT_FONT_FALLBACK 0
    ```

### 関連項目
- [SETFONT](SETFONT.zh.md)
- [SKIA_RENDER](SKIA_RENDER.zh.md)
