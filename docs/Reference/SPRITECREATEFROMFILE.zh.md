---
hide:
  - toc
---

# SPRITECREATEFROMFILE

| 函数名                                                                             | 参数                                               | 返回值 |
| :--------------------------------------------------------------------------------- | :------------------------------------------------- | :----- |
| ![](../assets/images/IconSK.webp)[`SPRITECREATEFROMFILE`](./SPRITECREATEFROMFILE.zh.md) | `string`, `string`(, `int`, `int`, `int`, `int`) | `int`  |

!!! info "API"

    ``` { #language-erbapi }
    int SPRITECREATEFROMFILE spriteName, filePath(, x, y, width, height)
    ```

    直接从图像文件创建 Sprite。可以一步完成 [`GCREATEFROMFILE`](./GCREATEFROMFILE.zh.md) 创建 Graphics 再用 [`SPRITECREATE`](./SPRITECREATE.zh.md) 创建 Sprite 的两步操作。

    **参数**：

    | 参数 | 类型 | 说明 |
    | :--- | :--- | :--- |
    | `spriteName` | string | 要创建的 Sprite 资源名 |
    | `filePath` | string | 图像文件路径 |
    | `x` | int | 裁剪起始 X 坐标（省略时为0） |
    | `y` | int | 裁剪起始 Y 坐标（省略时为0） |
    | `width` | int | 裁剪宽度（省略时为0，即图像整体宽度） |
    | `height` | int | 裁剪高度（省略时为0，即图像整体高度） |

    **返回值**：创建成功返回 1，失败返回 0。

    !!! warning "注意"
        - 支持命令和表达式函数两种形式。
        - 如果同名 Sprite 已存在，则创建失败，返回 0。
        - `filePath` 可以是 `resources` 文件夹的相对路径或绝对路径。
        - 创建的 Sprite 可用于 [`PRINT_IMG`](./PRINT_IMG.zh.md) 命令或 [`HTML_PRINT 的 img 标签`](../Emuera/HTML_PRINT.zh.md#img) 等。
        - 与 [`SPRITECREATE`](./SPRITECREATE.zh.md) 不同，此函数创建的 Sprite 没有父 Graphics，因此 Sprite 作为独立图像数据保存。

!!! hint "提示"

    支持命令和表达式函数两种形式。

!!! example "示例"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        ; 从整个文件创建 Sprite
        IF SPRITECREATEFROMFILE("my_img", "image/character.png")
            PRINTL Sprite 创建成功
            PRINT_IMG my_img
        ELSE
            PRINTL Sprite 创建失败
        ENDIF

        ; 从文件的一部分裁剪创建 Sprite
        SPRITECREATEFROMFILE "my_icon", "image/icons.png", 0, 0, 32, 32
    ```

### 相关项
- [SPRITECREATE](SPRITECREATE.zh.md)
- [GCREATEFROMFILE](GCREATEFROMFILE.zh.md)
- [PRINT_IMG](PRINT_IMG.zh.md)
