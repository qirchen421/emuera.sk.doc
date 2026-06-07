---
hide:
  - toc
---

# SETIMAGELAYER

| 函数名                                                                   | 参数                                                                                           | 返回值 |
| :----------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------- | :----- |
| ![](../assets/images/IconSK.webp)[`SETIMAGELAYER`](./SETIMAGELAYER.zh.md) | `str`, `int`, `int`, `int`, `int`, `int`, `int`, `var`, `int`                                  | 无   |

!!! info "API"

    ``` { #language-erbapi }
    SETIMAGELAYER spriteName, depth(, x, y, width, height, opacity, colorMatrix, followScroll)
    ```

    在独立图层上渲染指定 Sprite。与 [`CBGSETSPRITE`](./CBGSETSPRITE.zh.md) 不同，SETIMAGELAYER 的图层与文本行解耦，支持视口裁剪和跟随滚动。

    **参数**（`spriteName` 和 `depth` 不可省略，其余均可省略）：

    | 参数 | 类型 | 默认值 | 说明 |
    | :--- | :--- | :----- | :--- |
    | `spriteName` | str | — | Sprite 名称（不可省略） |
    | `depth` | int | — | 层深度（不可省略）。正值在文本后方，负值在文本前方 |
    | `x` | int | `0` | 绘制 X 坐标 |
    | `y` | int | `0` | 绘制 Y 坐标 |
    | `width` | int | `0` | 目标宽度。0 表示使用 Sprite 原始宽度 |
    | `height` | int | `0` | 目标高度。0 表示使用 Sprite 原始高度 |
    | `opacity` | int | `255` | 不透明度（0～255）。255 为完全不透明 |
    | `colorMatrix` | var | `null` | 5×5 颜色矩阵数组引用（如 `CM_GRAY:0:0`） |
    | `followScroll` | int | `0` | 是否跟随文本滚动。0=固定位置，1=随文本滚动 |

    !!! warning "注意"
        - 仅支持命令语法，不支持表达式调用。
        - `depth` 用于图层排序。相同 `depth` 的图层按添加顺序渲染，不会被覆盖。要删除同一 `depth` 的所有图层，请使用 [`CLEARIMAGELAYER depth`](./CLEARIMAGELAYER.zh.md)。
        - 第 3～9 参数支持空参数（`,,`），为空时使用默认值。
        - [`SETIMAGELAYERL`](./SETIMAGELAYERL.zh.md) 是自动 `followScroll=1` + `GETLINEY` Y 坐标转换的后缀指令，适合需要与 HTML img 对齐的场景。
        - 可通过 [`EXISTSIMAGELAYER(depth)`](./EXISTSIMAGELAYER.zh.md) 检测指定深度的图层是否存在。
        - 可通过 [`CLEARIMAGELAYER depth`](./CLEARIMAGELAYER.zh.md) 清除指定深度的图层，或 [`CLEARIMAGELAYER_ALL`](./CLEARIMAGELAYER.zh.md) 清除所有图层。
        - **渲染层级**（v7.0 统一 depth 管线）：SETIMAGELAYER、CBG、escapedParts（含 div）共享同一 depth 排序系统。SETIMAGELAYER 的 depth > div 的 depth 时，图层渲染在 div 之上。
        - **渲染偏移差异**：SETIMAGELAYER 是像素级精准定位（无偏移），而 HTML `<img>` 渲染时引擎会自动加约 2-4px 的 X 偏移（`DrawingParam_ShapePositionShift`）。
        - WINAPI 模式不支持此命令。

!!! hint "提示"

    仅命令语法可用。

!!! example "示例"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        ; 基本渲染：在 depth=1 显示 Sprite
        SETIMAGELAYER "pet_1", 1

        ; 指定位置和深度
        SETIMAGELAYER "pet_2", 2, 100, 50

        ; 缩放 + 透明度
        SETIMAGELAYER "pet_3", 3, 200, 100, 150, 150, 200

        ; 颜色矩阵 + 跟随滚动
        #DIM CM_GRAY, 5, 5
        CM_GRAY:0:0 =  77, 150,  29,   0,   0
        CM_GRAY:1:0 =  77, 150,  29,   0,   0
        CM_GRAY:2:0 =  77, 150,  29,   0,   0
        CM_GRAY:3:0 =   0,   0,   0, 256,   0
        CM_GRAY:4:0 =   0,   0,   0,   0, 256
        SETIMAGELAYER "pet_4", 4, 300, 50, 150, 150, 255, CM_GRAY:0:0, 1

        ; 检测图层是否存在
        IF EXISTSIMAGELAYER(1)
            PRINTL depth=1 的图层已存在
        ENDIF

        ; 清除指定图层
        CLEARIMAGELAYER 1

        ; 清除所有图层
        CLEARIMAGELAYER_ALL
    ```
    ``` title="结果"
    depth=1 的图层已存在
    ```

### 相关项
- [SETIMAGELAYERL](SETIMAGELAYERL.zh.md)
- [CLEARIMAGELAYER](CLEARIMAGELAYER.zh.md)
- [EXISTSIMAGELAYER](EXISTSIMAGELAYER.zh.md)
- [CBGSETSPRITE](CBGSETSPRITE.zh.md)
