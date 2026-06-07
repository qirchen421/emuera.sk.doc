---
hide:
  - toc
---

# GETLINEY

| 函数名                                                                   | 参数    | 返回值 |
| :----------------------------------------------------------------------- | :------ | :----- |
| ![](../assets/images/IconSK.webp)[`GETLINEY`](./GETLINEY.zh.md) | `int`   | `int`  |

!!! info "API"

    ``` { #language-erbapi }
    int GETLINEY(lineNo)
    ```

    返回指定行号的物理 Y 坐标（左下原点），与 [`SETIMAGELAYER`](./SETIMAGELAYER.zh.md) 的坐标系一致。

    **参数**：

    | 参数 | 类型 | 说明 |
    | :--- | :--- | :--- |
    | `lineNo` | int | 行号（≥0） |

    **返回值**：指定行的物理 Y 坐标（像素）。左下原点坐标系，与 `SETIMAGELAYER` 的 `y` 参数使用相同坐标系。

!!! warning "注意"

    Skia 版专有表达式函数。传入负数参数将抛出 `CodeEE`。

!!! hint "提示"

    用于将 [`SETIMAGELAYER`](./SETIMAGELAYER.zh.md) 的图像与 HTML 文本流对齐。通过 `GETLINEY(LINECOUNT)` 获取当前行的 Y 坐标，传递给 `SETIMAGELAYER` 的 `y` 参数，即可将图像图层精确放置在文本所在行。

!!! example "示例"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        ; 获取当前行号
        #DIM L_LINE
        L_LINE = LINECOUNT

        ; 输出文本
        PRINTL 你好

        ; 在同一行放置图像图层
        #DIM L_Y
        L_Y = GETLINEY(L_LINE)
        SETIMAGELAYER "icon", 1, 100, L_Y, 50, 50
    ```

### 相关项
- [SETIMAGELAYER](SETIMAGELAYER.zh.md)
- [EXISTSIMAGELAYER](EXISTSIMAGELAYER.zh.md)
- [CLEARIMAGELAYER](CLEARIMAGELAYER.zh.md)
