---
hide:
  - toc
---

# SET_TEXT_DRAWING_MODE / SET_SKIA_QUALITY

| 函数名                                                                               | 参数                              | 返回值 |
| :----------------------------------------------------------------------------------- | :-------------------------------- | :----- |
| ![](../assets/images/IconSK.webp)[`SET_TEXT_DRAWING_MODE`](./SKIA_RENDER.zh.md)         | `int`                             | `int`  |
| ![](../assets/images/IconSK.webp)[`GET_TEXT_DRAWING_MODE`](./SKIA_RENDER.zh.md)         | 无                              | `int`  |
| ![](../assets/images/IconSK.webp)[`SET_SKIA_QUALITY`](./SKIA_RENDER.zh.md)              | `int`(, `int`, `int`)             | `int`  |
| ![](../assets/images/IconSK.webp)[`GET_SKIA_QUALITY`](./SKIA_RENDER.zh.md)              | `int`                             | `int`  |

!!! info "API"

    ``` { #language-erbapi }
    SET_TEXT_DRAWING_MODE modeID
    int GET_TEXT_DRAWING_MODE
    SET_SKIA_QUALITY qualityID{, hintingID, edgingID}
    int GET_SKIA_QUALITY typeID
    ```

    Skia（SkiaSharp版）新增的渲染控制 API。动态控制文本的渲染管线和 SkiaSharp 质量参数。

    ### SET_TEXT_DRAWING_MODE / GET_TEXT_DRAWING_MODE

    动态切换全局文本渲染管线。

    - **mode = 1**：`TEXTRENDERER` — 使用 GDI+ (TextRenderer) 渲染
    - **mode = 3**：`SKIASHARP` — 使用 SkiaSharp 渲染

    - `SET_TEXT_DRAWING_MODE`：仅命令语法。成功返回 1，失败返回 0。
    - `GET_TEXT_DRAWING_MODE`：支持命令和表达式函数。返回当前渲染模式（1=GDI+, 3=SkiaSharp）。
    - 默认为 `SKIASHARP` (3)。
    - 切换渲染管线后，已缓存的字体可能需要重新加载才能生效。

    ### SET_SKIA_QUALITY / GET_SKIA_QUALITY

    控制 SkiaSharp 渲染的质量参数。所有参数均可省略，省略时保持当前值不变。

    **SET_SKIA_QUALITY 参数**：

    | 参数 | 值域 | 说明 |
    | :--- | :--- | :--- |
    | `quality` | 0～3 | 图像质量等级 |
    | `hinting` | 0～3 | 字形微调：0=none, 1=slight, 2=normal, 3=full |
    | `edging` | 0～2 | 抗锯齿方式：0=alias, 1=antialias, 2=subpixel |

    **GET_SKIA_QUALITY 参数**：

    | type | 返回值 |
    | :--- | :--- |
    | 0 | 当前 ImageQuality 值 |
    | 1 | 当前 FontHinting 值 |
    | 2 | 当前 FontEdging 值 |

    - `SET_SKIA_QUALITY`：仅命令语法。调用后 FontFactory 会清除字体缓存。
    - `edging=0` (alias) 可实现类似早期 Windows 字体的锐利像素风格。
    - `edging=2` (subpixel) 提供最佳的视觉平滑效果。

    **默认值（emuera.config）**：

    | 参数 | 默认值 | 说明 |
    | :--- | :--- | :--- |
    | ImageQuality | High (3) | 图像质量等级 |
    | FontHinting | None (0) | 字形微调 |
    | FontEdging | SubpixelAntiAlias (2) | 抗锯齿方式 |

    !!! warning "注意"
        - `SET_TEXT_DRAWING_MODE` 和 `SET_SKIA_QUALITY` 仅支持命令语法。
        - `GET_TEXT_DRAWING_MODE` 和 `GET_SKIA_QUALITY` 支持命令和表达式函数两种形式。
        - 光栅字体（MS Gothic、MS Mincho 等）在 `render` 属性未指定时会自动使用 GDI+ 渲染。如需用 SkiaSharp 渲染，建议配合 `edging='alias'`。

!!! hint "提示"

    `SET_TEXT_DRAWING_MODE` 和 `SET_SKIA_QUALITY` 仅命令语法。`GET_TEXT_DRAWING_MODE` 和 `GET_SKIA_QUALITY` 支持命令和表达式函数两种形式。

!!! example "示例"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        ; 确认当前渲染模式
        PRINTFORML 当前模式: {GET_TEXT_DRAWING_MODE()}

        ; 设置高质量模式
        SET_SKIA_QUALITY 3, 2, 2
        PRINTFORML ImageQuality: {GET_SKIA_QUALITY(0)}

        ; 像素风渲染
        SET_SKIA_QUALITY 3, 0, 0
        HTML_PRINT "像素风文本"

        ; 切换到 GDI+ 模式
        SET_TEXT_DRAWING_MODE 1
        PRINTFORML 切换后模式: {GET_TEXT_DRAWING_MODE()}

        ; 切回 SkiaSharp 模式
        SET_TEXT_DRAWING_MODE 3
    ```

### HTML_PRINT font 标签扩展属性

[`HTML_PRINT`](./HTML_PRINT.zh.md) 的 `<font>` 标签新增以下属性：

| 属性 | 值 | 说明 |
    | :--- | :--- | :--- |
    | `render` | `'gdi'` / `'skia'` | 指定渲染管线（覆盖全局设置） |
    | `edging` | `'alias'` / `'antialias'` / `'subpixel'` | 控制抗锯齿方式 |
    | `hinting` | `'none'` / `'slight'` / `'normal'` / `'full'` | 控制字形微调程度 |
    | `size` | 正浮点数（可带 `px` 后缀） | 指定字体大小（像素） |

    - 属性支持**嵌套继承**：内层 `<font>` 未指定的属性会继承外层设置。
    - `render` 省略时，光栅字体自动使用 GDI+，其他字体遵循全局设置。
    - `size` 属性支持浮点数（例：`<font size='12.5'>`）。

    ``` { #language-erb title="HTML font 属性示例" }
    HTML_PRINT "<font render='gdi' face='MS Gothic'>[♥] GDI+渲染</font>"
    HTML_PRINT "<font edging='alias'>像素风文本</font>"
    HTML_PRINT "<font size='24'>大号字体（24px）</font>"
    HTML_PRINT "<font render='skia' edging='subpixel' hinting='full'>SkiaSharp+高品质</font>"
    ```

### 相关项
- [HTML_PRINT](HTML_PRINT.zh.md)
- [SETFONT](SETFONT.zh.md)
