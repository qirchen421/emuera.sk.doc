---
hide:
  - toc
---

# CBGSETSPRITE

| 函数名                                                                   | 参数                                                     | 返回值 |
| :----------------------------------------------------------------------- | :------------------------------------------------------- | :----- |
| ![](../assets/images/IconEmuera.webp)[`CBGSETSPRITE`](./CBGSETSPRITE.md) | `string`, `int`, `int`, `int`(, `int`, `int`, `int`, `var`) | `int`  |

!!! info "API"

    ```  { #language-erbapi }
    int CBGSETSPRITE, spriteName, x, y, zDepth{, width, height, opacity, colorMatrix}
    ```

    将指定资源名 `spriteName` 对应的精灵（sprite）设置为在客户端区域显示。
    当 `x` 和 `y` 指定为 0 时，精灵将显示在客户端区域的左下角，且其左下角与区域左下角对齐。
    `x` 轴正方向为右，`y` 轴正方向为下，`zDepth` 轴正方向为屏幕向里（远离观察者）。
    `zDepth` 必须指定非零值。通常的文字绘制相当于 `zDepth==0`，若 `zDepth` 为负值，则精灵将绘制在文字的前方。

    **Skia（SkiaSharp版）扩展参数**（第5个参数起，均可省略）：

    | 参数 | 类型 | 默认值 | 说明 |
    | :--- | :--- | :----- | :--- |
    | `width` | `int` | `0` | 目标宽度。0 表示使用 Sprite 原始宽度 |
    | `height` | `int` | `0` | 目标高度。0 表示使用 Sprite 原始高度 |
    | `opacity` | `int` | `255` | 不透明度（0～255）。255 为完全不透明 |
    | `colorMatrix` | `var` | `null` | 5×5 颜色矩阵数组引用（如 `CM_GRAY:0:0`）。省略则不应用颜色变换 |

    - `opacity` 为整数 0～255，引擎内部会除以 255 转为浮点数。
    - `colorMatrix` 传递二维/三维整数数组的起始地址（如 `CM:0:0` 或 `CM_PRESET:0:0:0`），引擎读取 5×5 子矩阵并除以 256 转为浮点数。

    !!! warning "注意"
        - `zDepth` 不可为 0。
        - `colorMatrix` 参数在 WINAPI 模式下不支持。

!!! hint "提示"

    此函数同时支持作为命令和表达式函数使用。

!!! example "示例"

    ``` { #language-erb title="MAIN.ERB" }
    @SYSTEM_TITLE
        ; 基本渲染：在 (0,0) 位置以 depth=1 显示 Sprite
        CBGSETSPRITE "pet_1", 0, 0, 1

        ; 缩放 + 透明度：缩放到 200x200，约 78% 不透明
        CBGSETSPRITE "pet_2", 100, 50, 2, 200, 200, 200

        ; 颜色矩阵：灰度效果
        #DIM CM_GRAY, 5, 5
        CM_GRAY:0:0 =  77, 150,  29,   0,   0
        CM_GRAY:1:0 =  77, 150,  29,   0,   0
        CM_GRAY:2:0 =  77, 150,  29,   0,   0
        CM_GRAY:3:0 =   0,   0,   0, 256,   0
        CM_GRAY:4:0 =   0,   0,   0,   0, 256
        CBGSETSPRITE "pet_3", 300, 50, 3, 150, 150, 255, CM_GRAY:0:0

        ; 作为表达式调用
        RESULT = CBGSETSPRITE("pet_1", 0, 0, 1)
        PRINTVL RESULT
    ```

### 相关项目
- [CBGSETG](CBGSETG.md)
- [CBGCLEAR](CBGCLEAR.md)
