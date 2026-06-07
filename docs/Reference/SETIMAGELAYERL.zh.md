---
hide:
  - toc
---

# SETIMAGELAYERL

| 函数名                                                                       | 参数                                                                      | 返回值 |
| :--------------------------------------------------------------------------- | :------------------------------------------------------------------------ | :----- |
| ![](../assets/images/IconSK.webp)[`SETIMAGELAYERL`](./SETIMAGELAYERL.zh.md) | `str`, `int`, `int`, `int`, `int`, `int`, `int`, `var`                     | 无   |

!!! info "API"

    ``` { #language-erbapi }
    SETIMAGELAYERL spriteName, depth(, xpos, ypos, width, height, opacity, colorMatrix)
    ```

    [`SETIMAGELAYER`](./SETIMAGELAYER.zh.md) 的行相对定位版本。自动设置 `followScroll=1`，始终锚定当前显示行。定位参数 `xpos`/`ypos` 为相对行位置的偏移，与 [`HTML_PRINT`](./HTML_PRINT.zh.md) 的 `<img>` 标签的 `xpos`/`ypos` 属性语义一致。当 `xpos=0, ypos=0` 时，渲染位置与同行的 `<img>` 完全一致（包括 `ShapePositionShift` 偏移）。

    **参数**（`spriteName` 和 `depth` 不可省略，其余均可省略）：

    | 参数 | 类型 | 默认值 | 说明 |
    | :--- | :--- | :----- | :--- |
    | `spriteName` | str | — | Sprite 名称（不可省略） |
    | `depth` | int | — | 层深度（不可省略）。正值在文本后方，负值在文本前方 |
    | `xpos` | int | `0` | 相对行位置的 X 偏移（与 HTML `<img>` 的 `xpos` 属性一致，已包含 `ShapePositionShift`） |
    | `ypos` | int | `0` | 相对行顶边的 Y 偏移（与 HTML `<img>` 的 `ypos` 属性一致） |
    | `width` | int | `0` | 目标宽度。0 表示使用 Sprite 原始宽度 |
    | `height` | int | `0` | 目标高度。0 表示使用 Sprite 原始高度 |
    | `opacity` | int | `255` | 不透明度（0～255）。255 为完全不透明 |
    | `colorMatrix` | var | `null` | 5×5 颜色矩阵数组引用（如 `CM_GRAY:0:0`） |

    !!! warning "注意"
        - 仅支持命令语法，不支持表达式调用。
        - `followScroll` 始终为 `1`（跟随滚动）。需要固定位置的图层请使用 [`SETIMAGELAYER`](./SETIMAGELAYER.zh.md)。
        - 始终锚定当前显示行，不支持指定其他行号。
        - `xpos` 和 `ypos` 是相对行位置的偏移，与 [`SETIMAGELAYER`](./SETIMAGELAYER.zh.md) 的绝对坐标 `x`/`y` 语义不同。
        - 第 3～8 参数支持空参数（`,,`），为空时使用默认值。
        - WINAPI 模式不支持此命令。

!!! hint "提示"

    当需要将图层放置在 HTML img 相同位置时，使用 `SETIMAGELAYERL` 并设置 `xpos=0, ypos=0` 即可，无需手动计算 `GETLINEY` 或补偿 `ShapePositionShift`。

!!! example "示例"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        ; 基本渲染：在当前行显示 Sprite（xpos=0, ypos=0，与 HTML img 一致）
        SETIMAGELAYERL "pet_1", 1

        ; 指定 X 偏移
        SETIMAGELAYERL "pet_2", 2, 100

        ; 指定 X/Y 偏移和尺寸
        SETIMAGELAYERL "pet_3", 3, 0, 0, 150, 150, 200

        ; 带颜色矩阵
        #DIM CM_GRAY, 5, 5
        CM_GRAY:0:0 =  77, 150,  29,   0,   0
        CM_GRAY:1:0 =  77, 150,  29,   0,   0
        CM_GRAY:2:0 =  77, 150,  29,   0,   0
        CM_GRAY:3:0 =   0,   0,   0, 256,   0
        CM_GRAY:4:0 =   0,   0,   0,   0, 256
        SETIMAGELAYERL "pet_4", 4, , , 150, 150, 255, CM_GRAY:0:0
    ```

### 相关项
- [SETIMAGELAYER](SETIMAGELAYER.zh.md)
- [CLEARIMAGELAYER](CLEARIMAGELAYER.zh.md)
- [EXISTSIMAGELAYER](EXISTSIMAGELAYER.zh.md)
- [GETLINEY](GETLINEY.zh.md)
