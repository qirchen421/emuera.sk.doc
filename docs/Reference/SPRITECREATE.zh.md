---
hide:
  - toc
---

# SPRITECREATE

| 函数名                                                                   | 参数                                                              | 返回值 |
| :----------------------------------------------------------------------- | :---------------------------------------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`SPRITECREATE`](./SPRITECREATE.md) | `string`, `int`                                                   | `int`  |
|                                                                          | `string`, `int`, `int`, `int`, `int`, `int`                       | `int`  |
|                                                                          | `string`, `int`, `int`, `int`, `int`, `int`, `int`, `int`         | `int`  |
|                                                                          | `string`, `int`, `int`, `int`, `int`, `int`, `int`, `int`, `int`, `int` | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    int SPRITECREATE spriteName, gID
    int SPRITECREATE spriteName, gID, x, y, width, height
    int SPRITECREATE spriteName, gID, x, y, width, height, posX, posY
    int SPRITECREATE spriteName, gID, x, y, width, height, posX, posY, destWidth, destHeight
    ```

    基于 `gID` 所指定的 `Graphics` 图像的全部或部分，创建一个资源名为 `spriteName` 的精灵。
    通过指定 `x, y, width, height` 参数，可以截取 `Graphics` 图像的特定部分作为精灵。
    创建成功时，返回非 0 值。
    因已存在同名精灵资源等原因导致失败时，返回 0。
    精灵仅保存了其父 `Graphics` 的 `gID` 和截取位置信息，因此当父 `Graphics` 发生变更时，精灵也会随之改变。
    此外，如果父 `Graphics` 被销毁，该精灵也将被视为已销毁。
    创建的精灵可以像在 `resources` 文件夹内的 csv 文件中声明的资源一样使用。
    例如，可以在 [`PRINT_IMG`](./PRINT_IMG.md) 命令或 [`HTML_PRINT 的 img 标签`](../Emuera/HTML_PRINT.md#img) 中使用。

    **Skia（SkiaSharp版）扩展参数**（第7个参数起）：

    - `posX`, `posY`（可选，默认 `0`）：精灵的绘制偏移。指定精灵被绘制时相对于原点的偏移位置。
    - `destWidth`, `destHeight`（可选，默认与源矩形相同尺寸）：精灵的绘制目标尺寸。指定与源矩形不同的尺寸时，精灵会被缩放绘制。负值会被取绝对值处理。

!!! hint "提示"

    该功能同时支持命令和表达式函数两种形式。

### 相关项目
- [GCREATE](GCREATE.md)
